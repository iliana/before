#![allow(clippy::case_sensitive_file_extension_comparisons)]

use crate::chronicler::{Data, Order, RequestBuilder};
use crate::offset::OffsetTime;
use crate::proxy::Proxy;
use crate::time::{datetime, DateTime, Duration};
use crate::Config;
use reqwest::Response;
use rocket::http::uri::Origin;
use rocket::tokio::sync::RwLock;
use rocket::{get, State};
use serde::Deserialize;
use std::collections::{BTreeMap, HashMap};

lazy_static::lazy_static! {
    static ref EARLY_ASSETS: BTreeMap<DateTime, AssetSet<'static>> =
        toml::from_str(include_str!("../data/assets.toml")).unwrap();

    pub(crate) static ref CACHE: RwLock<Cache> = RwLock::new(Cache::default());
}

/// After this point, Chronicler fetched main.js and 2.js.
const CHRONICLER_JS_EPOCH: DateTime = datetime!(2020-09-07 23:29:00 UTC);

/// After this point, Chronicler fetched main.css in addition to the JS assets.
const CHRONICLER_CSS_EPOCH: DateTime = datetime!(2020-09-11 16:58:00 UTC);

#[derive(Clone, Copy, Deserialize)]
pub(crate) struct AssetSet<'a> {
    pub(crate) css: &'a str,
    pub(crate) js_main: &'a str,
    pub(crate) js_2: &'a str,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
struct SiteUpdate {
    timestamp: DateTime,
    path: String,
    hash: String,
    download_url: String,
}

impl SiteUpdate {
    async fn fetch(&self, config: &Config) -> anyhow::Result<Response> {
        Ok(config
            .client
            .get(format!(
                "{}v1{}",
                config.chronicler_base_url, self.download_url
            ))
            .send()
            .await?
            .error_for_status()?)
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Default)]
pub(crate) struct Cache {
    /// The last time we fetched `v1/site/updates`, used to determine if we need to fetch again.
    until: Option<DateTime>,
    /// `/`
    index: BTreeMap<DateTime, SiteUpdate>,
    /// `main.{}.chunk.css`
    css: BTreeMap<DateTime, SiteUpdate>,
    /// `main.{}.chunk.js`
    js_main: BTreeMap<DateTime, SiteUpdate>,
    /// `2.{}.chunk.js`
    js_2: BTreeMap<DateTime, SiteUpdate>,
    /// Assets (non `/` paths)
    assets: HashMap<String, SiteUpdate>,
}

impl Cache {
    pub(crate) fn assets(&self, time: DateTime) -> Option<AssetSet<'_>> {
        if time >= CHRONICLER_JS_EPOCH {
            Some(AssetSet {
                css: &fetch_cache(&self.css, time, time >= CHRONICLER_CSS_EPOCH)?.path,
                js_main: &fetch_cache(&self.js_main, time, true)?.path,
                js_2: &fetch_cache(&self.js_2, time, true)?.path,
            })
        } else {
            EARLY_ASSETS
                .range(..time)
                .map(|(_, v)| v)
                .rev()
                .next()
                .copied()
        }
    }
}

fn fetch_cache(
    cache: &BTreeMap<DateTime, SiteUpdate>,
    time: DateTime,
    rev: bool,
) -> Option<&SiteUpdate> {
    let update = if rev {
        cache.range(..=time).rev().next()
    } else {
        cache.range(time..).next()
    };
    update
        .or_else(|| {
            if rev {
                cache.iter().next()
            } else {
                cache.iter().rev().next()
            }
        })
        .map(|(_, update)| update)
}

pub(crate) async fn update_cache(config: &Config, at: DateTime) -> anyhow::Result<()> {
    let mut request = RequestBuilder::v1("site/updates").order(Order::Asc);
    if let Some(until) = CACHE.read().await.until {
        if at <= until {
            return Ok(());
        }
        request = request.after(until);
    }
    log::warn!("updating v1/site/updates cache");

    let response: Data<SiteUpdate> = request.json(config).await?;
    if !response.data.is_empty() {
        let mut cache = CACHE.write().await;
        for mut update in response.data {
            // round down timestamps to the most recent minute so that we get consistent update sets
            update.timestamp = update.timestamp.trunc(Duration::minutes(1))?;
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
        cache.until = Some(DateTime::now());
    }
    Ok(())
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/static/<_..>", rank = 1)]
pub(crate) async fn site_static(
    origin: &Origin<'_>,
    time: OffsetTime,
    config: &State<Config>,
) -> crate::Result<Option<Proxy>> {
    update_cache(config, time.0).await?;
    let cache = CACHE.read().await;

    Ok(match cache.assets.get(origin.path().as_str()) {
        Some(update) => Some(Proxy {
            response: update.fetch(config).await?,
            etag: config.site_cache.then(|| update.hash.clone()),
        }),
        None => None,
    })
}
