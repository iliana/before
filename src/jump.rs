use crate::bet::LastPayoutTime;
use crate::chronicler::RequestBuilder;
use crate::cookies::CookieJarExt;
use crate::favorite_team::FavoriteTeam;
use crate::offset::Offset;
use crate::redirect::Redirect;
use crate::time::{DateTime, Duration};
use crate::{Config, Result};
use rocket::form::FromForm;
use rocket::http::CookieJar;
use rocket::{get, State};
use serde::Deserialize;
use std::str::FromStr;

#[get("/_before/jump?<redirect>&<start>&<team>&<jump_time..>")]
pub(crate) async fn jump(
    config: &State<Config>,
    cookies: &CookieJar<'_>,
    redirect: Option<String>,
    start: Option<&str>,
    team: Option<String>,
    jump_time: JumpTime<'_>,
) -> Result<Option<Redirect>> {
    if let Some(team) = team {
        cookies.store(&FavoriteTeam::new(team));
    } else if cookies.load::<FavoriteTeam>().is_none() {
        cookies.store(&FavoriteTeam::random());
    }

    let start_offset = match start {
        Some(start) => DateTime::from_str(start).map_err(anyhow::Error::from)? - DateTime::now(),
        None => Duration::ZERO,
    };
    Ok(jump_time.to_time(config).await?.map(|time| {
        cookies.store(&Offset(DateTime::now() + start_offset - time));
        Redirect(redirect)
    }))
}

#[derive(Debug, FromForm)]
pub(crate) struct JumpTime<'a> {
    time: Option<&'a str>,
    season: Option<i64>,
    tournament: Option<i64>,
    day: Option<i64>,
}

impl<'a> JumpTime<'a> {
    async fn to_time(&self, config: &Config) -> anyhow::Result<Option<DateTime>> {
        #[derive(Debug, Deserialize)]
        #[serde(rename_all = "camelCase")]
        struct Game {
            start_time: DateTime,
        }

        Ok(if let Some(time) = self.time {
            Some(DateTime::from_str(time)?)
        } else if let Some(day) = self.day {
            let mut builder = RequestBuilder::v1("games")
                .sim("thisidisstaticyo")
                .day(day - 1);
            if let Some(season) = self.season {
                builder = builder.season(season - 1);
            } else if self.tournament.is_some() {
                builder = builder.season(-1);
            } else {
                return Ok(None);
            }
            builder
                .json(config)
                .await?
                .data
                .into_iter()
                .map(|game: Game| game.start_time)
                .min()
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
    cookies.store(&Offset(offset.0 - duration.into_duration()));
    Redirect(redirect)
}

#[derive(Debug, FromForm)]
pub(crate) struct FormDuration {
    seconds: Option<i64>,
    minutes: Option<i64>,
    hours: Option<i64>,
    days: Option<i64>,
    weeks: Option<i64>,
}

impl FormDuration {
    fn into_duration(self) -> Duration {
        Duration::seconds(self.seconds.unwrap_or(0))
            + Duration::minutes(self.minutes.unwrap_or(0))
            + Duration::hours(self.hours.unwrap_or(0))
            + Duration::days(self.days.unwrap_or(0))
            + Duration::weeks(self.weeks.unwrap_or(0))
    }
}
