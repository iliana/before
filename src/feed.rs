use crate::offset::OffsetTime;
use crate::time::DateTime;
use crate::{Config, Result};
use itertools::Itertools;
use reqwest::Url;
use rocket::serde::json::Json;
use rocket::{get, State};
use serde::{de::DeserializeOwned, Deserialize};
use serde_json::value::RawValue;

const PROVIDER: &str = "7fcb63bc-11f2-40b9-b465-f1d458692a63";

// when we just need basic counting. it ain't pretty but i have no better ideas also i'm tired
// - allie
#[derive(Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub(crate) struct MinimalFeedEvent {
    #[serde(default)]
    pub(crate) player_tags: Vec<String>,
    #[serde(default)]
    pub(crate) team_tags: Vec<String>,
    pub(crate) created: DateTime,
    #[serde(rename = "type")]
    pub(crate) etype: i32,
}

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

pub(crate) async fn count_events<I, K, V>(
    config: &Config,
    event_types: &[i32],
    from: DateTime,
    to: DateTime,
    extra_filters: I,
) -> anyhow::Result<usize>
where
    I: IntoIterator,
    I::Item: core::borrow::Borrow<(K, V)>,
    K: AsRef<str>,
    V: AsRef<str>,
{
    #[derive(serde::Deserialize)]
    struct Count {
        count: usize,
    }

    let mut url = Url::parse_with_params(
        &format!("{}count", config.eventually_base_url),
        [
            ("before", to.to_string().as_str()),
            ("after", from.to_string().as_str()),
            (
                "type",
                event_types
                    .iter()
                    .map(std::string::ToString::to_string)
                    .join("_or_")
                    .as_str(),
            ),
        ],
    )?;

    url.query_pairs_mut().extend_pairs(extra_filters);

    Ok(config
        .client
        .get(url)
        .send()
        .await?
        .json::<Count>()
        .await
        .map(|v| v.count)?)
}

pub(crate) async fn all_events_for_game<T: DeserializeOwned>(
    config: &Config,
    game: &str,
    before: DateTime,
    after: DateTime,
    quant: &str,
) -> anyhow::Result<Vec<T>> {
    let url = Url::parse_with_params(
        &format!("{}events", config.eventually_base_url),
        [
            ("before", before.to_string().as_str()),
            ("after", after.to_string().as_str()),
            ("gameTags", game),
            ("limit", quant),
        ],
    )?;

    println!("{}", url.as_str());

    Ok(config
        .client
        .get(url)
        .send()
        .await?
        .json::<Vec<T>>()
        .await?)
}
