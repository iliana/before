#![deny(rust_2018_idioms)]

macro_rules! io_err {
    ($err:expr) => {
        std::io::Error::new(std::io::ErrorKind::Other, $err)
    };
}

mod chronicler;
mod events;
mod proxy;
mod site;
mod time;

use crate::proxy::Proxy;
use crate::time::OffsetTime;
use anyhow::anyhow;
use either::Either;
use rocket::request::FromRequest;
use rocket::response::content::Json;
use rocket::response::status::{NoContent, NotFound};
use rocket::{catch, catchers, get, launch, routes, Request};
use serde_json::json;
use std::path::PathBuf;

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

#[get("/api/getUser")]
fn get_user() -> Json<serde_json::Value> {
    Json(json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        "verified": true,
        "snacks": [],
        "snackOrder": [],
    }))
}

#[get("/api/getUserRewards")]
fn get_user_rewards() -> NoContent {
    NoContent
}

#[get("/static/<path..>")]
async fn site_static(path: PathBuf, time: OffsetTime) -> Result<Option<Proxy>> {
    let path = path
        .into_os_string()
        .into_string()
        .map_err(|err| anyhow!("OsString to String conversion failed: {:?}", err))?;
    Ok(site::get(&format!("/static/{}", path), time.0)
        .await?
        .map(Proxy))
}

#[get("/")]
async fn index(time: OffsetTime) -> Result<Option<Proxy>> {
    // TODO replace cloudfront URLs with chronicler-backed proxies, just in case they start
    // deleting old files out of S3.
    Ok(site::get("/", time.0).await?.map(Proxy))
}

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
async fn index_default(req: &Request<'_>) -> Result<Either<Proxy, NotFound<()>>> {
    let path = req.uri().path();
    if path.starts_with("/api") || path.starts_with("/database") || path.starts_with("/events") {
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
        .mount(
            "/",
            routes![
                events::stream_data,
                get_user,
                get_user_rewards,
                site_static,
                index
            ],
        )
        .register("/", catchers![index_default])
}
