use crate::chronicler::{default_tournament, RequestBuilder};
use crate::config::Config;
use crate::time::{datetime, DateTime, Duration};
use anyhow::Result;
use itertools::Itertools;
use rocket::tokio::sync::RwLock;
use serde::Deserialize;
use std::collections::{BTreeMap, HashMap};
use uuid::Uuid;

lazy_static::lazy_static! {
    pub(crate) static ref DAY_MAP: RwLock<DayMap> = RwLock::default();
}

static DAY_MAP_START: DateTime = datetime!(2020-08-01 13:00:00 UTC);

#[derive(Debug, Default)]
pub(crate) struct DayMap {
    pub(crate) until: Option<DateTime>,
    pub(crate) season: BTreeMap<(i64, i64), DateTime>,
    pub(crate) tournament: BTreeMap<(i64, i64), DateTime>,
    pub(crate) end_time: HashMap<Uuid, DateTime>,
}

impl DayMap {
    pub(crate) async fn update(&mut self, config: &Config) -> Result<()> {
        #[derive(Debug, Deserialize)]
        #[serde(rename_all = "camelCase")]
        struct Game {
            game_id: Uuid,
            start_time: DateTime,
            end_time: Option<DateTime>,
            data: GameData,
        }

        #[derive(Debug, PartialEq, Eq, Hash, Deserialize)]
        struct GameData {
            season: i64,
            #[serde(default = "default_tournament")]
            tournament: i64,
            day: i64,
        }

        log::warn!("updating v1/games start_time cache");
        let after = self
            .until
            .unwrap_or(DAY_MAP_START)
            .trunc(Duration::hours(1))?;
        let games = RequestBuilder::v1("games")
            .after(after)
            .started(true)
            .json(config)
            .await?
            .data;
        self.end_time.extend(
            games
                .iter()
                .filter_map(|game: &Game| game.end_time.map(|end_time| (game.game_id, end_time))),
        );
        let times = games
            .into_iter()
            .map(|game| (game.data, game.start_time))
            .into_grouping_map()
            .min();
        let start = self.season.len() + self.tournament.len();
        self.season.extend(
            times
                .iter()
                .filter(|(date, _)| date.season > -1)
                .map(|(date, start)| ((date.season, date.day), *start)),
        );
        self.tournament.extend(
            times
                .iter()
                .filter(|(date, _)| date.tournament > -1)
                .map(|(date, start)| ((date.tournament, date.day), *start)),
        );
        log::warn!(
            "added {} entries to day map",
            self.season.len() + self.tournament.len() - start
        );
        self.until = Some(DateTime::now());
        Ok(())
    }
}
