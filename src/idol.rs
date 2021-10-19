use crate::api::ApiResult;
use crate::cookies::{AsCookie, CookieJarExt};
use derive_more::{Display, FromStr};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};

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
pub(crate) fn choose_idol(
    cookies: &CookieJar<'_>,
    idol: Json<ChooseIdol>,
) -> ApiResult<&'static str> {
    cookies.store(&Idol(idol.into_inner().player_id));
    ApiResult::Ok("New idol chosen.")
}
