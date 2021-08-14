use rocket::http::hyper::header::REFERER;
use rocket::http::uri::Reference;
use rocket::request::Request;
use rocket::response::{Redirect as Redir, Responder, Result};
use rocket::uri;

#[derive(Debug)]
pub(crate) struct Redirect(pub(crate) Option<String>);

impl<'r> Responder<'r, 'static> for Redirect {
    fn respond_to(self, req: &'r Request<'_>) -> Result<'static> {
        if let Some(to) = self.0.and_then(|s| Reference::parse_owned(s).ok()) {
            Redir::to(to)
        } else if let Some(referer) = req
            .headers()
            .get_one(REFERER.as_str())
            .and_then(|s| Reference::parse(s).ok())
        {
            let referer = referer.path().as_str();
            if referer.starts_with("/_before") {
                Redir::to(uri!(crate::site::index))
            } else {
                Redir::to(referer.to_owned())
            }
        } else {
            Redir::to(uri!(crate::site::index))
        }
        .respond_to(req)
    }
}
