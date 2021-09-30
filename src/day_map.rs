use crate::chronicler::{ChroniclerGame, Data, RequestBuilder};
use crate::config::Config;
use crate::time::{datetime, DateTime, Duration};
use anyhow::Result;
use itertools::Itertools;
use rocket::tokio::sync::RwLock;
use std::collections::BTreeMap;

lazy_static::lazy_static! {
    pub(crate) static ref DAY_MAP: RwLock<DayMap> = Default::default();
}

static DAY_MAP_START: DateTime = datetime!(2020-08-01 13:00:00 UTC);

#[derive(Debug, Default)]
pub(crate) struct DayMap {
    pub(crate) until: Option<DateTime>,
    pub(crate) season: BTreeMap<(i64, i64), DateTime>,
    pub(crate) tournament: BTreeMap<(i64, i64), DateTime>,
}

impl DayMap {
    pub(crate) async fn update(&mut self, config: &Config) -> Result<()> {
        log::warn!("updating v1/games start_time cache");
        let after = self
            .until
            .unwrap_or(DAY_MAP_START)
            .trunc(Duration::hours(1))?;
        let times = RequestBuilder::new("v1/games")
            .after(after)
            .started(true)
            .json::<Data<ChroniclerGame>>(config)
            .await?
            .data
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
