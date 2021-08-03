use crate::chronicler::{Data, Order, RequestBuilder, SiteUpdate};
use crate::proxy::Proxy;
use crate::time::OffsetTime;
use crate::Result;
use anyhow::anyhow;
use askama::Template;
use chrono::{DateTime, Utc};
use either::Either;
use reqwest::Response;
use rocket::http::{uri::Origin, Status};
use rocket::request::FromRequest;
use rocket::response::content::Html;
use rocket::response::{status::Custom, status::NotFound};
use rocket::tokio::{join, sync::RwLock};
use rocket::{catch, get, Request};
use std::collections::{BTreeMap, HashMap};

lazy_static::lazy_static! {
    /// After this point, site data from Chronicler is self-contained. Before this point, we need
    /// to heuristically determine a decent set of code to load.
    static ref CHRONICLER_EPOCH: DateTime<Utc> = "2020-09-08T02:00:00Z".parse().unwrap();

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

pub async fn update_cache(at: DateTime<Utc>) -> anyhow::Result<()> {
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
    async fn fetch(&self) -> anyhow::Result<Response> {
        Ok(RequestBuilder::new(format!("v1{}", self.download_url))
            .send()
            .await?
            .error_for_status()?)
    }
}

#[get("/static/<_..>", rank = 1)]
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

#[derive(Template)]
#[template(path = "game.html")]
struct GameTemplate<'a> {
    css: &'a SiteUpdate,
    js_main: &'a SiteUpdate,
    js_2: &'a SiteUpdate,
}

#[get("/")]
pub async fn index(time: OffsetTime) -> Result<Html<String>> {
    update_cache(time.0).await?;
    let cache = CACHE.read().await;

    macro_rules! opt {
        ($x:expr) => {
            $x.ok_or_else(|| anyhow!("cache was empty"))
        };
    }

    // Do you remember before? For the most part we have all the JavaScript assets, but we're
    // missing a lot of CSS and index assets.
    //
    // For JS, grab the most recent asset of that type; for CSS, grab the next asset in the
    // future. The CSS is usually backwards-compatible; we can tweak if we need to.
    let template = GameTemplate {
        css: opt!(cache.css.range(time.0..).next())?.1,
        js_main: opt!(cache.js_main.range(..=time.0).rev().next())?.1,
        js_2: opt!(cache.js_2.range(..=time.0).rev().next())?.1,
    };
    Ok(Html(template.render().map_err(anyhow::Error::from)?))
}

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
pub async fn index_default(
    req: &Request<'_>,
) -> Result<Either<Custom<Html<String>>, NotFound<()>>> {
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

    let time = OffsetTime::from_request(req).await.unwrap();
    Ok(Either::Left(Custom(Status::Ok, index(time).await?)))
}
