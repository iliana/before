use crate::cookies::{AsCookie, CookieJarExt};
use derive_more::{Display, FromStr};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Clone, Copy, Default, Display, FromStr, Serialize)]
#[serde(transparent)]
pub(crate) struct LightMode(bool);

impl AsCookie for LightMode {
    const NAME: &'static str = "light_mode";
}

#[derive(Debug, Clone, Copy, Default, Display, FromStr, Serialize)]
#[serde(transparent)]
pub(crate) struct DisableMotion(bool);

impl AsCookie for DisableMotion {
    const NAME: &'static str = "motion";
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Settings {
    light_mode: Option<bool>,
    motion: Option<bool>,
}

#[post("/api/updateSettings", data = "<settings>")]
pub(crate) fn update_settings(cookies: &CookieJar<'_>, settings: Json<Settings>) -> Json<Value> {
    if let Some(light_mode) = settings.light_mode {
        cookies.store(&LightMode(light_mode));
    }
    if let Some(motion) = settings.motion {
        cookies.store(&DisableMotion(motion));
    }
    Json(json!({ "message": "Settings updated" }))
}
