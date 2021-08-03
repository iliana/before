use rocket::http::hyper::header::REFERER;
use rocket::http::uri::Reference;
use rocket::request::Request;
use rocket::response::{Redirect as Redir, Responder, Result};
use rocket::uri;

#[derive(Debug)]
pub struct Redirect(pub Option<String>);

impl<'r> Responder<'r, 'static> for Redirect {
    fn respond_to(self, req: &'r Request<'_>) -> Result<'static> {
        if let Some(to) = self.0.and_then(|s| Reference::parse_owned(s).ok()) {
            Redir::to(to)
        } else if let Some(referer) = req
            .headers()
            .get_one(REFERER.as_str())
            .and_then(|s| Reference::parse(s).ok())
        {
            Redir::to(referer.path().as_str().to_owned())
        } else {
            Redir::to(uri!(crate::site::index))
        }
        .respond_to(req)
    }
}
