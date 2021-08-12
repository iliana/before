use crate::chronicler::{ChroniclerGame, Data, RequestBuilder};
use crate::redirect::Redirect;
use crate::{Config, Result};
use anyhow::anyhow;
use chrono::{DateTime, Duration, DurationRound, Utc};
use itertools::Itertools;
use rocket::form::FromForm;
use rocket::http::{CookieJar, Status};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::response::status::NotFound;
use rocket::tokio::sync::RwLock;
use rocket::{async_trait, get, Either};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::str::FromStr;

lazy_static::lazy_static! {
    pub(crate) static ref DAY_MAP: RwLock<DayMap> = RwLock::new(DayMap::default());

    static ref DAY_MAP_START: DateTime<Utc> = "2020-08-01T13:00:00Z".parse().unwrap();
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub(crate) struct DayMap {
    until: Option<DateTime<Utc>>,
    season: BTreeMap<(i64, i64), DateTime<Utc>>,
    tournament: BTreeMap<(i64, i64), DateTime<Utc>>,
}

impl DayMap {
    pub(crate) async fn update(&mut self, config: &Config) -> anyhow::Result<()> {
        log::warn!("updating v1/games start_time cache");
        let after = self
            .until
            .unwrap_or(*DAY_MAP_START)
            .duration_trunc(Duration::hours(1))?;
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
        self.until = Some(Utc::now());
        Ok(())
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/_before/jump?<redirect>&<start>&<team>&<jump_time..>")]
pub(crate) async fn jump(
    cookies: &CookieJar<'_>,
    redirect: Option<String>,
    start: Option<&str>,
    team: Option<&str>,
    jump_time: JumpTime<'_>,
) -> Result<Either<Redirect, NotFound<()>>> {
    if let Some(team) = team {
        cookies.add(crate::new_cookie("favorite_team", team.to_string()));
    }
    let start_offset = match start {
        Some(start) => DateTime::from_str(start).map_err(anyhow::Error::from)? - Utc::now(),
        None => Duration::zero(),
    };
    Ok(if let Some(time) = jump_time.to_time().await? {
        set_offset(cookies, Utc::now() + start_offset - time);
        Either::Left(Redirect(redirect))
    } else {
        Either::Right(NotFound(()))
    })
}

#[derive(Debug, Clone, Copy, FromForm)]
pub(crate) struct JumpTime<'a> {
    time: Option<&'a str>,
    season: Option<i64>,
    tournament: Option<i64>,
    day: Option<i64>,
}

impl<'a> JumpTime<'a> {
    async fn to_time(self) -> anyhow::Result<Option<DateTime<Utc>>> {
        Ok(if let Some(time) = self.time {
            Some(DateTime::from_str(time)?)
        } else if let Some(day) = self.day {
            if let Some(season) = self.season {
                DAY_MAP
                    .read()
                    .await
                    .season
                    .get(&(season - 1, day - 1))
                    .copied()
            } else if let Some(tournament) = self.tournament {
                DAY_MAP
                    .read()
                    .await
                    .tournament
                    .get(&(tournament, day - 1))
                    .copied()
            } else {
                None
            }
        } else {
            None
        })
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/_before/relative?<redirect>&<duration..>")]
pub(crate) fn relative(
    cookies: &CookieJar<'_>,
    offset: Offset,
    redirect: Option<String>,
    duration: FormDuration,
) -> Redirect {
    set_offset(cookies, offset.0 - duration.to_duration());
    Redirect(redirect)
}

#[derive(Debug, Clone, Copy, FromForm)]
pub(crate) struct FormDuration {
    seconds: Option<i64>,
    minutes: Option<i64>,
    hours: Option<i64>,
    days: Option<i64>,
    weeks: Option<i64>,
}

impl FormDuration {
    fn to_duration(self) -> Duration {
        Duration::seconds(self.seconds.unwrap_or(0))
            + Duration::minutes(self.minutes.unwrap_or(0))
            + Duration::hours(self.hours.unwrap_or(0))
            + Duration::days(self.days.unwrap_or(0))
            + Duration::weeks(self.weeks.unwrap_or(0))
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

fn get_offset(cookies: &CookieJar<'_>) -> Option<Duration> {
    cookies
        .get_pending("offset_sec")
        .and_then(|c| c.value().parse().ok())
        .map(Duration::seconds)
}

fn set_offset(cookies: &CookieJar<'_>, duration: Duration) {
    cookies.add(crate::new_cookie(
        "offset_sec",
        duration.num_seconds().to_string(),
    ));
}

#[derive(Debug, Clone, Copy)]
pub(crate) struct Offset(pub(crate) Duration);

#[async_trait]
impl<'r> FromRequest<'r> for Offset {
    type Error = anyhow::Error;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Offset, anyhow::Error> {
        if let Some(offset) = get_offset(req.cookies()) {
            Outcome::Success(Offset(offset))
        } else {
            Outcome::Failure((Status::BadRequest, anyhow!("offset not present")))
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub(crate) struct OffsetTime(pub(crate) DateTime<Utc>);

#[async_trait]
impl<'r> FromRequest<'r> for OffsetTime {
    type Error = anyhow::Error;

    async fn from_request(req: &'r Request<'_>) -> Outcome<OffsetTime, anyhow::Error> {
        if let Some(offset) = get_offset(req.cookies()) {
            Outcome::Success(OffsetTime(Utc::now() - offset))
        } else {
            Outcome::Failure((Status::BadRequest, anyhow!("offset not present")))
        }
    }
}
