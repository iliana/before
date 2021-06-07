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
use chrono::Utc;
use either::Either;
use rocket::response::status::NotFound;
use rocket::{catch, catchers, launch, Request};

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

// Blaseball returns the index page for any unknown route, so that the React frontend can display
// the correct thing when the page loads.
#[catch(404)]
async fn index(req: &Request<'_>) -> Result<Either<Proxy, NotFound<()>>> {
    let time = Utc::now() - crate::time::get_offset(req);
    // Normally we'd want to return a `Result<Option<_>>` here, but the Responder implementation
    // for Option "fails" with the NotFound Responder. Any failing Responder on a _catcher_ results
    // in a 500. This shouldn't ever happen, but use `Either` to work around this.
    Ok(match site::get("/", time).await? {
        Some(response) => Either::Left(Proxy(response)),
        None => Either::Right(NotFound(())),
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build().register("/", catchers![index])
}
