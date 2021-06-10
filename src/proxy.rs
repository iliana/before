use rocket::futures::TryStreamExt;
use rocket::http::hyper::header::{CACHE_CONTROL, CONTENT_LENGTH, CONTENT_TYPE};
use rocket::http::{ContentType, Header, Status};
use rocket::request::Request;
use rocket::response::{Responder, Response, Result};
use std::str::FromStr;
use tokio_util::compat::FuturesAsyncReadCompatExt;

#[derive(Debug)]
pub struct Proxy {
    pub response: reqwest::Response,
    pub cache: bool,
}

impl<'r> Responder<'r, 'static> for Proxy {
    fn respond_to(self, _: &'r Request<'_>) -> Result<'static> {
        let mut builder = Response::build();
        builder
            .status(Status::new(self.response.status().as_u16()))
            .header(
                self.response
                    .headers()
                    .get(CONTENT_TYPE)
                    .and_then(|s| s.to_str().ok())
                    .and_then(|s| ContentType::from_str(s).ok())
                    .unwrap_or(ContentType::Binary),
            );
        if let Some(len) = self
            .response
            .headers()
            .get(CONTENT_LENGTH)
            .and_then(|s| s.to_str().ok())
        {
            builder.header(Header::new(CONTENT_LENGTH.as_str(), len.to_owned()));
        }
        if self.cache {
            builder.header(Header::new(CACHE_CONTROL.as_str(), "public, max-age=86400"));
        }
        builder
            .streamed_body(
                self.response
                    .bytes_stream()
                    .map_err(|err| std::io::Error::new(std::io::ErrorKind::Other, err))
                    .into_async_read()
                    .compat(),
            )
            .ok()
    }
}
