use crate::chronicler::{default_tournament, RequestBuilder, Version};
use crate::config::Config;
use crate::stream::postseason::Postseason;
use crate::stream::StreamEvent;
use crate::time::DateTime;
use anyhow::Result;
use rocket::futures::future::{try_join_all, FutureExt};
use rocket::tokio::try_join;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;

#[allow(clippy::large_enum_variant)]
#[derive(Debug, Serialize)]
#[serde(untagged)]
pub(crate) enum Games {
    Value(Box<RawValue>),
    Constructed {
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
    },
}

impl Games {
    #[allow(clippy::too_many_lines)]
    pub(crate) async fn first(
        config: &Config,
        past: &mut [Version<StreamEvent>],
        time: DateTime,
    ) -> Result<Games> {
        if let Some(v) = past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.games.take())
        {
            return Ok(Games::Value(v));
        }

        let mut tournament_playoffs = None;

        let mut schedule = Vec::new();
        let mut tomorrow_schedule = Vec::new();
        let sim = config
            .fetch::<Box<RawValue>>("Sim", None, time)
            .await?
            .next();
        let mut season = None;
        let mut standings = None;
        let mut postseason = None;
        let mut postseasons = None;
        let mut tournament = None;

        if let Some(ref sim) = sim {
            let sim: Sim = serde_json::from_str(sim.get())?;

            if !config.chronplete {
                let (today_ids, tomorrow_ids) = try_join!(
                    fetch_game_ids(config, sim.season, sim.tournament, sim.day),
                    fetch_game_ids(config, sim.season, sim.tournament, sim.day + 1),
                )?;
                let (today, tomorrow): (Vec<_>, Vec<_>) =
                    try_join_all(today_ids.iter().chain(&tomorrow_ids).map(|id| {
                        config
                            .fetch_game(id.clone(), time)
                            .map(move |game| game.map(|game| (id, game)))
                    }))
                    .await?
                    .into_iter()
                    .filter_map(|(id, game)| game.map(|game| (id, game)))
                    .partition(|(id, _)| today_ids.contains(id));
                schedule = today.into_iter().map(|(_, game)| game).collect();
                tomorrow_schedule = tomorrow.into_iter().map(|(_, game)| game).collect();
            }

            if sim.tournament != -1 {
                tournament = config
                    .fetch::<Box<RawValue>>("Tournament", None, time)
                    .await?
                    .find(|tournament| {
                        match serde_json::from_str::<Tournament>(tournament.get()) {
                            Ok(tournament) if tournament.index == sim.tournament => {
                                tournament_playoffs = Some(tournament.playoffs);
                                true
                            }
                            _ => false,
                        }
                    });
            }

            if let Some(playoffs) = tournament_playoffs {
                postseason =
                    Postseason::build(config, playoffs, sim.season, sim.tournament_round, time)
                        .await?;
            } else {
                match sim.playoffs {
                    Playoffs::One(id) => {
                        postseason =
                            Postseason::build(config, id, sim.season, sim.play_off_round, time)
                                .await?;
                    }
                    Playoffs::Many(ids) => {
                        postseasons = Some(
                            try_join_all(ids.into_iter().map(|id| {
                                Postseason::build(config, id, sim.season, sim.play_off_round, time)
                            }))
                            .await?
                            .into_iter()
                            .flatten()
                            .collect(),
                        );
                    }
                }
            }

            season = config
                .fetch::<Box<RawValue>>("Season", Some(sim.season_id), time)
                .await?
                .next();
        }

        if let Some(ref season) = season {
            let season: Season = serde_json::from_str(season.get())?;

            standings = config
                .fetch("Standings", Some(season.standings), time)
                .await?
                .next();
        }

        Ok(Games::Constructed {
            schedule,
            tomorrow_schedule,
            sim,
            season,
            standings,
            postseason,
            postseasons,
            tournament,
        })
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Sim {
    season: i64,
    #[serde(default = "default_tournament")]
    tournament: i64,
    day: i64,
    season_id: String,
    playoffs: Playoffs,
    #[serde(default = "default_tournament")]
    play_off_round: i64,
    #[serde(default = "default_tournament")]
    tournament_round: i64,
}

#[derive(Deserialize)]
#[serde(untagged)]
enum Playoffs {
    One(String),
    Many(Vec<String>),
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

async fn fetch_game_ids(
    config: &Config,
    season: i64,
    tournament: i64,
    day: i64,
) -> Result<Vec<String>> {
    #[derive(Debug, Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct Game {
        game_id: String,
        data: GameData,
    }

    #[derive(Debug, Deserialize)]
    struct GameData {
        #[serde(default = "default_tournament")]
        tournament: i64,
    }

    Ok(RequestBuilder::v1("games")
        .season(if tournament == -1 { season } else { -1 })
        .day(day)
        .json(config)
        .await?
        .data
        .into_iter()
        .filter_map(|game: Game| {
            if tournament == -1 {
                Some(game.game_id)
            } else {
                (game.data.tournament == tournament).then(|| game.game_id)
            }
        })
        .collect())
}
