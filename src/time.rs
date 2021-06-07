use chrono::{DateTime, Duration, Utc};
use rocket::async_trait;
use rocket::http::Cookie;
use rocket::request::{FromRequest, Outcome, Request};
use std::convert::Infallible;

fn get_offset(req: &Request<'_>) -> Duration {
    if let Some(secs) = req
        .cookies()
        .get_pending("offset_sec")
        .and_then(|c| c.value().parse().ok())
    {
        Duration::seconds(secs)
    } else {
        let duration = Duration::weeks(2);
        req.cookies().add(Cookie::new(
            "offset_sec",
            duration.num_seconds().to_string(),
        ));
        duration
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
