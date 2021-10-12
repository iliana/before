use crate::cookies::{AsCookie, CookieJarExt};
use derive_more::{Display, FromStr};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::Serialize;
use serde_json::{json, Value};

#[derive(Default, Serialize, Display, FromStr)]
#[serde(transparent)]
pub(crate) struct Squirrels(u8);

impl AsCookie for Squirrels {
    const NAME: &'static str = "squirrels";
}

#[post("/api/buyADangSquirrel")]
pub(crate) fn buy_a_dang_squirrel(cookies: &CookieJar<'_>) -> Json<Value> {
    if let Some(n) = cookies
        .load::<Squirrels>()
        .unwrap_or_default()
        .0
        .checked_add(1)
    {
        cookies.store(&Squirrels(n));
    }
    Json(json!({"message": "Bought a squirrel."}))
}
