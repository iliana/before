use crate::config::Config;
use crate::media::{self, Static};
use crate::offset::OffsetTime;
use crate::site::AssetSet;
use crate::time::{datetime, DateTime};
use crate::Result;
use anyhow::anyhow;
use askama::Template;
use core::ops::Range;
use rocket::http::Header;
use rocket::request::FromRequest;
use rocket::response::Redirect;
use rocket::Responder;
use rocket::{catch, get, Request, State};
use textnonce::TextNonce;

const EYES_FIX_RANGE: Range<DateTime> =
    datetime!(2020-10-19 17:40:00 UTC)..datetime!(2020-10-25 06:50:00 UTC);

#[get("/")]
pub(crate) async fn index(
    time: Option<OffsetTime>,
    config: &State<Config>,
) -> Result<Response<'_>> {
    let time = match time {
        Some(time) => time,
        None => return Ok(Response::Redirect(Redirect::to("/_before/start"))),
    };

    crate::site::update_cache(config, time.0).await?;

    let nonce = TextNonce::sized_urlsafe(24).map_err(|err| anyhow!(err))?;
    let body_class = if EYES_FIX_RANGE.contains(&time.0) {
        "tw-before-eyes-fix"
    } else {
        ""
    };
    let matomo = match (config.matomo_base_url.as_ref(), config.matomo_site_id) {
        (Some(base_url), Some(site_id)) => Some(Matomo {
            base_url: base_url.trim_end_matches('/'),
            site_id,
        }),
        _ => None,
    };

    let cache = crate::site::CACHE.read().await;
    let assets = cache
        .assets(time.0)
        .ok_or_else(|| anyhow!("cache was empty"))?;

    let template = Client {
        nav: media::fetch_static_str(config, "fragment/nav.html").await?,
        css_path: config.css_path.as_deref().unwrap_or("/_before/styles.css"),
        nonce: &nonce,
        assets,
        body_class,
        matomo,
    };

    Ok(Response::Html {
        data: template.render().map_err(anyhow::Error::from)?,
        csp: ContentSecurityPolicy {
            template: &config.content_security_policy,
            nonce,
        },
    })
}

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[allow(clippy::needless_lifetimes)] // false positive
#[catch(404)]
pub(crate) async fn index_default<'a>(req: &'a Request<'_>) -> Result<Response<'a>> {
    let path = req.uri().path();
    let time = <Option<OffsetTime>>::from_request(req).await.unwrap();
    let config = <&State<Config>>::from_request(req).await.unwrap();

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
        media::static_root(config, "404.html".into(), None)
            .await
            .map(Response::NotFound)
    } else {
        index(time, config).await
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[allow(clippy::large_enum_variant)]
#[derive(Responder)]
pub(crate) enum Response<'a> {
    #[response(status = 200, content_type = "html")]
    Html {
        data: String,
        csp: ContentSecurityPolicy<'a>,
    },
    Redirect(Redirect),
    #[response(status = 404)]
    NotFound(Option<Static>),
}

pub(crate) struct ContentSecurityPolicy<'a> {
    template: &'a str,
    nonce: TextNonce,
}

impl<'a> From<ContentSecurityPolicy<'a>> for Header<'static> {
    fn from(csp: ContentSecurityPolicy<'a>) -> Header<'static> {
        Header::new(
            "content-security-policy",
            csp.template.replace("{nonce}", &csp.nonce),
        )
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Template)]
#[template(path = "client.html")]
struct Client<'a> {
    nav: String,
    css_path: &'a str,
    nonce: &'a TextNonce,
    assets: AssetSet<'a>,
    body_class: &'static str,
    matomo: Option<Matomo<'a>>,
}

struct Matomo<'a> {
    base_url: &'a str,
    site_id: i64,
}
