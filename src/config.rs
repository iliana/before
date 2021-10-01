use crate::media::ArcVec;
use crate::stream::StreamCacheValue;
use crate::time::DateTime;
use lru::LruCache;
use rocket::fs::relative;
use rocket::tokio::fs;
use rocket::tokio::sync::Mutex;
use serde::Deserialize;
use std::borrow::Cow;
use std::io::Cursor;
use std::path::{Path, PathBuf};
use zip::read::ZipArchive;

#[derive(Debug, Deserialize)]
#[serde(default)]
pub struct Config {
    pub siesta_mode: bool,
    pub chronplete: bool,
    pub http_client_gzip: bool,
    pub chronicler_base_url: String,
    pub upnuts_base_url: String,
    pub static_dir: Cow<'static, Path>,
    pub static_zip_path: Option<PathBuf>,
    pub site_cache: bool,
    pub extra_credits: Vec<String>,
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

        if let Some(filename) = &self.static_zip_path {
            self.static_zip = Some(ZipArchive::new(Cursor::new(ArcVec::from(
                fs::read(filename).await?,
            )))?);
        }

        if let Some(stream_cache_size) = self.stream_cache_size {
            self.stream_cache = Some(Mutex::new(LruCache::new(stream_cache_size)));
        }

        Ok(())
    }

    /// Used in `crate::background_tasks`; does not clone `static_zip` or `stream_cache`
    pub(crate) fn private_clone(&self) -> Config {
        Config {
            siesta_mode: self.siesta_mode,
            chronplete: self.chronplete,
            http_client_gzip: self.http_client_gzip,
            chronicler_base_url: self.chronicler_base_url.clone(),
            upnuts_base_url: self.upnuts_base_url.clone(),
            static_dir: self.static_dir.clone(),
            static_zip_path: self.static_zip_path.clone(),
            site_cache: self.site_cache,
            extra_credits: self.extra_credits.clone(),
            stream_cache_size: self.stream_cache_size,
            matomo_base_url: self.matomo_base_url.clone(),
            matomo_site_id: self.matomo_site_id,

            rocket_config: self.rocket_config.clone(),
            client: self.client.clone(),
            static_zip: None,
            stream_cache: None,
        }
    }
}

impl Default for Config {
    fn default() -> Config {
        Config {
            siesta_mode: false,
            chronplete: false,
            http_client_gzip: cfg!(feature = "gzip"),
            chronicler_base_url: "https://api.sibr.dev/chronicler/".to_string(),
            upnuts_base_url: "https://api.sibr.dev/upnuts/".to_string(),
            static_dir: Path::new(option_env!("STATIC_DIR").unwrap_or(relative!("static"))).into(),
            static_zip_path: None,
            site_cache: true,
            extra_credits: Vec::new(),
            stream_cache_size: None,
            matomo_base_url: None,
            matomo_site_id: None,

            rocket_config: rocket::Config::default(),
            client: reqwest::Client::default(),
            static_zip: None,
            stream_cache: None,
        }
    }
}
