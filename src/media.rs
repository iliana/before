use crate::{Config, Result};
use anyhow::{anyhow, ensure};
use askama::Template;
use http_range::{HttpRange, HttpRangeParseError};
use rocket::http::hyper::header::{CONTENT_RANGE, RANGE};
use rocket::http::{ContentType, Header, Status};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::response::content::Html;
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
}

pub(crate) async fn fetch_static(
    config: &State<Config>,
    path: &Path,
    range: Option<Range<'_>>,
) -> anyhow::Result<Option<Static>> {
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
            return Ok(Some(Static::Data(v, ct)));
        }
    }

    if let Ok(mut file) = File::open(config.static_dir.join(path)).await {
        let len = file.metadata().await?.len();
        Ok(Some(if let Some(Range(s)) = range {
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
        }))
    } else {
        Ok(None)
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/static/media/<path..>", rank = 0)]
pub(crate) async fn static_media(
    config: &State<Config>,
    path: PathBuf,
    range: Option<Range<'_>>,
) -> Result<Option<Static>> {
    Ok(fetch_static(config, &Path::new("media").join(path), range).await?)
}

#[get("/_before/<path..>", rank = 10)]
pub(crate) async fn static_root(
    config: &State<Config>,
    path: PathBuf,
    range: Option<Range<'_>>,
) -> Result<Option<Static>> {
    Ok(fetch_static(config, &path, range).await?)
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[macro_export]
macro_rules! load {
    ($path:expr, $config:expr) => {
        async {
            use crate::media::{fetch_static, Static};
            use anyhow::Context as _;
            use std::path::Path;
            use tokio::sync::OnceCell;

            static CELL: OnceCell<String> = OnceCell::const_new();

            CELL.get_or_try_init::<anyhow::Error, _, _>(|| async {
                match fetch_static($config, Path::new($path), None)
                    .await?
                    .context("not found")?
                {
                    Static::Data(v, _) => Ok(String::from_utf8(v)?),
                    Static::Range(_, _, _) => unreachable!(),
                }
            })
            .await
            .map(String::as_str)
        }
    };
}

pub use load;

pub(crate) async fn load_nav_meta(config: &State<Config>) -> anyhow::Result<&'static str> {
    load!("assets/nav-meta.html", config).await
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Template)]
#[template(path = "base.html")]
struct Base {
    nav: &'static str,
    content: &'static str,
}

macro_rules! fragment {
    (# [ $($tt:tt)* ] $name:ident => $path:expr) => {
        #[$($tt)*]
        pub(crate) async fn $name(config: &State<Config>) -> Result<Html<String>> {
            Ok(Html(
                Base {
                    nav: load_nav_meta(config).await?,
                    content: load!($path, config).await?,
                }
                .render()
                .map_err(anyhow::Error::from)?,
            ))
        }
    };
}

fragment! {
    #[get("/_before/credits", rank = 1)]
    credits => "fragments/credits.html"
}

fragment! {
    #[get("/_before/info", rank = 1)]
    info => "fragments/info.html"
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
