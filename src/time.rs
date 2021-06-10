use crate::redirect::Redirect;
use crate::Result;
use chrono::{DateTime, Duration, Utc};
use rocket::http::{Cookie, CookieJar};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::{async_trait, get};
use std::convert::Infallible;
use std::str::FromStr;

fn get_offset(cookies: &CookieJar<'_>) -> Duration {
    if let Some(secs) = cookies
        .get_pending("offset_sec")
        .and_then(|c| c.value().parse().ok())
    {
        Duration::seconds(secs)
    } else {
        let duration = Duration::weeks(3);
        set_offset(cookies, duration);
        duration
    }
}

fn set_offset(cookies: &CookieJar<'_>, duration: Duration) {
    cookies.add(Cookie::new(
        "offset_sec",
        duration.num_seconds().to_string(),
    ));
}

fn duration(
    seconds: Option<i64>,
    hours: Option<i64>,
    days: Option<i64>,
    weeks: Option<i64>,
) -> Duration {
    Duration::seconds(seconds.unwrap_or(0))
        + Duration::hours(hours.unwrap_or(0))
        + Duration::days(days.unwrap_or(0))
        + Duration::weeks(weeks.unwrap_or(0))
}

#[get("/_before/jump?<redirect>&<time>")]
pub fn jump(cookies: &CookieJar<'_>, redirect: Option<String>, time: &str) -> Result<Redirect> {
    set_offset(
        cookies,
        Utc::now() - DateTime::from_str(time).map_err(anyhow::Error::from)?,
    );
    Ok(Redirect(redirect))
}

#[get("/_before/relative?<redirect>&<seconds>&<hours>&<days>&<weeks>")]
pub fn relative(
    cookies: &CookieJar<'_>,
    redirect: Option<String>,
    seconds: Option<i64>,
    hours: Option<i64>,
    days: Option<i64>,
    weeks: Option<i64>,
) -> Redirect {
    set_offset(
        cookies,
        get_offset(cookies) - duration(seconds, hours, days, weeks),
    );
    Redirect(redirect)
}

#[derive(Debug, Clone, Copy)]
pub struct Offset(pub Duration);

#[async_trait]
impl<'r> FromRequest<'r> for Offset {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Offset, Infallible> {
        Outcome::Success(Offset(get_offset(req.cookies())))
    }
}

#[derive(Debug, Clone, Copy)]
pub struct OffsetTime(pub DateTime<Utc>);

#[async_trait]
impl<'r> FromRequest<'r> for OffsetTime {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> Outcome<OffsetTime, Infallible> {
        Outcome::Success(OffsetTime(Utc::now() - get_offset(req.cookies())))
    }
}
