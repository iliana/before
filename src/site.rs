use crate::chronicler::{Data, Order, RequestBuilder, SiteUpdate};
use crate::proxy::Proxy;
use crate::time::OffsetTime;
use crate::{Config, Result};
use anyhow::anyhow;
use askama::Template;
use chrono::{DateTime, Duration, DurationRound, Utc};
use either::Either;
use reqwest::Response;
use rocket::http::{uri::Origin, Status};
use rocket::request::FromRequest;
use rocket::response::{content::Html, status::Custom, status::NotFound, Redirect};
use rocket::tokio::{join, sync::RwLock};
use rocket::{catch, get, uri, Request, State};
use serde::Deserialize;
use std::collections::{BTreeMap, HashMap};

lazy_static::lazy_static! {
    /// After this point, Chronicler fetched main.js and 2.js.
    static ref CHRONICLER_JS_EPOCH: DateTime<Utc> = "2020-09-07T23:29:00Z".parse().unwrap();

    /// After this point, Chronicler fetched main.css in addition to the JS assets.
    static ref CHRONICLER_CSS_EPOCH: DateTime<Utc> = "2020-09-11T16:58:00Z".parse().unwrap();

    static ref EARLY_ASSETS: BTreeMap<DateTime<Utc>, AssetSet<'static>> =
        toml::from_str(include_str!("../data/assets.toml")).unwrap();

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

pub(crate) async fn update_cache(config: &Config, at: DateTime<Utc>) -> anyhow::Result<()> {
    let mut request = RequestBuilder::new("v1/site/updates").order(Order::Asc);
    if let Some(until) = CACHE.read().await.until {
        if at <= until {
            return Ok(());
        }
        request = request.after(until);
    }
    log::warn!("updating v1/site/updates cache");

    let (response, mut cache) = join!(request.json::<Data<SiteUpdate>>(config), CACHE.write());
    for mut update in response?.data {
        // round down timestamps to the most recent minute so that we get consistent update sets
        update.timestamp = update.timestamp.duration_round(Duration::minutes(1))?;
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
    async fn fetch(&self, config: &Config) -> anyhow::Result<Response> {
        Ok(RequestBuilder::new(format!("v1{}", self.download_url))
            .send(config)
            .await?
            .error_for_status()?)
    }
}

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
            etag: Some(update.hash.clone()),
        }),
        None => None,
    })
}

#[derive(Deserialize, Clone, Copy)]
struct AssetSet<'a> {
    css: &'a str,
    js_main: &'a str,
    js_2: &'a str,
}

type IndexResponse = Either<Custom<Html<String>>, Redirect>;

fn fetch_cache(
    cache: &BTreeMap<DateTime<Utc>, SiteUpdate>,
    time: DateTime<Utc>,
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

#[derive(Template)]
#[template(path = "game.html")]
struct GameTemplate<'a> {
    assets: AssetSet<'a>,
    eyes_fix: bool,
}

#[get("/")]
pub(crate) async fn index(
    time: Option<OffsetTime>,
    config: &State<Config>,
) -> Result<IndexResponse> {
    let time = match time {
        Some(time) => time,
        None => return Ok(Either::Right(Redirect::to(uri!(crate::start::start)))),
    };

    update_cache(config, time.0).await?;
    let cache = CACHE.read().await;

    macro_rules! opt {
        ($x:expr) => {
            $x.ok_or_else(|| anyhow!("cache was empty"))
        };
    }

    let assets = if time.0 >= *CHRONICLER_JS_EPOCH {
        AssetSet {
            css: &opt!(fetch_cache(
                &cache.css,
                time.0,
                time.0 >= *CHRONICLER_CSS_EPOCH
            ))?
            .path,
            js_main: &opt!(fetch_cache(&cache.js_main, time.0, true))?.path,
            js_2: &opt!(fetch_cache(&cache.js_2, time.0, true))?.path,
        }
    } else if let Some(template) = EARLY_ASSETS.range(..time.0).map(|(_, v)| v).rev().next() {
        *template
    } else {
        return Ok(Either::Right(Redirect::to(uri!(crate::start::start))));
    };

    let template = GameTemplate {
        assets,
        // between "2020-10-19T17:40:00Z" and "2020-10-25T06:50:00Z"
        eyes_fix: (1603129200000..1603608600000).contains(&time.0.timestamp_millis()),
    };

    Ok(Either::Left(Custom(
        Status::Ok,
        Html(template.render().map_err(anyhow::Error::from)?),
    )))
}

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
pub(crate) async fn index_default(
    req: &Request<'_>,
) -> Result<Either<IndexResponse, NotFound<()>>> {
    let path = req.uri().path();
    if [
        "/api",
        "/auth",
        "/database",
        "/events",
        "/static",
        "/_before",
    ]
    .iter()
    .any(|p| path.starts_with(p))
    {
        return Ok(Either::Right(NotFound(())));
    }

    let time: Option<OffsetTime> = FromRequest::from_request(req).await.unwrap();
    let config: &State<Config> = FromRequest::from_request(req).await.unwrap();
    Ok(Either::Left(index(time, config).await?))
}
