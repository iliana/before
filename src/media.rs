use crate::{Config, Result};
use anyhow::{anyhow, ensure};
use http_range::{HttpRange, HttpRangeParseError};
use rocket::http::hyper::header::{CONTENT_RANGE, RANGE};
use rocket::http::{ContentType, Header, Status};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::tokio::fs::File;
use rocket::tokio::io::{AsyncReadExt, AsyncSeekExt};
use rocket::{get, Responder, State};
use std::ffi::OsStr;
use std::io::{Read, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::Arc;

#[derive(Debug)]
pub(crate) struct Range<'r>(&'r str);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Range<'r> {
    type Error = HttpRangeParseError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Range<'r>, Self::Error> {
        match req.headers().get_one(RANGE.as_str()) {
            Some(r) => Outcome::Success(Range(r)),
            None => Outcome::Failure((Status::BadRequest, HttpRangeParseError::InvalidRange)),
        }
    }
}

#[derive(Debug, Responder)]
pub(crate) enum Static {
    Data(Vec<u8>, ContentType),
    #[response(status = 206)]
    Range(Vec<u8>, ContentType, Header<'static>),
    #[response(status = 404)]
    NotFound(()),
}

async fn fetch_static(
    config: &State<Config>,
    path: PathBuf,
    range: Option<Range<'_>>,
) -> anyhow::Result<Static> {
    let ct = path
        .extension()
        .and_then(|ext| ContentType::from_extension(&ext.to_string_lossy()))
        .unwrap_or(ContentType::Binary);

    if let Some(mut zip) = config.static_zip.as_ref().cloned() {
        if let Some(mut file) = path
            .iter()
            .map(OsStr::to_str)
            .collect::<Option<Vec<_>>>()
            .map(|segments| format!("static/{}", segments.join("/")))
            .and_then(|f| zip.by_name(&f).ok())
        {
            let mut v = Vec::with_capacity(usize::try_from(file.size())?);
            file.read_to_end(&mut v)?;
            return Ok(Static::Data(v, ct));
        }
    }

    if let Ok(mut file) = File::open(config.static_dir.join(path)).await {
        let len = file.metadata().await?.len();
        Ok(if let Some(Range(s)) = range {
            let mut ranges = HttpRange::parse(s, len).map_err(|e| anyhow!("{:?}", e))?;
            ensure!(ranges.len() == 1, "too many ranges");
            let range = ranges.pop().unwrap();
            let mut v = vec![0; usize::try_from(range.length)?];
            file.seek(SeekFrom::Start(range.start)).await?;
            file.read_exact(&mut v).await?;
            Static::Range(
                v,
                ct,
                Header {
                    name: CONTENT_RANGE.as_str().into(),
                    value: format!(
                        "bytes {}-{}/{}",
                        range.start,
                        range.length - range.start - 1,
                        len
                    )
                    .into(),
                },
            )
        } else {
            let mut v = Vec::with_capacity(usize::try_from(len)?);
            file.read_to_end(&mut v).await?;
            Static::Data(v, ct)
        })
    } else {
        Ok(Static::NotFound(()))
    }
}

#[get("/static/media/<path..>", rank = 0)]
pub(crate) async fn static_media(
    config: &State<Config>,
    path: PathBuf,
    range: Option<Range<'_>>,
) -> Result<Static> {
    Ok(fetch_static(config, Path::new("media").join(path), range).await?)
}

#[get("/_before/<path..>", rank = 10)]
pub(crate) async fn static_root(
    config: &State<Config>,
    path: PathBuf,
    range: Option<Range<'_>>,
) -> Result<Static> {
    Ok(fetch_static(config, path, range).await?)
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Clone)]
pub(crate) struct ArcVec(Arc<Vec<u8>>);

impl From<Vec<u8>> for ArcVec {
    fn from(v: Vec<u8>) -> Self {
        ArcVec(Arc::new(v))
    }
}

impl AsRef<[u8]> for ArcVec {
    fn as_ref(&self) -> &[u8] {
        self.0.as_slice()
    }
}
