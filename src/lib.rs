#![deny(rust_2018_idioms)]
#![allow(clippy::too_many_arguments)]

mod api;
mod chronicler;
mod config;
mod cookies;
mod database;
mod day_map;
mod events;
mod favorite_team;
mod idol;
mod jump;
mod media;
mod offset;
mod proxy;
mod redirect;
mod settings;
mod site;
mod snacks;
mod socket_io;
mod squirrels;
mod start;
mod stream;
mod tarot;
mod time;

pub use crate::config::Config;

use crate::time::{DateTime, Duration};
use rand::seq::SliceRandom;
use rand::thread_rng;
use rocket::fairing::AdHoc;
use rocket::figment::Figment;
use rocket::http::{Cookie, CookieJar, SameSite};
use rocket::response::Redirect;
use rocket::tokio::{self, time::Instant};
use rocket::{catchers, get, routes, uri, Build, Orbit, Rocket};
use std::borrow::Cow;
use std::convert::TryFrom;
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
            if let Err(err) = site::update_cache(&config, DateTime::now()).await {
                log::error!("{:?}", err);
            }
        };

        let update_day_map = async {
            if let Err(err) = crate::day_map::DAY_MAP.write().await.update(&config).await {
                log::error!("{:?}", err);
            }

            // Check for new games to add to the day map at 5 past the hour
            if !config.siesta_mode {
                let now = DateTime::now();
                if let Ok(nowish) = now.trunc(Duration::hours(1)) {
                    if let Ok(offset) = StdDuration::try_from(nowish + Duration::minutes(65) - now)
                    {
                        let mut interval = tokio::time::interval_at(
                            Instant::now() + offset,
                            StdDuration::from_secs(3600),
                        );
                        loop {
                            interval.tick().await;
                            if let Err(err) =
                                crate::day_map::DAY_MAP.write().await.update(&config).await
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
                crate::socket_io::remove_expired_sessions().await;
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
        .mount("/", database::entity_routes())
        .mount("/", events::extra_season_4_routes())
        .mount(
            "/",
            routes![
                api::buy_a_dang_peanut,
                api::clear_user_notifications,
                api::eat_a_dang_peanut,
                api::get_active_bets,
                api::get_user,
                api::get_user_notifications,
                api::get_user_rewards,
                database::bonus_results,
                database::decree_results,
                database::event_results,
                database::feed,
                database::feedbyphase,
                database::game_by_id,
                database::get_previous_champ,
                database::items,
                database::offseason_recap,
                database::player_names_ids,
                database::players,
                database::renovations,
                events::stream_data,
                favorite_team::buy_flute,
                favorite_team::update_favorite_team,
                idol::choose_idol,
                jump::jump,
                jump::relative,
                media::static_media,
                media::static_root,
                settings::update_settings,
                site::index,
                site::site_static,
                snacks::buy_snack,
                snacks::buy_snack_no_upgrade,
                snacks::buy_vote,
                snacks::sell_snack,
                socket_io::socket_io,
                socket_io::socket_io_post,
                squirrels::buy_a_dang_squirrel,
                start::credits,
                start::info,
                start::start,
                tarot::deal_cards,
                tarot::reorder_cards,
                reset,
            ],
        )
        .register("/", catchers![site::index_default]))
}
