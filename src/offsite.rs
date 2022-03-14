use crate::media::{self, Range, Static};
use crate::{offset::OffsetTime, time::DateTime, Config};
use anyhow::{Context, Result};
use rocket::futures::{future::ready, StreamExt};
use rocket::{get, request::FromParam, State};
use serde::Deserialize;
use std::collections::BTreeSet;
use std::path::{Path, PathBuf};
use std::str::FromStr;

#[derive(Debug, Clone, Copy, Deserialize)]
pub(crate) enum Site {
    #[serde(rename = "www.blaseball2.com")]
    Blaseball2,
}

serde_plain::derive_fromstr_from_deserialize!(Site);

impl Site {
    fn as_str(self) -> &'static str {
        match self {
            Site::Blaseball2 => "www.blaseball2.com",
        }
    }
}

impl<'a> FromParam<'a> for Site {
    type Error = serde_plain::Error;

    fn from_param(param: &'a str) -> Result<Site, serde_plain::Error> {
        param.parse()
    }
}

#[get("/_before/<domain>/<path..>", rank = 9)]
pub(crate) async fn offsite(
    config: &State<Config>,
    domain: Site,
    mut path: PathBuf,
    time: Option<OffsetTime>,
    range: Option<Range<'_>>,
) -> crate::Result<Option<Static>> {
    match domain {
        Site::Blaseball2 => {
            if path.file_name().is_none() {
                path = path.with_file_name("index.html");
            }

            let time = time.context("time required for this site")?;
            let entries = media::read_dir_static(config, domain.as_str())
                .filter_map(|s| ready(s.to_str().and_then(|s| DateTime::from_str(s).ok())))
                .collect::<BTreeSet<_>>()
                .await;
            if let Some(entry) = entries.range(..time.0).rev().next() {
                media::static_root(
                    config,
                    Path::new(domain.as_str())
                        .join(entry.to_string())
                        .join(path),
                    range,
                )
                .await
            } else {
                Ok(None)
            }
        }
    }
}
