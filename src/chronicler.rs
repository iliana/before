use anyhow::Result;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use reqwest::Response;
use rocket::futures::stream::Stream as StreamTrait;
use rocket::response::stream::stream;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;

lazy_static::lazy_static! {
    static ref BASE_URL: String = std::env::var("CHRONICLER_BASE_URL")
        .ok()
        .unwrap_or_else(|| "https://api.sibr.dev/chronicler/".to_string());
}

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
}

impl RequestBuilder {
    pub fn new<I: Into<String>>(route: I) -> RequestBuilder {
        RequestBuilder::default().route(route)
    }

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

#[derive(Debug, Deserialize, Serialize)]
pub struct PlayerNameId {
    pub id: String,
    pub name: String,
}
