use crate::chronicler::{Data, Order, RequestBuilder, SiteUpdate};
use anyhow::Result;
use chrono::{DateTime, Utc};
use reqwest::Response;
use rocket::tokio::{join, sync::RwLock};
use std::collections::{BTreeMap, HashMap};

lazy_static::lazy_static! {
    static ref CACHE: RwLock<Cache> = RwLock::new(Cache::default());
}

#[derive(Default)]
struct Cache {
    until: Option<DateTime<Utc>>,
    index: BTreeMap<DateTime<Utc>, SiteUpdate>,
    assets: HashMap<String, BTreeMap<DateTime<Utc>, SiteUpdate>>,
}

async fn update_cache(at: DateTime<Utc>) -> Result<()> {
    let mut request = RequestBuilder::new("v1/site/updates").order(Order::Asc);
    if let Some(until) = CACHE.read().await.until {
        if at <= until {
            return Ok(());
        }
        request = request.after(until);
    }
    log::warn!("updating v1/site/updates cache");
    let (response, mut cache) = join!(request.json::<Data<SiteUpdate>>(), CACHE.write());
    for update in response?.data {
        cache.until = Some(update.timestamp);
        if update.path == "/" {
            cache.index.insert(update.timestamp, update);
        } else {
            cache
                .assets
                .entry(update.path.clone())
                .or_default()
                .insert(update.timestamp, update);
        }
    }
    Ok(())
}

pub async fn get(path: &str, at: DateTime<Utc>) -> Result<Option<Response>> {
    update_cache(at).await?;
    let cache = CACHE.read().await;

    let download_url = if path == "/" {
        cache
            .index
            .range(..=at)
            .rev()
            .next()
            .map(|(_, update)| &update.download_url)
    } else {
        cache.assets.get(path).and_then(|map| {
            map.range(..=at)
                .rev()
                .next()
                .map(|(_, update)| &update.download_url)
        })
    };

    Ok(match download_url {
        Some(url) => Some(
            RequestBuilder::new(format!("v1{}", url))
                .send()
                .await?
                .error_for_status()?,
        ),
        None => None,
    })
}
