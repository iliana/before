use anyhow::Result;
use chrono::{DateTime, SecondsFormat, Utc};
use derive_builder::Builder;
use reqwest::Response;
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Debug, Default, Serialize, Builder)]
pub struct Request {
    #[builder(setter(into))]
    #[serde(skip)]
    route: String,
    #[builder(setter(into, strip_option))]
    #[serde(rename = "type")]
    ty: Option<String>,
    #[builder(setter(strip_option))]
    count: Option<usize>,
    #[builder(setter(strip_option))]
    order: Option<Order>,
    #[builder(setter(strip_option))]
    after: Option<DateTime<Utc>>,
    #[builder(setter(strip_option))]
    before: Option<DateTime<Utc>>,
}

impl RequestBuilder {
    pub async fn send(&self) -> Result<Response> {
        let request = self.build()?;
        Ok(reqwest::get(format!(
            "{}{}?{}",
            option_env!("CHRONICLER_BASE_URL").unwrap_or("https://api.sibr.dev/chronicler/"),
            &request.route,
            serde_urlencoded::to_string(&request)?
        ))
        .await?)
    }
}

impl RequestBuilder {
    pub fn new<I: Into<String>>(route: I) -> RequestBuilder {
        let mut builder = RequestBuilder::default();
        builder.route(route);
        builder
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

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Paginated<T> {
    pub next_page: String,
    pub data: Vec<T>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SiteUpdate {
    pub path: String,
    pub download_url: String,
}
