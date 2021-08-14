#![deny(rust_2018_idioms)]
#![allow(clippy::too_many_arguments)]

mod api;
mod chronicler;
mod database;
mod events;
mod media;
mod postseason;
mod proxy;
mod redirect;
mod site;
mod start;
mod time;

use crate::media::ArcVec;
use chrono::{Duration, DurationRound, Utc};
use rand::seq::SliceRandom;
use rand::thread_rng;
use rocket::fairing::AdHoc;
use rocket::figment::Figment;
use rocket::fs::relative;
use rocket::http::{Cookie, CookieJar, SameSite};
use rocket::response::Redirect;
use rocket::tokio::{self, fs, time::Instant};
use rocket::{catchers, get, routes, uri, Build, Orbit, Rocket};
use serde::Deserialize;
use std::borrow::Cow;
use std::io::Cursor;
use std::path::{Path, PathBuf};
use std::time::Duration as StdDuration;
use zip::read::ZipArchive;

#[derive(Debug, Clone, Deserialize)]
#[serde(default)]
pub struct Config {
    pub siesta_mode: bool,
    pub chronplete: bool,
    pub http_client_gzip: bool,
    pub chronicler_base_url: String,
    pub upnuts_base_url: String,
    pub static_dir: Cow<'static, Path>,
    pub static_zip_path: Option<PathBuf>,
    pub extra_credits: Vec<String>,

    #[serde(flatten)]
    rocket_config: rocket::Config,

    #[serde(skip)]
    client: reqwest::Client,
    #[serde(skip)]
    static_zip: Option<ZipArchive<Cursor<ArcVec>>>,
}

impl Config {
    async fn finalize(&mut self) -> anyhow::Result<()> {
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

        Ok(())
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
            extra_credits: Vec::new(),
            rocket_config: rocket::Config::default(),
            client: reqwest::Client::default(),
            static_zip: None,
        }
    }
}

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

fn choose<'a>(x: &[&'a str]) -> &'a str {
    debug_assert!(!x.is_empty());
    x.choose(&mut thread_rng()).cloned().unwrap_or_default()
}

fn new_cookie<N, V>(name: N, value: V) -> Cookie<'static>
where
    N: Into<Cow<'static, str>>,
    V: Into<Cow<'static, str>>,
{
    let mut cookie = Cookie::new(name, value);
    cookie.set_same_site(SameSite::Lax);
    cookie
}

#[get("/auth/logout")]
fn reset(cookies: &CookieJar<'_>) -> Redirect {
    cookies.iter().for_each(|c| {
        let mut c = c.clone();
        c.make_removal();
        cookies.add(c);
    });
    Redirect::to(uri!(crate::site::index))
}

async fn background_tasks(rocket: &Rocket<Orbit>) {
    let config = rocket.state::<Config>().unwrap().clone();

    tokio::spawn(async move {
        let update_cache = async {
            if let Err(err) = site::update_cache(&config, Utc::now()).await {
                log::error!("{:?}", err);
            }
        };

        let update_day_map = async {
            if let Err(err) = crate::time::DAY_MAP.write().await.update(&config).await {
                log::error!("{:?}", err);
            }

            // Check for new games to add to the day map at 5 past the hour
            if !config.siesta_mode {
                let now = Utc::now();
                if let Ok(nowish) = now.duration_trunc(Duration::hours(1)) {
                    if let Ok(offset) = (nowish + Duration::minutes(65) - now).to_std() {
                        let mut interval = tokio::time::interval_at(
                            Instant::now() + offset,
                            StdDuration::from_secs(3600),
                        );
                        loop {
                            interval.tick().await;
                            if let Err(err) =
                                crate::time::DAY_MAP.write().await.update(&config).await
                            {
                                log::error!("{:?}", err);
                            }
                        }
                    }
                }
            }
        };

        let remove_expired_sessions_timer = async {
            let mut interval = tokio::time::interval(StdDuration::from_secs(15 * 60));
            loop {
                interval.tick().await;
                crate::events::remove_expired_sessions().await;
            }
        };

        tokio::join! {
            update_cache,
            update_day_map,
            remove_expired_sessions_timer,
        };
    });
}

/// Builds a [`Rocket`] in the [`Build`] state for later launching.
pub async fn build(figment: &Figment) -> anyhow::Result<Rocket<Build>> {
    let rocket = rocket::custom(figment);

    let mut config: Config = figment.extract()?;
    config.finalize().await?;

    Ok(rocket
        .manage(config)
        .attach(AdHoc::on_liftoff("Before background tasks", |r| {
            Box::pin(background_tasks(r))
        }))
        .mount("/", api::mocked_error_routes())
        .mount("/", database::entity_routes())
        .mount("/", events::extra_season_4_routes())
        .mount(
            "/",
            routes![
                api::buy_flute,
                api::clear_user_notifications,
                api::get_active_bets,
                api::get_user,
                api::get_user_notifications,
                api::get_user_rewards,
                api::update_favourite_team,
                api::update_settings,
                database::bonus_results,
                database::decree_results,
                database::event_results,
                database::feed,
                database::feedbyphase,
                database::game_by_id,
                database::items,
                database::offseason_recap,
                database::player_names_ids,
                database::players,
                database::renovations,
                database::get_previous_champ,
                events::socket_io,
                events::socket_io_post,
                events::stream_data,
                media::static_media,
                media::static_root,
                site::index,
                site::site_static,
                start::credits,
                start::info,
                start::start,
                time::jump,
                time::relative,
                reset,
            ],
        )
        .register("/", catchers![site::index_default]))
}
