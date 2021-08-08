use crate::chronicler::{
    fetch_game, ChroniclerGame, Data, Order, RequestBuilder, Stream, Version, Versions,
};
use crate::database::fetch;
use crate::postseason::{postseason, Postseason};
use crate::time::{Offset, OffsetTime};
use crate::Result;
use chrono::{DateTime, Utc};
use either::{Either, Left, Right};
use rocket::futures::{future::try_join_all, FutureExt};
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::{select, time::sleep, try_join};
use rocket::{get, Shutdown};
use serde::{Deserialize, Serialize};
use serde_json::value::{RawValue, Value};
use std::collections::hash_map::DefaultHasher;
use std::collections::{HashMap, HashSet};
use std::hash::{Hash, Hasher};

#[get("/events/streamData")]
pub async fn stream_data(
    time: OffsetTime,
    offset: Offset,
    mut shutdown: Shutdown,
) -> Result<EventStream![]> {
    // A given `Stream` version does not necessarily have all the top-level fields present, but the
    // frontend needs all fields present in the first event to be fully functional. We fetch the
    // next and previous 25 events, so that we can construct a "first" event to send immediately.
    //
    // There is no need to fetch further than a minute out, because the frontend is hardcoded to
    // close and reopen the stream every 40 seconds...
    //
    // `EventStream` cannot handle errors, so we start by making the two requests we need and
    // propagating their errors before the stream starts.
    let (past, future): (Versions<Stream>, Versions<Stream>) = try_join!(
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .before(time.0)
            .count(25)
            .order(Order::Desc)
            .json(),
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .after(time.0)
            .count(25)
            .order(Order::Asc)
            .json(),
    )?;
    let mut events = past.items;
    events.reverse();
    events.extend(future.items);

    // Multiple data sources perceive events at different times, even with accurate clocks, due to
    // the nature of blaseball.com's event stream. We can mostly mitigate this effect by deduping
    // the individual components of the stream.
    {
        let mut seen = HashSet::new();
        for event in &mut events {
            macro_rules! dedup {
                ($x:ident) => {{
                    event.data.value.$x = if let Some(value) = event.data.value.$x.take() {
                        let mut hasher = DefaultHasher::new();
                        value.get().hash(&mut hasher);
                        let key = (stringify!($x), hasher.finish());
                        if seen.contains(&key) {
                            None
                        } else {
                            seen.insert(key);
                            Some(value)
                        }
                    } else {
                        None
                    };
                }};
            }

            dedup!(games);
            dedup!(leagues);
            dedup!(temporal);
            dedup!(fights);
        }
    }

    let (mut past, future): (Vec<Version<Stream>>, Vec<Version<Stream>>) = events
        .into_iter()
        .filter(|event| !event.data.is_empty())
        .partition(|event| event.valid_from <= time.0);
    let first = First {
        value: FirstInner {
            games: first_games(&mut past, time.0).await?,
            leagues: first_leagues(&mut past, time.0).await?,
            temporal: first_temporal(&mut past, time.0).await?,
            fights: first_fights(&mut past),
        },
    };

    Ok(EventStream! {
        yield Event::json(&first);
        for version in future {
            select! {
                event = next_event(version, offset) => yield event,
                _ = &mut shutdown => break,
            };
        }
    })
}

async fn next_event(version: Version<Stream>, offset: Offset) -> Event {
    let duration = (version.valid_from - (Utc::now() - offset.0))
        .to_std()
        .unwrap_or_else(|_| std::time::Duration::from_nanos(0));
    sleep(duration).await;
    Event::json(&version.data)
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Serialize)]
struct First {
    value: FirstInner,
}

#[derive(Serialize)]
struct FirstInner {
    games: Games,
    leagues: Leagues,
    #[serde(skip_serializing_if = "Option::is_none")]
    temporal: Option<Box<RawValue>>,
    fights: Fights,
}

#[derive(Serialize)]
#[serde(transparent)]
struct Games {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, GamesInner>,
}

#[derive(Default, Serialize)]
#[serde(rename_all = "camelCase")]
struct GamesInner {
    schedule: Vec<Box<RawValue>>,
    tomorrow_schedule: Vec<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    sim: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    season: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    standings: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    postseason: Option<Postseason>,
    #[serde(skip_serializing_if = "Option::is_none")]
    postseasons: Option<Vec<Postseason>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    tournament: Option<Box<RawValue>>,
}

async fn first_games(past: &mut [Version<Stream>], time: DateTime<Utc>) -> anyhow::Result<Games> {
    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct Sim {
        season: i64,
        #[serde(default = "crate::chronicler::default_tournament")]
        tournament: i64,
        day: i64,
        season_id: String,
        #[serde(with = "either::serde_untagged")]
        playoffs: Either<String, Vec<String>>,
        #[serde(default = "crate::chronicler::default_tournament")]
        play_off_round: i64,
        #[serde(default = "crate::chronicler::default_tournament")]
        tournament_round: i64,
    }

    #[derive(Deserialize)]
    struct Season {
        standings: String,
    }

    #[derive(Deserialize)]
    struct Tournament {
        index: i64,
        playoffs: String,
    }

    async fn fetch_game_ids(season: i64, tournament: i64, day: i64) -> anyhow::Result<Vec<String>> {
        Ok(RequestBuilder::new("v1/games")
            .season(if tournament == -1 { season } else { -1 })
            .day(day)
            .json::<Data<ChroniclerGame>>()
            .await?
            .data
            .into_iter()
            .filter_map(|game| {
                if tournament == -1 {
                    Some(game.game_id)
                } else {
                    (game.data.tournament == tournament).then(|| game.game_id)
                }
            })
            .collect())
    }

    Ok(Games {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.games.take())
        {
            Some(v) => Left(v),
            None => {
                let mut games = GamesInner {
                    sim: fetch("Sim", None, time).await?.next(),
                    ..Default::default()
                };
                let mut tournament_playoffs = None;

                if let Some(ref sim) = games.sim {
                    let sim: Sim = serde_json::from_str(sim.get())?;

                    if !crate::CONFIG.chronplete {
                        let (today_ids, tomorrow_ids) = try_join!(
                            fetch_game_ids(sim.season, sim.tournament, sim.day),
                            fetch_game_ids(sim.season, sim.tournament, sim.day + 1),
                        )?;
                        let (today, tomorrow): (Vec<_>, Vec<_>) =
                            try_join_all(today_ids.iter().chain(&tomorrow_ids).map(|id| {
                                fetch_game(id.clone(), time)
                                    .map(move |game| game.map(|game| (id, game)))
                            }))
                            .await?
                            .into_iter()
                            .filter_map(|(id, game)| game.map(|game| (id, game)))
                            .partition(|(id, _)| today_ids.contains(id));
                        games.schedule = today.into_iter().map(|(_, game)| game).collect();
                        games.tomorrow_schedule =
                            tomorrow.into_iter().map(|(_, game)| game).collect();
                    }

                    if sim.tournament != -1 {
                        games.tournament =
                            fetch("Tournament", None, time).await?.find(|tournament| {
                                if let Ok(tournament) =
                                    serde_json::from_str::<Tournament>(tournament.get())
                                {
                                    if tournament.index == sim.tournament {
                                        tournament_playoffs = Some(tournament.playoffs);
                                        true
                                    } else {
                                        false
                                    }
                                } else {
                                    false
                                }
                            })
                    }

                    if let Some(playoffs) = tournament_playoffs {
                        games.postseason =
                            postseason(playoffs, sim.season, sim.tournament_round, time).await?;
                    } else {
                        match sim.playoffs {
                            Left(id) => {
                                games.postseason =
                                    postseason(id, sim.season, sim.play_off_round, time).await?;
                            }
                            Right(ref ids) => {
                                games.postseasons = Some(
                                    try_join_all(ids.iter().map(|id| {
                                        postseason(
                                            id.to_string(),
                                            sim.season,
                                            sim.play_off_round,
                                            time,
                                        )
                                    }))
                                    .await?
                                    .into_iter()
                                    .flatten()
                                    .collect(),
                                );
                            }
                        }
                    }

                    games.season = fetch("Season", Some(sim.season_id), time).await?.next();
                }

                if let Some(ref season) = games.season {
                    let season: Season = serde_json::from_str(season.get())?;

                    games.standings = fetch("Standings", Some(season.standings), time)
                        .await?
                        .next();
                }

                Right(games)
            }
        },
    })
}

#[derive(Serialize)]
#[serde(transparent)]
struct Leagues {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, LeaguesInner>,
}

#[derive(Serialize)]
struct LeaguesInner {
    leagues: Vec<Box<RawValue>>,
    stadiums: Vec<Box<RawValue>>,
    subleagues: Vec<Box<RawValue>>,
    divisions: Vec<Box<RawValue>>,
    teams: Vec<Box<RawValue>>,
    tiebreakers: Vec<Box<RawValue>>,
    stats: LeaguesStats,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct LeaguesStats {
    #[serde(skip_serializing_if = "Option::is_none")]
    community_chest: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    sunsun: Option<Box<RawValue>>,
}

async fn first_leagues(
    past: &mut [Version<Stream>],
    time: DateTime<Utc>,
) -> anyhow::Result<Leagues> {
    Ok(Leagues {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.leagues.take())
        {
            Some(v) => Left(v),
            None => {
                let (
                    leagues,
                    stadiums,
                    subleagues,
                    divisions,
                    teams,
                    tiebreakers,
                    mut community_chest,
                    mut sunsun,
                ) = try_join!(
                    fetch("League", None, time),
                    fetch("Stadium", None, time),
                    fetch("Subleague", None, time),
                    fetch("Division", None, time),
                    fetch("Team", None, time),
                    fetch("Tiebreakers", None, time),
                    fetch("CommunityChestProgress", None, time),
                    fetch("SunSun", None, time),
                )?;
                Right(LeaguesInner {
                    leagues: leagues.collect(),
                    stadiums: stadiums.collect(),
                    subleagues: subleagues.collect(),
                    divisions: divisions.collect(),
                    teams: teams.collect(),
                    tiebreakers: tiebreakers.collect(),
                    stats: LeaguesStats {
                        community_chest: community_chest.next(),
                        sunsun: sunsun.next(),
                    },
                })
            }
        },
    })
}

async fn first_temporal(
    past: &mut [Version<Stream>],
    time: DateTime<Utc>,
) -> anyhow::Result<Option<Box<RawValue>>> {
    Ok(
        match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.temporal.take())
        {
            Some(v) => Some(v),
            None => fetch("Temporal", None, time).await?.next(),
        },
    )
}

#[derive(Serialize)]
#[serde(transparent)]
struct Fights {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, HashMap<String, Value>>,
}

fn first_fights(past: &mut [Version<Stream>]) -> Fights {
    // if there weren't any fights defined in the last 25 events it probably means there's not a
    // boss fight right now
    Fights {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.fights.take())
        {
            Some(v) => Left(v),
            None => Right(HashMap::new()),
        },
    }
}
