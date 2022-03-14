use crate::{http::ETag, Config, Result};
use anyhow::{anyhow, ensure, Context};
use http_range::{HttpRange, HttpRangeParseError};
use rocket::futures::stream::Stream;
use rocket::http::hyper::header::{CONTENT_RANGE, RANGE};
use rocket::http::{ContentType, Header, Status};
use rocket::request::{FromRequest, Outcome, Request};
use rocket::response::stream::stream;
use rocket::{get, Responder, State};
use std::ffi::{OsStr, OsString};
use std::io::{Read, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use tokio::fs::File;
use tokio::io::{AsyncReadExt, AsyncSeekExt};

#[derive(Debug, Clone, Copy)]
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
    ZipData {
        content: Vec<u8>,
        ct: ContentType,
        etag: ETag,
    },
    File {
        file: File,
        ct: ContentType,
        etag: ETag,
    },
    #[response(status = 206)]
    Range {
        content: Vec<u8>,
        ct: ContentType,
        range: Header<'static>,
    },
}

async fn fetch_static(
    config: &State<Config>,
    path: &Path,
    range: Option<Range<'_>>,
) -> anyhow::Result<Option<Static>> {
    let ct = path
        .extension()
        .and_then(|ext| ContentType::from_extension(&ext.to_string_lossy()))
        .unwrap_or(ContentType::Binary);

    // range header handling is here for Voyager, which ships patched client bundles that redirect
    // youtube iframes to an endpoint served by blaseball.vcr that loads namerifeht's video sigil
    // from the disc. safari refuses to play any video without range headers being supported (even
    // if the video is small enough that it will just fetch the whole thing anyway).
    //
    // because we don't include that video in Voyager's static.zip, we don't bother handling range
    // headers in that part of the code.

    if let Some(mut zip) = config.static_zip.as_ref().cloned() {
        if let Some(mut file) = path
            .iter()
            .map(OsStr::to_str)
            .collect::<Option<Vec<_>>>()
            .map(|segments| segments.join("/"))
            .and_then(|f| zip.by_name(&f).ok())
        {
            let mut v = Vec::with_capacity(usize::try_from(file.size())?);
            file.read_to_end(&mut v)?;
            return Ok(Some(Static::ZipData {
                content: v,
                ct,
                etag: ETag::new((file.crc32(), file.size())),
            }));
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
            Static::Range {
                content: v,
                ct,
                range: Header::new(
                    CONTENT_RANGE.as_str(),
                    format!(
                        "bytes {}-{}/{}",
                        range.start,
                        range.length - range.start - 1,
                        len
                    ),
                ),
            }
        } else {
            let metadata = file.metadata().await?;
            Static::File {
                file,
                ct,
                etag: ETag::new((metadata.modified()?, metadata.len())),
            }
        }))
    } else {
        Ok(None)
    }
}

pub(crate) async fn fetch_static_str(config: &State<Config>, path: &str) -> anyhow::Result<String> {
    // we used to have code to cache this in a `OnceCell`, but that's unnecessary:
    // - when using a zip file, the data is already stored in-memory and is effectively never
    //   blocking on IO. zlib decompression is extremely fast.
    // - when reading from disk, OSes will cache recently-read files in memory anyway. if the OS is
    //   under memory pressure, it can drop those file caches. greedily holding onto it in our
    //   program's memory space isn't helpful. (caching it would save us a few syscalls and copying
    //   the full data into memory but it's probably not worth all the extra code.)

    Ok(
        match fetch_static(config, Path::new(path), None)
            .await?
            .context("file not found")?
        {
            Static::ZipData { content, .. } => String::from_utf8(content)?,
            Static::File { mut file, .. } => {
                let mut s = String::new();
                file.read_to_string(&mut s).await?;
                s
            }
            Static::Range { .. } => unreachable!("did not request range"),
        },
    )
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

pub(crate) fn read_dir_static<'a>(
    config: &'a State<Config>,
    path: &'a str,
) -> impl Stream<Item = OsString> + 'a {
    stream! {
        if let Some(zip) = config.static_zip.as_ref().cloned() {
            for file in zip.file_names() {
                if let Some(f) = file.strip_prefix(&format!("{}/", path)) {
                    if !f.contains('/') {
                        yield f.into();
                    }
                }
            }
        }

        if let Ok(mut rd) = tokio::fs::read_dir(config.static_dir.join(path)).await {
            while let Ok(Some(entry)) = rd.next_entry().await {
                yield entry.file_name();
            }
        }
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
    if path.extension().is_none() {
        if let Some(s) = fetch_static(config, &path.with_extension("html"), range).await? {
            return Ok(Some(s));
        }
    }
    Ok(fetch_static(config, &path, range).await?)
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
