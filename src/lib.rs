#![deny(rust_2018_idioms)]
#![allow(clippy::too_many_arguments)]

mod api;
mod chronicler;
mod database;
mod events;
mod proxy;
mod redirect;
mod site;
mod time;

use chrono::{Duration, DurationRound, Utc};
use rand::seq::SliceRandom;
use rand::thread_rng;
use rocket::figment::Figment;
use rocket::fs::{relative, FileServer};
use rocket::http::{Cookie, CookieJar, SameSite};
use rocket::response::Redirect;
use rocket::tokio::{self, time::Instant};
use rocket::{catchers, get, routes, uri, Build, Rocket};
use serde::Deserialize;
use std::borrow::Cow;
use std::path::Path;

lazy_static::lazy_static! {
    static ref CLIENT: reqwest::Client = reqwest::Client::builder()
        .user_agent("Before/1.0 (https://github.com/iliana/before; iliana@sibr.dev)")
        .build()
        .unwrap();

    static ref FIGMENT: Figment = rocket::Config::figment();
    static ref CONFIG: Config = FIGMENT.extract().unwrap();
}

#[derive(Debug, Deserialize)]
#[serde(default)]
struct Config {
    siesta_mode: bool,
    chronicler_base_url: String,
    upnuts_base_url: String,
}

impl Default for Config {
    fn default() -> Config {
        Config {
            siesta_mode: false,
            chronicler_base_url: "https://api.sibr.dev/chronicler/".to_string(),
            upnuts_base_url: "https://api.sibr.dev/upnuts/".to_string(),
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

fn static_dir() -> &'static Path {
    Path::new(option_env!("STATIC_DIR").unwrap_or(relative!("static")))
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

/// Builds a [`Rocket`] in the [`Build`] state for later launching.
///
/// This function must be called from the context of a Tokio runtime.
pub fn build() -> anyhow::Result<Rocket<Build>> {
    let rocket = rocket::custom(&*FIGMENT);

    log::warn!("config: {:?}", *CONFIG);

    tokio::spawn(async {
        if let Err(err) = site::update_cache(Utc::now()).await {
            log::error!("{:?}", err);
        }
    });
    tokio::spawn(async {
        if let Err(err) = crate::time::DAY_MAP.write().await.update().await {
            log::error!("{:?}", err);
        }
    });

    // Check for new games to add to the day map at 5 past the hour
    if !CONFIG.siesta_mode {
        let now = Utc::now();
        let offset =
            (now.duration_trunc(Duration::hours(1))? + Duration::minutes(65) - now).to_std()?;
        tokio::spawn(async move {
            let mut interval = tokio::time::interval_at(
                Instant::now() + offset,
                std::time::Duration::from_secs(3600),
            );
            loop {
                interval.tick().await;
                if let Err(err) = crate::time::DAY_MAP.write().await.update().await {
                    log::error!("{:?}", err);
                }
            }
        });
    }

    Ok(rocket
        .mount(
            "/static/media",
            FileServer::from(static_dir().join("media")).rank(0),
        )
        .mount("/_before", FileServer::from(static_dir()))
        .mount("/", api::mocked_error_routes())
        .mount("/", database::entity_routes())
        .mount(
            "/",
            routes![
                api::get_active_bets,
                api::get_user,
                api::get_user_notifications,
                api::clear_user_notifications,
                api::buy_flute,
                api::update_favourite_team,
                api::get_user_rewards,
                api::update_settings,
                database::feed,
                database::feedbyphase,
                database::game_by_id,
                database::items,
                database::offseason_recap,
                database::player_names_ids,
                database::renovations,
                events::stream_data,
                time::jump,
                time::relative,
                site::index,
                site::site_static,
                reset,
            ],
        )
        .register("/", catchers![site::index_default]))
}
