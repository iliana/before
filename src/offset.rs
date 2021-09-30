//! Request guards and setters for perceived time offsets.
//!
//! This is the core of Before's "time machine". A cookie, `offset_sec`, contains the number of
//! seconds before current time that the client wants to view (the "perceived time").
//!
//! [`OffsetTime`] is the most commonly-used request guard, which gives a request access to the
//! perceived time. [`Offset`] gives direct access to the perceived time's offset behind current
//! time.
//!
//! In addition to the `offset_sec` cookie, the modified client (see templates/game.html) will send
//! either an `X-Before-Time` header or a `_before_offset_time` query parameter containing the
//! offset. This takes precedence over the `offset_sec` cookie, and is used by the modified client
//! to keep the game state consistent even if you jump time in another browser window/tab.

use crate::cookies::{AsCookie, CookieJarExt};
use crate::time::DateTime;
use anyhow::{anyhow, Error};
use rocket::async_trait;
use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};
use std::fmt::{self, Display};
use std::num::ParseIntError;
use std::str::FromStr;
use time::{Duration, OffsetDateTime};

#[derive(Debug, Clone, Copy)]
pub(crate) struct Offset(pub(crate) Duration);

impl Display for Offset {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0.whole_seconds())
    }
}

impl FromStr for Offset {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Offset, ParseIntError> {
        Ok(Offset(Duration::seconds(i64::from_str(s)?)))
    }
}

impl AsCookie for Offset {
    const NAME: &'static str = "offset_sec";
}

#[async_trait]
impl<'r> FromRequest<'r> for Offset {
    type Error = Error;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Offset, Error> {
        if let Some(seconds) = req
            .headers()
            .get_one("X-Before-Time")
            .and_then(|c| c.parse().ok())
        {
            Outcome::Success(Offset(Duration::seconds(seconds)))
        } else if let Some(seconds) = req.uri().query().and_then(|q| {
            q.segments().find_map(|(k, v)| {
                if k == "_before_offset_time" {
                    v.parse().ok()
                } else {
                    None
                }
            })
        }) {
            Outcome::Success(Offset(Duration::seconds(seconds)))
        } else if let Some(offset) = req.cookies().load::<Offset>() {
            Outcome::Success(offset)
        } else {
            Outcome::Failure((Status::BadRequest, anyhow!("offset not present")))
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub(crate) struct OffsetTime(pub(crate) DateTime);

#[async_trait]
impl<'r> FromRequest<'r> for OffsetTime {
    type Error = Error;

    async fn from_request(req: &'r Request<'_>) -> Outcome<OffsetTime, Error> {
        Offset::from_request(req)
            .await
            .map(|offset| OffsetTime(DateTime::new(OffsetDateTime::now_utc() - offset.0)))
    }
}
