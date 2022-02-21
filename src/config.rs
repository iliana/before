use crate::media::ArcVec;
use crate::stream::StreamCacheValue;
use crate::time::DateTime;
use lru::LruCache;
use rocket::fs::relative;
use serde::Deserialize;
use std::borrow::Cow;
use std::io::Cursor;
use std::path::{Path, PathBuf};
use tokio::{fs, sync::Mutex};
use zip::read::ZipArchive;

#[allow(clippy::struct_excessive_bools)] // ceci n'est pas une state machine
#[derive(Debug, Deserialize)]
#[serde(default)]
pub struct Config {
    pub siesta_mode: bool,
    pub chronplete: bool,
    pub http_client_gzip: bool,
    pub chronicler_base_url: String,
    pub upnuts_base_url: String,
    pub content_security_policy: String,
    pub static_dir: Cow<'static, Path>,
    pub static_zip_path: Option<PathBuf>,
    pub site_cache: bool,
    // Controls the size of an LRU cache storing stream data. Expect each entry to be about
    // 5 MB in size.
    pub stream_cache_size: Option<usize>,
    pub matomo_base_url: Option<String>,
    pub matomo_site_id: Option<i64>,

    #[serde(flatten)]
    rocket_config: rocket::Config,

    #[serde(skip)]
    pub(crate) client: reqwest::Client,
    #[serde(skip)]
    pub(crate) static_zip: Option<ZipArchive<Cursor<ArcVec>>>,
    #[serde(skip)]
    pub(crate) css_path: Option<String>,
    #[serde(skip)]
    pub(crate) stream_cache: Option<Mutex<LruCache<DateTime, StreamCacheValue>>>,
}

impl Config {
    pub(crate) async fn finalize(&mut self) -> anyhow::Result<()> {
        let mut builder = reqwest::Client::builder();
        builder =
            builder.user_agent("Before/1.0 (https://github.com/iliana/before; iliana@sibr.dev)");
        #[cfg(feature = "gzip")]
        {
            builder = builder.gzip(self.http_client_gzip);
        }
        self.client = builder.build()?;

        let addr = format!(
            "{}://{}:{}",
            if self.rocket_config.tls_enabled() {
                "https"
            } else {
                "http"
            },
            self.rocket_config.address,
            self.rocket_config.port,
        );
        self.chronicler_base_url = self.chronicler_base_url.replace("{addr}", &addr);
        self.upnuts_base_url = self.upnuts_base_url.replace("{addr}", &addr);

        self.content_security_policy = self.content_security_policy.replace(
            "{matomo_base_url}",
            self.matomo_base_url.as_deref().unwrap_or_default(),
        );

        if let Some(filename) = &self.static_zip_path {
            self.static_zip = Some(ZipArchive::new(Cursor::new(ArcVec::from(
                fs::read(filename).await?,
            )))?);
            if let Some(path) = self.static_zip.as_ref().and_then(|zip| {
                zip.file_names()
                    .find(|s| s.starts_with("_next/static/css") && s.ends_with(".css"))
                    .map(String::from)
            }) {
                self.css_path = Some(format!("/_before/{}", path));
            }
        } else if let Some(entry) = tokio::fs::read_dir(self.static_dir.join("_next/static/css"))
            .await?
            .next_entry()
            .await?
        {
            if let Ok(path) = entry.file_name().into_string() {
                self.css_path = Some(format!("/_before/_next/static/css/{}", path));
            }
        }

        if let Some(stream_cache_size) = self.stream_cache_size {
            self.stream_cache = Some(Mutex::new(LruCache::new(stream_cache_size)));
        }

        Ok(())
    }
}

impl Default for Config {
    fn default() -> Config {
        Config {
            siesta_mode: true,
            chronplete: false,
            http_client_gzip: cfg!(feature = "gzip"),
            chronicler_base_url: "https://api.sibr.dev/chronicler/".into(),
            upnuts_base_url: "https://api.sibr.dev/upnuts/".into(),
            content_security_policy: "upgrade-insecure-requests; default-src 'self'; script-src 'self' https://platform.twitter.com 'unsafe-inline' 'nonce-{nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' {matomo_base_url} https://d35iw2jmbg6ut8.cloudfront.net data:; connect-src 'self' {matomo_base_url}; object-src 'none'; frame-src https://platform.twitter.com https://www.youtube.com 'self'; base-uri 'none';".into(),
            static_dir: Path::new(option_env!("STATIC_DIR").unwrap_or(relative!("out"))).into(),
            static_zip_path: None,
            site_cache: true,
            stream_cache_size: None,
            matomo_base_url: None,
            matomo_site_id: None,

            rocket_config: rocket::Config::default(),
            client: reqwest::Client::default(),
            static_zip: None,
            css_path: None,
            stream_cache: None,
        }
    }
}
