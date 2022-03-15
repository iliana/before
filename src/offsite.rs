use crate::media::{self, Range, Static};
use crate::{offset::OffsetTime, time::DateTime, Config};
use anyhow::{bail, Context, Result};
use rocket::futures::stream::Stream;
use rocket::futures::{future::ready, StreamExt};
use rocket::response::stream::stream;
use rocket::{get, request::FromParam, State};
use std::collections::BTreeSet;
use std::ffi::OsString;
use std::path::{Path, PathBuf};
use std::str::FromStr;

#[derive(Debug, Clone, Copy)]
pub(crate) enum Site {
    Blaseball0,
    Blaseball2,
    Glitter,
}

impl Site {
    fn as_str(self) -> &'static str {
        match self {
            Site::Blaseball0 => "www.blaseball0.com",
            Site::Blaseball2 => "www.blaseball2.com",
            Site::Glitter => "glitter.sibr.dev",
        }
    }
}

impl<'a> FromParam<'a> for Site {
    type Error = anyhow::Error;

    fn from_param(param: &'a str) -> Result<Site> {
        match param {
            "www.blaseball0.com" => Ok(Site::Blaseball0),
            "www.blaseball2.com" => Ok(Site::Blaseball2),
            "glitter.sibr.dev" => Ok(Site::Glitter),
            _ => bail!("{:?} didn't match any sites", param),
        }
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
        Site::Blaseball0 | Site::Blaseball2 => {
            if path.file_name().is_none() {
                path = path.with_file_name("index.html");
            }

            let time = time.context("time required for this site")?;
            let entries = read_dir_static(config, domain)
                .filter_map(|s| ready(s.to_str().and_then(|s| DateTime::from_str(s).ok())))
                .collect::<BTreeSet<_>>()
                .await;
            if let Some(entry) = entries.range(..time.0).rev().next() {
                media::static_root(
                    config,
                    Path::new("offsite")
                        .join(domain.as_str())
                        .join(entry.to_string())
                        .join(path),
                    range,
                )
                .await
            } else if let Some(first) = entries.iter().next() {
                Ok(Some(Static::Future(
                    media::fetch_static_str(config, "fragment/future.html")
                        .await?
                        .replace("@@BEFORE_TIME@@", &first.to_string()),
                )))
            } else {
                Ok(None)
            }
        }
        Site::Glitter => {
            if path.file_name().is_none() {
                path = path.with_file_name("index.html");
            }

            media::static_root(
                config,
                Path::new("offsite").join(domain.as_str()).join(path),
                range,
            )
            .await
        }
    }
}

fn read_dir_static(config: &State<Config>, domain: Site) -> impl Stream<Item = OsString> + '_ {
    stream! {
        if let Some(zip) = config.static_zip.as_ref().cloned() {
            for file in zip.file_names() {
                if let Some(f) = file.strip_prefix(&format!("offsite/{}/", domain.as_str())) {
                    if !f.contains('/') {
                        yield f.into();
                    }
                }
            }
        }

        if let Ok(mut rd) = tokio::fs::read_dir(config.static_dir.join("offsite").join(domain.as_str())).await {
            while let Ok(Some(entry)) = rd.next_entry().await {
                yield entry.file_name();
            }
        }
    }
}
