use crate::api::ApiResult;
use crate::cookies::{AsCookie, CookieJarExt};
use derive_more::{Display, FromStr};
use rocket::http::CookieJar;
use rocket::post;
use serde::Serialize;

#[derive(Default, Serialize, Display, FromStr)]
#[serde(transparent)]
pub(crate) struct Squirrels(u8);

impl AsCookie for Squirrels {
    const NAME: &'static str = "squirrels";
}

#[post("/api/buyADangSquirrel")]
pub(crate) fn buy_a_dang_squirrel(cookies: &CookieJar<'_>) -> ApiResult<&'static str> {
    if let Some(n) = cookies
        .load::<Squirrels>()
        .unwrap_or_default()
        .0
        .checked_add(1)
    {
        cookies.store(&Squirrels(n));
    }
    ApiResult::Ok("Bought a squirrel.")
}
