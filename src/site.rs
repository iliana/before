use crate::chronicler::{Order, Paginated, RequestBuilder, SiteUpdate};
use anyhow::Result;
use chrono::{DateTime, Utc};
use reqwest::Response;

pub async fn get(path: &str, at: DateTime<Utc>) -> Result<Option<Response>> {
    // TODO cache `v1/site/updates`
    let response: Paginated<SiteUpdate> = RequestBuilder::new("v1/site/updates")
        .order(Order::Descending)
        .before(at)
        .send()
        .await?
        .json()
        .await?;
    Ok(
        match response.data.into_iter().find(|update| update.path == path) {
            Some(update) => Some(
                RequestBuilder::new(format!("v1{}", update.download_url))
                    .send()
                    .await?
                    .error_for_status()?,
            ),
            None => None,
        },
    )
}
