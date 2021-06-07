use chrono::{DateTime, SecondsFormat, Utc};
use serde::Deserialize;

pub fn iso8601(t: DateTime<Utc>) -> String {
    t.to_rfc3339_opts(SecondsFormat::AutoSi, true)
}

pub fn url(s: &str) -> String {
    format!(
        "{}{}",
        option_env!("CHRONICLER_BASE_URL").unwrap_or("https://api.sibr.dev/chronicler/"),
        s
    )
}

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
