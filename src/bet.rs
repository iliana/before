use crate::api::ApiResult;
use crate::chronicler::{Order, RequestBuilder};
use crate::config::Config;
use crate::cookies::{AsCookie, CookieJarExt};
use crate::offset::OffsetTime;
use crate::time::{datetime, DateTime};
use crate::Result;
use bincode::{DefaultOptions, Options};
use itertools::Itertools;
use rocket::http::CookieJar;
use rocket::serde::json::Json;
use rocket::{get, post, Responder, State};
use serde::{Deserialize, Serialize};
use serde_json::Number;
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
        Ok(DefaultOptions::new()
            .deserialize(&base64::decode_config(s, base64::URL_SAFE_NO_PAD)?)?)
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
    payout: i32,
    end_time_from_epoch: Duration,
}

impl ActiveBet {
    fn end_time(&self) -> DateTime {
        EPOCH + self.end_time_from_epoch
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
    },
    New {
        amount: Number,
        // [team_id, game_id]
        targets: [Uuid; 2],
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
    time: OffsetTime,
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
        .count(1)
        .json(config)
        .await?
        .data
        .into_iter()
        .next()
    {
        Some(game) => game,
        None => return Ok(BetResult::Err(ApiResult::Err("Game not found"))),
    };

    if !game.data.game_complete {
        return Ok(BetResult::Err(ApiResult::Err("Game not found")));
    }

    // figure out the winner
    let (winner, odds) = if game.data.home_score > game.data.away_score {
        (game.data.home_team, game.data.home_odds)
    } else {
        (game.data.away_team, game.data.away_odds)
    };

    // if the bet predicted the winner, calculate the payout
    let payout = if bet.team_id() == winner {
        payout(time.0, odds, amount)
    } else {
        0
    };

    bets.push(ActiveBet {
        game_id: bet.game_id(),
        team_id: bet.team_id(),
        amount,
        payout,
        end_time_from_epoch: game.timestamp - EPOCH,
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
            if time < datetime!(2021-03-01 04:10:00 UTC) {
                2.0 + 555e-6 * (100.0 * (0.5 - odds)).powf(2.4135)
            } else {
                2.0 + 0.0015 * (100.0 * (0.5 - odds)).powf(2.2)
            }
        } else {
            if time < datetime!(2021-03-01 04:10:00 UTC) {
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
    Json(if time.0 < datetime!(2021-03-01 04:10:00 UTC) {
        bets.into_iter()
            .map(|bet| Bet::Old {
                amount: bet.amount.into(),
                entity_id: bet.team_id,
                game_id: bet.game_id,
            })
            .collect()
    } else {
        bets.into_iter()
            .map(|bet| Bet::New {
                amount: bet.amount.into(),
                targets: [bet.team_id, bet.game_id],
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

    Ok(if old.is_empty() {
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
                    if bet.payout == 0 {
                        "lost".to_owned()
                    } else {
                        format!("won {} coins", bet.payout)
                    }
                )
            })
            .collect()
    })
}
