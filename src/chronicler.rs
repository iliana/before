use anyhow::Result;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use reqwest::Response;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::fmt;

lazy_static::lazy_static! {
    static ref BASE_URL: String = std::env::var("CHRONICLER_BASE_URL")
        .ok()
        .unwrap_or_else(|| "https://api.sibr.dev/chronicler/".to_string());
}

#[derive(Debug, Default, Serialize, Builder)]
#[builder(pattern = "owned")]
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
    at: Option<DateTime<Utc>>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    after: Option<DateTime<Utc>>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    before: Option<DateTime<Utc>>,
}

impl RequestBuilder {
    pub async fn send(self) -> Result<Response> {
        let request = self.build()?;
        let url = format!(
            "{}{}?{}",
            *BASE_URL,
            &request.route,
            serde_urlencoded::to_string(&request)?
        );
        log::debug!("chronicler request: {}", url);
        Ok(reqwest::get(url).await?)
    }

    pub async fn json<T>(self) -> Result<T>
    where
        for<'de> T: Deserialize<'de>,
    {
        Ok(self.send().await?.json().await?)
    }
}

impl RequestBuilder {
    pub fn new<I: Into<String>>(route: I) -> RequestBuilder {
        RequestBuilder::default().route(route)
    }
}

#[derive(Debug, Copy, Clone)]
pub enum Order {
    Ascending,
    Descending,
}

impl fmt::Display for Order {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Order::Ascending => "asc",
            Order::Descending => "desc",
        }
        .fmt(f)
    }
}

serde_plain::derive_serialize_from_display!(Order);

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Paginated<T> {
    pub next_page: Option<String>,
    pub data: Vec<T>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SiteUpdate {
    pub path: String,
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

#[derive(Debug, Deserialize, Serialize)]
pub struct StreamValue {
    pub games: Option<Box<RawValue>>,
    pub leagues: Option<Box<RawValue>>,
    pub temporal: Option<Box<RawValue>>,
    pub fights: Option<Box<RawValue>>,
}
