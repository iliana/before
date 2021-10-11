use crate::cookies::CookieJarExt;
use crate::day_map::DAY_MAP;
use crate::offset::Offset;
use crate::redirect::Redirect;
use crate::time::{DateTime, Duration};
use crate::Result;
use rocket::form::FromForm;
use rocket::http::CookieJar;
use rocket::response::status::NotFound;
use rocket::{get, Either};
use std::str::FromStr;

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
        Some(start) => DateTime::from_str(start).map_err(anyhow::Error::from)? - DateTime::now(),
        None => Duration::ZERO,
    };
    Ok(if let Some(time) = jump_time.to_time().await? {
        cookies.store(&Offset(DateTime::now() + start_offset - time));
        Either::Left(Redirect(redirect))
    } else {
        Either::Right(NotFound(()))
    })
}

#[derive(Debug, FromForm)]
pub(crate) struct JumpTime<'a> {
    time: Option<&'a str>,
    season: Option<i64>,
    tournament: Option<i64>,
    day: Option<i64>,
}

impl<'a> JumpTime<'a> {
    async fn to_time(&self) -> anyhow::Result<Option<DateTime>> {
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
    cookies.store(&Offset(offset.0 - duration.to_duration()));
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
    fn to_duration(&self) -> Duration {
        Duration::seconds(self.seconds.unwrap_or(0))
            + Duration::minutes(self.minutes.unwrap_or(0))
            + Duration::hours(self.hours.unwrap_or(0))
            + Duration::days(self.days.unwrap_or(0))
            + Duration::weeks(self.weeks.unwrap_or(0))
    }
}
