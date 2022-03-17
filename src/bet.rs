use crate::api::ApiResult;
use crate::chronicler::{Order, RequestBuilder};
use crate::config::Config;
use crate::cookies::{AsCookie, CookieJarExt};
use crate::favorite_team::FavoriteTeam;
use crate::feed::{self, MinimalFeedEvent};
use crate::idol::Idol;
use crate::offset::OffsetTime;
use crate::snacks::{Snack, SnackPack};
use crate::time::{datetime, DateTime};
use crate::Result;
use bincode::{DefaultOptions, Options};
use itertools::Itertools;
use rocket::futures::{self, future, stream::*};
use rocket::http::CookieJar;
use rocket::response::stream::stream;
use rocket::serde::json::Json;
use rocket::{get, post, Responder, State};
use serde::{Deserialize, Serialize};
use serde_json::Number;
use std::cmp;
use std::collections::HashMap;
use std::fmt::{self, Display};
use std::str::FromStr;
use time::Duration;
use uuid::Uuid;

const EPOCH: DateTime = datetime!(2020-07-20 00:00:00 UTC);

// Changing the order of any enum variants or struct members in this module will break existing
// cookies. To create a new cookie version, add a new variant to the end of `ActiveBets`.

#[derive(Debug, Deserialize, Serialize)]
enum ActiveBets {
    V1(Vec<ActiveBet>),
}

impl Default for ActiveBets {
    fn default() -> ActiveBets {
        ActiveBets::V1(Vec::new())
    }
}

impl Display for ActiveBets {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            base64::encode_config(
                DefaultOptions::new()
                    .serialize(self)
                    .map_err(|_| fmt::Error)?,
                base64::URL_SAFE_NO_PAD
            )
        )
    }
}

impl FromStr for ActiveBets {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> anyhow::Result<ActiveBets> {
        let data = DefaultOptions::new()
            .deserialize(&base64::decode_config(s, base64::URL_SAFE_NO_PAD)?)?;
        Ok(data)
    }
}

impl AsCookie for ActiveBets {
    const NAME: &'static str = "bets";
}

#[derive(Debug, Deserialize, Serialize)]
struct ActiveBet {
    game_id: Uuid,
    team_id: Uuid,
    amount: i32,
    odds: f64,
    correct: bool,
    end_time_from_epoch: i64,
}

impl ActiveBet {
    fn end_time(&self) -> DateTime {
        EPOCH + Duration::seconds(self.end_time_from_epoch)
    }

    fn payout(&self) -> i32 {
        payout(self.end_time(), self.odds, self.amount)
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

// `Number` is used here instead of i32 due to https://github.com/serde-rs/json/issues/559
#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub(crate) enum Bet {
    #[serde(rename_all = "camelCase")]
    Old {
        amount: Number,
        entity_id: Uuid,
        game_id: Uuid,
        #[serde(skip_deserializing, skip_serializing_if = "Option::is_none")]
        odds: Option<f64>,
    },
    New {
        amount: Number,
        // [team_id, game_id]
        targets: [Uuid; 2],
        #[serde(skip_deserializing, skip_serializing_if = "Option::is_none")]
        payout: Option<i32>,
    },
}

impl Bet {
    fn amount(&self) -> anyhow::Result<i32> {
        match self {
            Bet::Old { amount, .. } | Bet::New { amount, .. } => Ok(i32::deserialize(amount)?),
        }
    }

    fn team_id(&self) -> Uuid {
        match self {
            Bet::Old { entity_id, .. } => *entity_id,
            Bet::New { targets, .. } => targets[0],
        }
    }

    fn game_id(&self) -> Uuid {
        match self {
            Bet::Old { game_id, .. } => *game_id,
            Bet::New { targets, .. } => targets[1],
        }
    }
}

#[derive(Responder)]
pub(crate) enum BetResult {
    Ok(Json<BetResponse>),
    Err(ApiResult<&'static str>),
}

#[derive(Serialize)]
pub(crate) struct BetResponse {
    bet: Bet,
}

#[post("/api/bet", data = "<bet>")]
pub(crate) async fn bet(
    config: &State<Config>,
    cookies: &CookieJar<'_>,
    bet: Json<Bet>,
) -> Result<BetResult> {
    #[derive(Deserialize)]
    struct Game {
        timestamp: DateTime,
        data: GameData,
    }

    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct GameData {
        game_complete: bool,
        away_team: Uuid,
        away_odds: f64,
        away_score: f64,
        home_team: Uuid,
        home_odds: f64,
        home_score: f64,
    }

    let bet = bet.into_inner();
    let amount = bet.amount()?;
    let ActiveBets::V1(mut bets) = cookies.load::<ActiveBets>().unwrap_or_default();

    // remove any bets for the same game
    bets.retain(|active_bet| active_bet.game_id != bet.game_id());

    // fetch game
    let game: Game = match RequestBuilder::v1("games/updates")
        .game(bet.game_id().to_string())
        .order(Order::Desc)
        .count(10)
        .json(config)
        .await?
        .data
        .into_iter()
        .rev()
        .find(|game: &Game| game.data.game_complete)
    {
        Some(game) => game,
        None => return Ok(BetResult::Err(ApiResult::Err("Game not found"))),
    };

    // figure out the winner
    let (winner, odds) = if game.data.home_score > game.data.away_score {
        (game.data.home_team, game.data.home_odds)
    } else {
        (game.data.away_team, game.data.away_odds)
    };

    let end_time = game.timestamp;

    bets.push(ActiveBet {
        game_id: bet.game_id(),
        team_id: bet.team_id(),
        amount,
        correct: bet.team_id() == winner,
        odds,
        end_time_from_epoch: (end_time - EPOCH).whole_seconds(),
    });
    cookies.store(&ActiveBets::V1(bets));

    Ok(BetResult::Ok(Json(BetResponse { bet })))
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[allow(
    clippy::cast_possible_truncation,
    clippy::collapsible_else_if,
    clippy::float_cmp
)]
fn payout(time: DateTime, odds: f64, amount: i32) -> i32 {
    (f64::from(amount)
        * if odds == 0.5 {
            2.0
        } else if odds < 0.5 {
            if time < crate::EXPANSION {
                2.0 + 555e-6 * (100.0 * (0.5 - odds)).powf(2.4135)
            } else {
                2.0 + 0.0015 * (100.0 * (0.5 - odds)).powf(2.2)
            }
        } else {
            if time < crate::EXPANSION {
                2.0 - 335e-6 * (100.0 * (odds - 0.5)).powf(2.045)
            } else if time < datetime!(2021-03-07 15:50:00 UTC) {
                0.571 + 1.429 / (1.0 + (3.0 * (odds - 0.5)).powf(0.77))
            } else {
                3.206 / (1.0 + (0.443 * (odds - 0.5)).powf(0.95)) - 1.206
            }
        })
    .round() as i32
}

#[cfg(test)]
#[test]
fn test_payout() {
    assert_eq!(
        payout(datetime!(2020-10-19 16:05:00 UTC), 0.5975846150616342, 1000),
        1965
    );
    assert_eq!(
        payout(datetime!(2020-10-19 16:05:00 UTC), 0.4024153849383657, 1000),
        2136
    );
    assert_eq!(
        payout(datetime!(2021-03-01 16:05:00 UTC), 0.6280562158449062, 1600),
        2460
    );
    assert_eq!(
        payout(datetime!(2021-03-01 16:05:00 UTC), 0.3719437841550938, 1600),
        3855
    );
    assert_eq!(
        payout(
            datetime!(2021-05-11 16:05:00 UTC),
            0.5544811391624432,
            10400
        ),
        19858
    );
    assert_eq!(
        payout(
            datetime!(2021-05-11 16:05:00 UTC),
            0.4455188608375569,
            10400
        ),
        21450
    );
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/api/getActiveBets")]
pub(crate) fn get_active_bets(cookies: &CookieJar<'_>, time: OffsetTime) -> Json<Vec<Bet>> {
    let ActiveBets::V1(bets) = cookies.load::<ActiveBets>().unwrap_or_default();
    Json(if time.0 < crate::EXPANSION {
        bets.into_iter()
            .map(|bet| Bet::Old {
                amount: bet.amount.into(),
                entity_id: bet.team_id,
                game_id: bet.game_id,
                odds: Some(bet.odds),
            })
            .collect()
    } else {
        bets.into_iter()
            .map(|bet| Bet::New {
                amount: bet.amount.into(),
                targets: [bet.team_id, bet.game_id],
                payout: Some(bet.payout()),
            })
            .collect()
    })
}

pub(crate) async fn generate_toasts(
    config: &Config,
    cookies: &CookieJar<'_>,
    time: DateTime,
) -> anyhow::Result<Vec<String>> {
    #[derive(Deserialize)]
    struct Team {
        nickname: String,
    }

    let ActiveBets::V1(bets) = cookies.load::<ActiveBets>().unwrap_or_default();
    let (mut old, bets) = bets
        .into_iter()
        .partition::<Vec<_>, _>(|bet| bet.end_time() < time);

    let mut snack_toasts = generate_snack_toasts(config, cookies, time).await?;

    let mut toasts = if old.is_empty() {
        Vec::new()
    } else {
        old.sort_by_key(|bet| bet.team_id);
        let team_ids = old
            .iter()
            .map(|bet| bet.team_id)
            .dedup()
            .map(|id| id.to_string())
            .join(",");
        let teams = config
            .fetch_map::<Team>("Team", Some(team_ids), time)
            .await?;

        cookies.store(&ActiveBets::V1(bets));
        old.into_iter()
            .map(|bet| {
                format!(
                    "You bet {} coins on the {} and {}.",
                    bet.amount,
                    teams
                        .get(&bet.team_id.to_string())
                        .map_or("???", |team| team.nickname.as_str()),
                    if bet.correct {
                        format!("won {} coins", bet.payout())
                    } else {
                        "lost".to_owned()
                    }
                )
            })
            .collect()
    };

    toasts.append(&mut snack_toasts);
    Ok(toasts)
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

lazy_static::lazy_static! {
    static ref SNACK_CONDITIONS: HashMap<Snack, SnackPayoutInfo> =
        serde_json::from_str(include_str!("../data/snack_conditions.json")).unwrap();
    // sourced from: https://www.blaseball.wiki/w/Concessions/Pricing
    static ref PAYOUT_CURVES: HashMap<Snack, Vec<i64>> = serde_json::from_str(include_str!("../data/snack_payouts.json")).unwrap();
}

// all you can eat epochs
const AYCE_START: DateTime = datetime!(2021-04-05 00:00:00 UTC);
const AYCE_END: DateTime = datetime!(2021-07-29 03:35:53 UTC);
const AYCE_MODIFIERS: [f64; 25] = [
    6.50, 3.50, 2.50, 1.90, 1.50, 1.25, 1.10, 1.00, 0.90, 0.80, 0.70, 0.63, 0.57, 0.50, 0.45, 0.39,
    0.34, 0.30, 0.25, 0.21, 0.17, 0.13, 0.09, 0.05, 0.00,
];

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct SnackPayoutInfo {
    kind: PayoutKind,
    event_types: Vec<i32>,
    from: DateTime,
    #[serde(default)]
    to: Option<DateTime>,
    template: &'static str,
    #[serde(default)]
    filters: Vec<(&'static str, &'static str)>,
}

#[derive(PartialEq, Debug, Deserialize, Serialize)]
pub(crate) enum PayoutKind {
    EventBased,
    PitcherBased,
}

pub(crate) struct LastPayoutTime(DateTime);

impl Display for LastPayoutTime {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)?;
        Ok(())
    }
}

impl FromStr for LastPayoutTime {
    type Err = time::error::Parse;

    fn from_str(s: &str) -> std::result::Result<LastPayoutTime, time::error::Parse> {
        DateTime::from_str(s).map(LastPayoutTime)
    }
}

impl AsCookie for LastPayoutTime {
    const NAME: &'static str = "last_snack_payout";
}

#[allow(
    clippy::cast_sign_loss,
    clippy::cast_precision_loss,
    clippy::cast_possible_truncation
)]
pub(crate) async fn generate_snack_toasts(
    config: &Config,
    cookies: &CookieJar<'_>,
    time: DateTime,
) -> anyhow::Result<Vec<String>> {
    let snack_pack = cookies.load::<SnackPack>().unwrap_or_default();
    let snacks = snack_pack.amounts();
    let last_snack_payout = cookies.load::<LastPayoutTime>().map_or(time, |v| v.0);

    let snack_modifier = if time > AYCE_START && time < AYCE_END {
        AYCE_MODIFIERS[cmp::min(25, snack_pack.len()) - 1]
    } else {
        1.0
    };

    // an iterator would be more idiomatic here, however: async
    let mut toasts = Vec::with_capacity(snacks.len());
    for (snack, snack_amount) in snacks {
        let result = match snack {
            Snack::Breakfast => {
                // the idle time before it pays out may be 15min instead?
                let idle_mins = (time - last_snack_payout).whole_minutes();
                if idle_mins >= 60 {
                    Some(format!(
                        "breakfast won you {}",
                        cmp::min(
                            (idle_mins as f64 * snack_modifier).round() as i64,
                            PAYOUT_CURVES[&Snack::Breakfast][snack_amount as usize]
                        )
                    ))
                } else {
                    None
                }
            }
            Snack::IdolShutouts => {
                if let Some(idol) = cookies.load::<Idol>().map(|v| v.to_string()) {
                    let info = &SNACK_CONDITIONS[&Snack::IdolShutouts];
                    let to = info.to.map_or(time, |v| cmp::min(v, time));
                    let from = cmp::max(last_snack_payout, info.from);

                    let mut triggers: usize = 0;
                    let mut stream = events_for_pitcher(config, to, from, &idol, true)
                        .await?
                        .boxed();
                    'outer: while let Some(game_feed) = stream.next().await {
                        for e in game_feed? {
                            if e.etype == 9 {
                                continue 'outer;
                            }
                        }

                        // if no homers happened in this game, add a shutout trigger
                        triggers += 1;
                    }

                    let payout = calculate_payout(
                        triggers,
                        snack_modifier,
                        Snack::IdolShutouts,
                        snack_amount as usize,
                    );

                    if payout > 0 {
                        Some(format!("snack {} earned ya {}", snack, payout))
                    } else {
                        None
                    }
                } else {
                    continue;
                }
            }
            s if SNACK_CONDITIONS.contains_key(&snack) => {
                let info = &SNACK_CONDITIONS[&s];
                let to = info.to.map_or(time, |v| cmp::min(v, time));
                let from = cmp::max(last_snack_payout, info.from);

                let triggers = if info.kind == PayoutKind::EventBased {
                    event_based_snack_triggers(config, cookies, last_snack_payout, from, to, info)
                        .await?
                } else if let Some(idol) = cookies.load::<Idol>().map(|v| v.to_string()) {
                    pitcher_snack_triggers(config, to, from, &idol, info.event_types[0]).await?
                } else {
                    continue;
                };

                let paying_out_snack =
                    if s == Snack::Incineration && time > datetime!(2021-07-25 17:50:00 UTC) {
                        Snack::IncinerationMelted
                    } else {
                        s
                    };

                let payout = calculate_payout(
                    triggers,
                    snack_modifier,
                    paying_out_snack,
                    snack_amount as usize,
                );

                if payout > 0 {
                    Some(format!("snack {} earned ya {}", snack, payout))
                } else {
                    None
                }
            }
            _ => None,
        };
        // i hate this - allie
        if let Some(toast) = result {
            toasts.push(toast);
        }
    }

    cookies.store(&LastPayoutTime(time));

    Ok(toasts)
}

async fn pitcher_snack_triggers(
    config: &Config,
    before: DateTime,
    after: DateTime,
    pitcher: &str,
    event_type: i32,
) -> anyhow::Result<usize> {
    let mut count: usize = 0;
    let mut stream = events_for_pitcher(config, before, after, pitcher, false)
        .await?
        .boxed();
    while let Some(game_feed) = stream.next().await {
        for e in game_feed? {
            if e.etype == event_type {
                count += 1;
            }
        }
    }

    Ok(count)
}

async fn events_for_pitcher<'a>(
    config: &'a Config,
    before: DateTime,
    after: DateTime,
    pitcher: &'a str,
    only_finished_games: bool,
) -> anyhow::Result<impl Stream<Item = anyhow::Result<Vec<MinimalFeedEvent>>> + 'a> {
    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct GameResult {
        data: GameData,
    }

    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct GameData {
        id: String,
        away_pitcher: String,
        home_pitcher: String,
    }

    #[derive(PartialEq, Debug)]
    enum InningHalf {
        Top,
        Bottom,
    }

    impl std::ops::Not for InningHalf {
        type Output = Self;

        fn not(self) -> Self::Output {
            match self {
                InningHalf::Top => InningHalf::Bottom,
                InningHalf::Bottom => InningHalf::Top,
            }
        }
    }

    let games: Vec<GameResult> = RequestBuilder::v1("games")
        .after(after - Duration::hours(1)) // this is a hack to catch games going on right now. it's bad and needs a fix - allie
        .before(before)
        .pitcher(pitcher.to_string())
        .finished(if only_finished_games {
            Some(true)
        } else {
            None
        })
        .json(config)
        .await?
        .data;

    Ok(stream! {
        // yield all events for a game at once at once, so we can do per-game counts like shut outs
        let mut events: Vec<MinimalFeedEvent> = Vec::new();

        for game in games {
            // todo: support event type 3, 'pitcher change'
            let pitcher_team = if game.data.away_pitcher == pitcher { InningHalf::Top } else { InningHalf::Bottom };
            // hack to get all events at once. impl paging?
            let mut inning_half = InningHalf::Top;

            for event in feed::all_events_for_game::<MinimalFeedEvent>(config, &game.data.id, before, after, "10000000").await? {
                if event.etype == 2 {
                    inning_half = !inning_half;
                }

                if inning_half == pitcher_team {
                    events.push(event);
                }
            }

            yield Ok(events.drain(..).collect());
        }
    })
}

/// gets triggers for events that can be counted from feed events
async fn event_based_snack_triggers(
    config: &Config,
    cookies: &CookieJar<'_>,
    last_snack_payout: DateTime,
    from: DateTime,
    to: DateTime,
    payout_info: &SnackPayoutInfo,
) -> anyhow::Result<usize> {
    feed::count_events(
        config,
        &payout_info.event_types,
        from,
        to,
        payout_info.filters.iter().map(|(k, v)| {
            (
                (*k).to_string(),
                v.replace(
                    "::IDOL::",
                    &cookies
                        .load::<Idol>()
                        .map(|v| v.to_string())
                        .unwrap_or_default(),
                )
                .replace(
                    "::FAV_TEAM::",
                    &cookies
                        .load::<FavoriteTeam>()
                        .map(|v| v.to_string())
                        .unwrap_or_default(),
                ),
            )
        }),
    )
    .await
}

#[inline(always)]
#[allow(
    clippy::cast_sign_loss,
    clippy::cast_precision_loss,
    clippy::cast_possible_truncation
)]
fn calculate_payout(triggers: usize, modifier: f64, snack: Snack, snack_amount: usize) -> i64 {
    (triggers as f64 * modifier * PAYOUT_CURVES[&snack][snack_amount as usize] as f64).round()
        as i64
}
