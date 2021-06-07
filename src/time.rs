use chrono::{DateTime, Duration, Utc};
use rocket::http::{Cookie, CookieJar};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::{async_trait, get};
use std::convert::Infallible;

fn get_offset(req: &Request<'_>) -> Duration {
    if let Some(secs) = req
        .cookies()
        .get_pending("offset_sec")
        .and_then(|c| c.value().parse().ok())
    {
        Duration::seconds(secs)
    } else {
        let duration = Duration::weeks(3);
        set_offset_inner(req.cookies(), duration);
        duration
    }
}

fn set_offset_inner(cookies: &CookieJar<'_>, duration: Duration) {
    cookies.add(Cookie::new(
        "offset_sec",
        duration.num_seconds().to_string(),
    ));
}

#[get("/_before/set_offset?<seconds>&<hours>&<days>&<weeks>")]
pub fn set_offset(
    cookies: &CookieJar<'_>,
    seconds: Option<i64>,
    hours: Option<i64>,
    days: Option<i64>,
    weeks: Option<i64>,
) -> &'static str {
    set_offset_inner(
        cookies,
        Duration::seconds(seconds.unwrap_or(0))
            + Duration::hours(hours.unwrap_or(0))
            + Duration::days(days.unwrap_or(0))
            + Duration::weeks(weeks.unwrap_or(0)),
    );
    "OK"
}

#[derive(Debug, Clone, Copy)]
pub struct Offset(pub Duration);

#[async_trait]
impl<'r> FromRequest<'r> for Offset {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Offset, Infallible> {
        Outcome::Success(Offset(get_offset(req)))
    }
}

#[derive(Debug, Clone, Copy)]
pub struct OffsetTime(pub DateTime<Utc>);

#[async_trait]
impl<'r> FromRequest<'r> for OffsetTime {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> Outcome<OffsetTime, Infallible> {
        Outcome::Success(OffsetTime(Utc::now() - get_offset(req)))
    }
}
