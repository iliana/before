use crate::cookies::{AsCookie, CookieJarExt};
use derive_more::{Display, FromStr};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Serialize, Display, FromStr)]
#[serde(transparent)]
pub(crate) struct Idol(String);

impl AsCookie for Idol {
    const NAME: &'static str = "idol";
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ChooseIdol {
    player_id: String,
}

#[post("/api/chooseIdol", data = "<idol>")]
pub(crate) fn choose_idol(cookies: &CookieJar<'_>, idol: Json<ChooseIdol>) -> Json<Value> {
    cookies.store(&Idol(idol.into_inner().player_id));
    Json(json!({"message": "New idol chosen."}))
}
