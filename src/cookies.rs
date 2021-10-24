use crate::offset::OffsetTime;
use crate::time::DateTime;
use rocket::http::{Cookie, CookieJar, SameSite};
use std::str::FromStr;

pub(crate) trait AsCookie: ToString + FromStr {
    const NAME: &'static str;

    fn modify_on_load(&mut self, _time: DateTime) {}
}

pub(crate) trait CookieJarExt {
    fn load<T: AsCookie>(&self) -> Option<T>;
    fn store<T: AsCookie>(&self, item: &T);
}

impl CookieJarExt for CookieJar<'_> {
    fn load<T: AsCookie>(&self) -> Option<T> {
        T::from_str(self.get_pending(T::NAME)?.value())
            .ok()
            .map(|mut cookie| {
                // this workaround sucks
                if T::NAME != "offset_sec" {
                    if let Some(time) = OffsetTime::from_cookies(self) {
                        cookie.modify_on_load(time.0);
                    }
                }
                cookie
            })
    }

    fn store<T: AsCookie>(&self, item: &T) {
        self.add(
            Cookie::build(T::NAME, item.to_string())
                .same_site(SameSite::Lax)
                .finish(),
        );
    }
}
