use crate::chronicler::{Data, Order, RequestBuilder, SiteUpdate};
use crate::proxy::Proxy;
use crate::time::OffsetTime;
use anyhow::{bail, Result};
use chrono::{DateTime, Utc};
use reqwest::Response;
use rocket::get;
use rocket::http::uri::Origin;
use rocket::tokio::{join, sync::RwLock};
use std::collections::{BTreeMap, HashMap};
use std::path::PathBuf;

lazy_static::lazy_static! {
    /// After this point, site data from Chronicler is self-contained. Before this point, we need
    /// to heuristically determine a decent set of code to load.
    static ref CHRONICLER_EPOCH: DateTime<Utc> = "2020-09-22T20:36:48.327677Z".parse().unwrap();

    static ref CACHE: RwLock<Cache> = RwLock::new(Cache::default());
}

#[derive(Default)]
struct Cache {
    /// The last time we fetched `v1/site/updates`, used to determine if we need to fetch again.
    until: Option<DateTime<Utc>>,
    /// `/`
    index: BTreeMap<DateTime<Utc>, SiteUpdate>,
    /// `main.{}.chunk.css`
    css: BTreeMap<DateTime<Utc>, SiteUpdate>,
    /// `main.{}.chunk.js`
    js_main: BTreeMap<DateTime<Utc>, SiteUpdate>,
    /// `2.{}.chunk.js`
    js_2: BTreeMap<DateTime<Utc>, SiteUpdate>,
    /// Assets (non `/` paths)
    assets: HashMap<String, SiteUpdate>,
}

pub async fn update_cache(at: DateTime<Utc>) -> Result<()> {
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
        if update.path == "/" {
            cache.index.insert(update.timestamp, update);
        } else {
            cache.assets.insert(update.path.clone(), update.clone());
            match update.path.rsplitn(2, '/').next() {
                Some(x) if x.starts_with("main.") && x.ends_with(".css") => {
                    cache.css.insert(update.timestamp, update);
                }
                Some(x) if x.starts_with("main.") && x.ends_with(".js") => {
                    cache.js_main.insert(update.timestamp, update);
                }
                Some(x) if x.starts_with("2.") && x.ends_with(".js") => {
                    cache.js_2.insert(update.timestamp, update);
                }
                _ => {}
            }
        }
    }
    cache.until = Some(Utc::now());
    Ok(())
}

impl SiteUpdate {
    async fn fetch(&self) -> Result<Response> {
        Ok(RequestBuilder::new(format!("v1{}", self.download_url))
            .send()
            .await?
            .error_for_status()?)
    }
}

#[get("/static/heuristic/<path..>", rank = 1)]
pub async fn site_static_heuristic(
    path: PathBuf,
    time: OffsetTime,
) -> crate::Result<Option<Proxy>> {
    update_cache(time.0).await?;
    let cache = CACHE.read().await;

    // Do you remember before? For the most part we have all the JavaScript assets, but we're
    // missing a lot of CSS and index assets.
    //
    // For JS, grab the most recent asset of that type; for CSS, grab the next asset in the
    // future. The CSS is usually backwards-compatible; we can tweak if we need to.
    let update = match path.file_name().and_then(|s| s.to_str()) {
        Some(x) if x.starts_with("main.") && x.ends_with(".css") => {
            cache.css.range(time.0..).next()
        }
        Some(x) if x.starts_with("main.") && x.ends_with(".js") => {
            cache.js_main.range(..=time.0).rev().next()
        }
        Some(x) if x.starts_with("2.") && x.ends_with(".js") => {
            cache.js_2.range(..=time.0).rev().next()
        }
        _ => None,
    };
    Ok(match update {
        Some((_, update)) => Some(Proxy {
            response: update.fetch().await?,
            etag: None,
        }),
        None => None,
    })
}

#[get("/static/<_..>", rank = 2)]
pub async fn site_static(origin: &Origin<'_>, time: OffsetTime) -> crate::Result<Option<Proxy>> {
    update_cache(time.0).await?;
    let cache = CACHE.read().await;

    Ok(match cache.assets.get(origin.path().as_str()) {
        Some(update) => Some(Proxy {
            response: update.fetch().await?,
            etag: Some(update.hash.clone()),
        }),
        None => None,
    })
}

pub async fn get_index(at: DateTime<Utc>) -> Result<String> {
    update_cache(at).await?;
    let cache = CACHE.read().await;

    let update = if at >= *CHRONICLER_EPOCH {
        cache.index.range(..=at).rev().next()
    } else {
        // Similar logic as `site_static`'s handling of CSS assets.
        cache.index.range(at..).next()
    };
    let text = match update {
        Some((_, update)) => update.fetch().await?.text().await?,
        None => bail!("failed to find `/` asset somehow"),
    };
    Ok(if at >= *CHRONICLER_EPOCH {
        text
    } else {
        text.replace("\"/static/", "\"/static/heuristic/")
    })
}
