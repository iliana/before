use crate::chronicler::{self, iso8601, Paginated, SiteUpdate};
use anyhow::Result;
use chrono::{DateTime, Utc};
use reqwest::{Response, Url};

pub async fn get(path: &str, at: DateTime<Utc>) -> Result<Option<Response>> {
    // TODO cache `v1/site/updates`
    let url = Url::parse_with_params(
        &chronicler::url("v1/site/updates?order=desc"),
        &[("before", iso8601(at))],
    )?;
    let response: Paginated<SiteUpdate> = reqwest::get(url).await?.json().await?;
    Ok(
        match response.data.into_iter().find(|update| update.path == path) {
            Some(update) => Some(
                reqwest::get(chronicler::url(&format!("v1{}", update.download_url)))
                    .await?
                    .error_for_status()?,
            ),
            None => None,
        },
    )
}
