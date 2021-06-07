use rocket::futures::TryStreamExt;
use rocket::http::{ContentType, Status};
use rocket::request::Request;
use rocket::response::{Responder, Response, Result};
use std::str::FromStr;
use tokio_util::compat::FuturesAsyncReadCompatExt;

#[derive(Debug)]
pub struct Proxy(pub reqwest::Response);

impl<'r> Responder<'r, 'static> for Proxy {
    fn respond_to(self, _: &'r Request<'_>) -> Result<'static> {
        Response::build()
            .status(Status::new(self.0.status().as_u16()))
            .header(
                self.0
                    .headers()
                    .get(reqwest::header::CONTENT_TYPE)
                    .and_then(|s| s.to_str().ok())
                    .and_then(|s| ContentType::from_str(s).ok())
                    .unwrap_or(ContentType::Binary),
            )
            .streamed_body(
                self.0
                    .bytes_stream()
                    .map_err(|err| io_err!(err))
                    .into_async_read()
                    .compat(),
            )
            .ok()
    }
}
