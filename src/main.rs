#![deny(rust_2018_idioms)]

mod api;
mod chronicler;
mod database;
mod error;
mod events;
mod proxy;
mod redirect;
mod site;
mod time;

use crate::redirect::Redirect;
use crate::time::OffsetTime;
use chrono::Utc;
use either::Either;
use rand::seq::SliceRandom;
use rand::thread_rng;
use rocket::http::CookieJar;
use rocket::request::FromRequest;
use rocket::response::content::{Css, Html};
use rocket::response::{status::NotFound, Redirect as Redir};
use rocket::tokio;
use rocket::{catch, catchers, get, launch, routes, Request};

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

fn choose<'a>(x: &[&'a str]) -> &'a str {
    debug_assert!(!x.is_empty());
    x.choose(&mut thread_rng()).cloned().unwrap_or_default()
}

#[get("/")]
async fn index(time: OffsetTime) -> Result<Html<String>> {
    Ok(Html(
        site::get_index(time.0)
            .await?
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
    ))
}

#[get("/_before/inject.css")]
fn inject_css() -> Css<&'static [u8]> {
    Css(include_bytes!("style.css"))
}

#[get("/_before/reset?<redirect>")]
fn reset(cookies: &CookieJar<'_>, redirect: Option<String>) -> Redirect {
    cookies.iter().for_each(|c| {
        let mut c = c.clone();
        c.make_removal();
        cookies.add(c);
    });
    Redirect(redirect)
}

#[get("/auth/logout")]
fn logout() -> Redir {
    // ... because you're logging out of Before
    Redir::to("https://www.blaseball.com/")
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
    Ok(Either::Left(index(time).await?))
}

#[launch]
async fn rocket() -> _ {
    tokio::spawn(site::update_cache(Utc::now()));
    rocket::build()
        .mount("/", database::entity_routes())
        .mount(
            "/",
            routes![
                api::buy_slot,
                api::buy_snack_no_upgrade,
                api::get_active_bets,
                api::get_user,
                api::get_user_rewards,
                api::sell_slot,
                api::update_settings,
                database::player_names_ids,
                events::stream_data,
                time::jump,
                time::relative,
                site::site_static,
                index,
                inject_css,
                reset,
                logout,
            ],
        )
        .register("/", catchers![index_default])
}
