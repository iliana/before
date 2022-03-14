//! Wrappers for and re-exports of `time`.

pub(crate) use time::Duration;

use anyhow::{Context, Result};
use derive_more::{From, Into};
use serde::ser::{Error as _, Serialize, Serializer};
use std::ops::{Add, AddAssign, Sub, SubAssign};
use std::str::FromStr;
use time::format_description::well_known::Rfc3339;
use time::OffsetDateTime;

/// Wrapper type for [`OffsetDateTime`].
///
/// This wrapper type is probably the most convenient way to consistently serialize/deserialize a
/// timestamp as an RFC 3339 string.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, From, Into)]
pub(crate) struct DateTime(OffsetDateTime);

impl DateTime {
    pub(crate) const fn new(inner: OffsetDateTime) -> DateTime {
        DateTime(inner)
    }

    pub(crate) fn now() -> DateTime {
        DateTime(OffsetDateTime::now_utc())
    }

    pub(crate) fn unix_timestamp_millis(&self) -> i128 {
        self.0.unix_timestamp_nanos() / 1_000_000
    }

    pub(crate) fn trunc(&self, duration: Duration) -> Result<DateTime> {
        let time = self.0.unix_timestamp_nanos();
        let delta = time
            .checked_rem(duration.whole_nanoseconds())
            .context("divide by zero")?;
        Ok(DateTime(OffsetDateTime::from_unix_timestamp_nanos(
            time - delta,
        )?))
    }
}

impl Add<Duration> for DateTime {
    type Output = DateTime;

    fn add(self, rhs: Duration) -> DateTime {
        DateTime(self.0 + rhs)
    }
}

impl AddAssign<Duration> for DateTime {
    fn add_assign(&mut self, rhs: Duration) {
        self.0 += rhs;
    }
}

impl Sub<Duration> for DateTime {
    type Output = DateTime;

    fn sub(self, rhs: Duration) -> DateTime {
        DateTime(self.0 - rhs)
    }
}

impl SubAssign<Duration> for DateTime {
    fn sub_assign(&mut self, rhs: Duration) {
        self.0 -= rhs;
    }
}

impl Sub<DateTime> for DateTime {
    type Output = Duration;

    fn sub(self, rhs: DateTime) -> Duration {
        self.0 - rhs.0
    }
}

impl FromStr for DateTime {
    type Err = time::error::Parse;

    fn from_str(s: &str) -> Result<DateTime, time::error::Parse> {
        OffsetDateTime::parse(s, &Rfc3339).map(DateTime)
    }
}

impl Serialize for DateTime {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        self.0
            .format(&Rfc3339)
            .map_err(S::Error::custom)?
            .serialize(serializer)
    }
}

serde_plain::derive_deserialize_from_fromstr!(DateTime, "valid RFC 3339 date string");
serde_plain::derive_display_from_serialize!(DateTime);

macro_rules! datetime {
    ($($tt:tt)*) => {
        $crate::time::DateTime::new(::time::macros::datetime!($($tt)*))
    };
}

pub(crate) use datetime;

#[cfg(test)]
#[test]
fn test_from_empty_str() {
    assert!(DateTime::from_str("").is_err());
}
