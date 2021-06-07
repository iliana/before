#![deny(rust_2018_idioms)]

macro_rules! io_err {
    ($err:expr) => {
        std::io::Error::new(std::io::ErrorKind::Other, $err)
    };
}

mod chronicler;
mod proxy;
mod site;
mod time;

use crate::proxy::Proxy;
use crate::time::OffsetTime;
use anyhow::anyhow;
use chrono::Utc;
use either::Either;
use rocket::response::status::NotFound;
use rocket::{catch, catchers, get, launch, routes, Request};
use std::path::PathBuf;

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

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

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
async fn index(req: &Request<'_>) -> Result<Either<Proxy, NotFound<()>>> {
    let time = Utc::now() - crate::time::get_offset(req);
    // Normally we'd want to return a `Result<Option<_>>` here, but the Responder implementation
    // for Option "fails" with the NotFound Responder. Any failing Responder on a _catcher_ results
    // in a 500. This shouldn't ever happen, but use `Either` to work around this.
    //
    // TODO replace cloudfront URLs with chronicler-backed proxies, just in case they start
    // deleting old files out of S3.
    Ok(match site::get("/", time).await? {
        Some(response) => Either::Left(Proxy(response)),
        None => Either::Right(NotFound(())),
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![site_static])
        .register("/", catchers![index])
}
