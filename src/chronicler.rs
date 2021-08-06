use anyhow::Result;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use reqwest::Response;
use rocket::futures::stream::Stream as StreamTrait;
use rocket::response::stream::stream;
use serde::{Deserialize, Serialize};
use serde_json::value::{RawValue, Value};
use std::collections::HashMap;

#[derive(Debug, Default, Serialize, Builder)]
#[builder(derive(Clone), pattern = "owned")]
pub struct Request {
    #[builder(setter(into))]
    #[serde(skip)]
    route: String,
    #[builder(default, setter(into, strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    page: Option<String>,
    #[builder(default, setter(strip_option))]
    #[serde(rename = "type", skip_serializing_if = "Option::is_none")]
    ty: Option<&'static str>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    count: Option<usize>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    order: Option<Order>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    id: Option<String>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    at: Option<DateTime<Utc>>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    after: Option<DateTime<Utc>>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    before: Option<DateTime<Utc>>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    started: Option<bool>,
}

impl RequestBuilder {
    pub fn new<I: Into<String>>(route: I) -> RequestBuilder {
        RequestBuilder::default().route(route)
    }

    pub async fn send(self) -> Result<Response> {
        let request = self.build()?;
        let url = format!(
            "{}{}?{}",
            crate::CONFIG.chronicler_base_url,
            &request.route,
            serde_urlencoded::to_string(&request)?
        );
        log::debug!("chronicler request: {}", url);
        Ok(crate::CLIENT.get(url).send().await?)
    }

    pub async fn json<T>(self) -> Result<T>
    where
        for<'de> T: Deserialize<'de>,
    {
        Ok(self.send().await?.json().await?)
    }

    pub fn paged_json<T>(self) -> impl StreamTrait<Item = Result<Version<T>>>
    where
        for<'de> T: Deserialize<'de>,
    {
        stream! {
            let response = self.clone().json::<Versions<T>>().await?;
            for item in response.items {
                yield Ok(item);
            }
            let mut next_page = response.next_page;

            while let Some(page) = next_page {
                let response = self.clone().page(page).json::<Versions<T>>().await?;
                for item in response.items {
                    yield Ok(item);
                }
                next_page = response.next_page;
            }
        }
    }
}

#[derive(Debug, Copy, Clone, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Order {
    Asc,
    Desc,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data<T> {
    pub next_page: Option<String>,
    pub data: Vec<T>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SiteUpdate {
    pub timestamp: DateTime<Utc>,
    pub path: String,
    pub hash: String,
    pub download_url: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Versions<T> {
    pub next_page: Option<String>,
    pub items: Vec<Version<T>>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Version<T> {
    pub valid_from: DateTime<Utc>,
    pub data: T,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Stream {
    pub value: StreamValue,
}

impl Stream {
    pub fn is_empty(&self) -> bool {
        self.value.games.is_none()
            && self.value.leagues.is_none()
            && self.value.temporal.is_none()
            && self.value.fights.is_none()
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct StreamValue {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub games: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub leagues: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub temporal: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub fights: Option<Box<RawValue>>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PlayerNameId {
    pub id: String,
    pub name: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OffseasonRecap {
    pub season: i64,
    // can't use RawValue here due to https://github.com/serde-rs/json/issues/599
    #[serde(flatten)]
    everything_else: HashMap<String, Value>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChroniclerGame {
    pub start_time: DateTime<Utc>,
    pub data: GameDay,
}

// This is (ab)used by crate::time::DayMap::update, don't add fields to this :)
#[derive(Debug, PartialEq, Eq, Hash, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameDay {
    pub season: i64,
    #[serde(default = "default_tournament")]
    pub tournament: i64,
    pub day: i64,
}

fn default_tournament() -> i64 {
    -1
}
