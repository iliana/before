use crate::offset::OffsetTime;
use crate::{Config, Result};
use reqwest::Url;
use rocket::serde::json::Json;
use rocket::{get, State};
use serde_json::value::RawValue;

const PROVIDER: &str = "7fcb63bc-11f2-40b9-b465-f1d458692a63";

#[allow(clippy::too_many_arguments)]
#[get("/database/feed/<kind>?<id>&<start>&<category>&<sort>&<limit>")]
pub(crate) async fn feed(
    config: &State<Config>,
    kind: &str,
    id: Option<&str>,
    start: Option<&str>,
    category: Option<&str>,
    sort: Option<&str>,
    limit: Option<&str>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = Url::parse_with_params(
        &format!("{}feed/{}", config.upnuts_base_url, kind),
        [
            ("one_of_providers", Some(PROVIDER)),
            (
                "time",
                Some(time.0.unix_timestamp_millis().to_string().as_str()),
            ),
            ("id", id),
            ("start", start),
            ("category", category),
            ("sort", sort),
            ("limit", limit),
        ]
        .into_iter()
        .filter_map(|(k, v)| v.map(|v| (k, v))),
    )
    .map_err(anyhow::Error::from)?;

    Ok(Json(
        config
            .client
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feedbyphase?<phase>&<season>")]
pub(crate) async fn feedbyphase(
    config: &State<Config>,
    phase: &str,
    season: &str,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = Url::parse_with_params(
        &format!("{}/feed/global", config.upnuts_base_url),
        [
            ("one_of_providers", PROVIDER),
            ("time", time.0.unix_timestamp_millis().to_string().as_str()),
            ("sort", "1"),
            ("limit", "1000"),
            ("phase", phase),
            ("season", season),
        ],
    )
    .map_err(anyhow::Error::from)?;

    Ok(Json(
        config
            .client
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}
