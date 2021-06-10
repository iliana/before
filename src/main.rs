#![deny(rust_2018_idioms)]

mod api;
mod chronicler;
mod database;
mod events;
mod proxy;
mod redirect;
mod site;
mod time;

use crate::proxy::Proxy;
use crate::time::OffsetTime;
use either::Either;
use rocket::http::uri::Origin;
use rocket::request::FromRequest;
use rocket::response::content::{Css, Html};
use rocket::response::{status::NotFound, Redirect};
use rocket::{catch, catchers, get, launch, routes, Request};

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

#[get("/static/<_..>")]
async fn site_static(origin: &Origin<'_>, time: OffsetTime) -> Result<Option<Proxy>> {
    let path = origin.path().as_str();
    Ok(site::get(path, time.0).await?.map(Proxy))
}

#[get("/")]
async fn index(time: OffsetTime) -> Result<Option<Html<String>>> {
    Ok(match site::get("/", time.0).await? {
        Some(response) => Some(Html(
            response
                .text()
                .await
                .map_err(anyhow::Error::from)?
                // inject before code
                .replace(
                    r#"<div id="root">"#,
                    concat!(include_str!("inject.html"), r#"<div id="root">"#),
                )
                .replace(
                    "</head>",
                    r#"<link href="/_before/inject.css" rel="stylesheet"></head>"#,
                )
                // swap title
                .replace("<title>Blaseball</title>", "<title>before.sibr.dev</title>")
                .replace(
                    r#"content="Baseball at your mercy""#,
                    r#"content="&#x1FA78 Do you remember before? &#x1FA78""#,
                )
                // ensure static assets are served by us
                .replace("https://d35iw2jmbg6ut8.cloudfront.net/static/", "/static/")
                // remove opengraph/twitter meta
                .replace(r#"<meta property="og:"#, r#"<meta property="removed:"#)
                .replace(r#"<meta name="twitter:"#, r#"<meta name="removed:"#)
                // remove google analytics so that we don't mess with it
                .replace(
                    "https://pagead2.googlesyndication.com",
                    "https://removed.invalid",
                )
                .replace(
                    "https://www.googletagmanager.com",
                    "https://removed.invalid",
                ),
        )),
        None => None,
    })
}

#[get("/_before/inject.css")]
fn inject_css() -> Css<&'static [u8]> {
    Css(include_bytes!("style.css"))
}

#[get("/auth/logout")]
fn logout() -> Redirect {
    // ... because you're logging out of Before
    Redirect::to("https://www.blaseball.com/")
}

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
async fn index_default(req: &Request<'_>) -> Result<Either<Html<String>, NotFound<()>>> {
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
    // Normally we'd want to return a `Result<Option<_>>` here, but the Responder implementation
    // for Option "fails" with the NotFound Responder. Any failing Responder on a _catcher_ results
    // in a 500. This shouldn't ever happen, but use `Either` to work around this.
    Ok(match index(time).await? {
        Some(response) => Either::Left(response),
        None => Either::Right(NotFound(())),
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", database::entity_routes())
        .mount(
            "/",
            routes![
                api::get_active_bets,
                api::get_user,
                api::get_user_rewards,
                api::update_settings,
                database::player_names_ids,
                events::stream_data,
                time::jump,
                time::relative,
                site_static,
                index,
                inject_css,
                logout,
            ],
        )
        .register("/", catchers![index_default])
}
