#![deny(rust_2018_idioms)]
#![allow(clippy::too_many_arguments)]

mod api;
mod chronicler;
mod config;
mod database;
mod events;
mod media;
mod postseason;
mod proxy;
mod redirect;
mod site;
mod start;
mod time;

pub use crate::config::Config;

use chrono::{Duration, DurationRound, Utc};
use rand::seq::SliceRandom;
use rand::thread_rng;
use rocket::fairing::AdHoc;
use rocket::figment::Figment;
use rocket::http::{Cookie, CookieJar, SameSite};
use rocket::response::Redirect;
use rocket::tokio::{self, time::Instant};
use rocket::{catchers, get, routes, uri, Build, Orbit, Rocket};
use std::borrow::Cow;
use std::time::Duration as StdDuration;

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
    let config = rocket.state::<Config>().unwrap().private_clone();

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
                api::buy_snack,
                api::eat_a_dang_peanut,
                api::buy_a_dang_peanut,
                api::buy_a_dang_squirrel,
                api::clear_user_notifications,
                api::get_active_bets,
                api::get_user,
                api::get_user_notifications,
                api::get_user_rewards,
                api::update_favourite_team,
                api::update_settings,
                api::deal_cards,
                api::reorder_cards,
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
