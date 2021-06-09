use rocket::http::hyper::header::REFERER;
use rocket::http::uri::Reference;
use rocket::request::Request;
use rocket::response::{Redirect, Responder, Result};
use rocket::uri;

#[derive(Debug)]
pub struct RedirectBack;

impl<'r> Responder<'r, 'static> for RedirectBack {
    fn respond_to(self, req: &'r Request<'_>) -> Result<'static> {
        if let Some(referer) = req
            .headers()
            .get_one(REFERER.as_str())
            .and_then(|s| Reference::parse(s).ok())
        {
            Redirect::to(referer.path().as_str().to_owned())
        } else {
            Redirect::to(uri!(crate::index))
        }
        .respond_to(req)
    }
}
