use rocket::futures::TryStreamExt;
use rocket::http::hyper::header::{CONTENT_LENGTH, CONTENT_TYPE, ETAG, IF_NONE_MATCH};
use rocket::http::{ContentType, Header, Status};
use rocket::request::Request;
use rocket::response::{Responder, Response, Result};
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use std::str::FromStr;
use tokio_util::compat::FuturesAsyncReadCompatExt;

#[derive(Debug)]
pub(crate) struct Proxy(pub(crate) reqwest::Response);

impl<'r> Responder<'r, 'static> for Proxy {
    fn respond_to(self, _request: &'r Request<'_>) -> Result<'static> {
        let mut builder = Response::build();
        builder.status(Status::new(self.0.status().as_u16()));
        if let Some(ct) = self
            .0
            .headers()
            .get(CONTENT_TYPE)
            .and_then(|s| s.to_str().ok())
            .and_then(|s| ContentType::from_str(s).ok())
        {
            builder.header(ct);
        }
        if let Some(len) = self
            .0
            .headers()
            .get(CONTENT_LENGTH)
            .and_then(|s| s.to_str().ok())
        {
            builder.header(Header::new(CONTENT_LENGTH.as_str(), len.to_owned()));
        }
        builder
            .streamed_body(
                self.0
                    .bytes_stream()
                    .map_err(|err| std::io::Error::new(std::io::ErrorKind::Other, err))
                    .into_async_read()
                    .compat(),
            )
            .ok()
    }
}

#[derive(Debug)]
pub(crate) struct ETag(u64);

impl ETag {
    pub(crate) fn new(data: impl Hash) -> ETag {
        let mut hasher = DefaultHasher::new();
        data.hash(&mut hasher);
        ETag(hasher.finish())
    }
}

impl From<ETag> for Header<'static> {
    fn from(etag: ETag) -> Header<'static> {
        Header::new(ETAG.as_str(), format!("\"{:x}\"", etag.0))
    }
}

pub(crate) fn check_if_none_match(request: &Request<'_>, response: &mut Response<'_>) {
    if let (Some(if_none_match), Some(etag)) = (
        request.headers().get_one(IF_NONE_MATCH.as_str()),
        response.headers().get_one(ETAG.as_str()),
    ) {
        if if_none_match == etag {
            response.remove_header(CONTENT_LENGTH.as_str());
            response.set_status(Status::NotModified);
            response.body_mut().take();
        }
    }
}
