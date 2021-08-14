use crate::{Config, Result};
use either::{Either, Left, Right};
use rocket::http::ContentType;
use rocket::{fs::NamedFile, get, State};
use std::convert::TryFrom;
use std::io::Read;
use std::path::{Path, PathBuf};
use std::sync::Arc;

type Static = Option<(ContentType, Either<Vec<u8>, NamedFile>)>;

async fn fetch_static(config: &State<Config>, path: PathBuf) -> anyhow::Result<Static> {
    let ct = path
        .extension()
        .and_then(|ext| ContentType::from_extension(&ext.to_string_lossy()))
        .unwrap_or(ContentType::Binary);
    if let Some(mut zip) = config.static_zip.as_ref().cloned() {
        if let Some(mut file) = Path::new("static")
            .join(&path)
            .to_str()
            .and_then(|f| zip.by_name(f).ok())
        {
            let mut v = Vec::with_capacity(usize::try_from(file.size())?);
            file.read_to_end(&mut v)?;
            return Ok(Some((ct, Left(v))));
        }
    }
    Ok(NamedFile::open(config.static_dir.join(path))
        .await
        .ok()
        .map(|file| (ct, Right(file))))
}

#[get("/static/media/<path..>", rank = 0)]
pub(crate) async fn static_media(config: &State<Config>, path: PathBuf) -> Result<Static> {
    Ok(fetch_static(config, Path::new("media").join(path)).await?)
}

#[get("/_before/<path..>", rank = 10)]
pub(crate) async fn static_root(config: &State<Config>, path: PathBuf) -> Result<Static> {
    Ok(fetch_static(config, path).await?)
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
