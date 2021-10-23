#![deny(rust_2018_idioms)]
#![warn(clippy::pedantic)]

mod api;
mod bet;
mod chronicler;
mod client;
mod config;
mod cookies;
mod database;
mod day_map;
mod election;
mod events;
mod favorite_team;
mod feed;
mod fetch;
mod idol;
mod jump;
mod media;
mod offset;
mod players;
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
mod user;

pub use crate::config::Config;

use crate::time::{datetime, DateTime, Duration};
use rocket::fairing::AdHoc;
use rocket::figment::Figment;
use rocket::http::CookieJar;
use rocket::response::Redirect;
use rocket::tokio::{self, time::Instant};
use rocket::{catchers, get, routes, uri, Build, Orbit, Rocket};
use std::time::Duration as StdDuration;

const EXPANSION: DateTime = datetime!(2021-03-01 04:10:00 UTC);

type Result<T> = std::result::Result<T, rocket::response::Debug<anyhow::Error>>;

#[get("/auth/logout")]
fn reset(cookies: &CookieJar<'_>) -> Redirect {
    cookies.iter().for_each(|c| {
        let mut c = c.clone();
        c.make_removal();
        cookies.add(c);
    });
    Redirect::to(uri!(crate::client::index))
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
///
/// # Errors
///
/// Returns an error if the configuration figment is invalid.
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
                bet::bet,
                bet::get_active_bets,
                client::index,
                database::game_by_id,
                database::get_previous_champ,
                database::items,
                database::renovations,
                election::bonus_results,
                election::decree_results,
                election::event_results,
                election::offseason_recap,
                events::stream_data,
                favorite_team::buy_flute,
                favorite_team::update_favorite_team,
                feed::feed,
                feed::feedbyphase,
                idol::choose_idol,
                jump::jump,
                jump::relative,
                media::static_media,
                media::static_root,
                players::player_names_ids,
                players::players,
                settings::update_settings,
                site::site_static,
                snacks::buy_a_dang_peanut,
                snacks::buy_relic,
                snacks::buy_slot,
                snacks::buy_snack,
                snacks::buy_snack_no_upgrade,
                snacks::buy_vote,
                snacks::eat_a_dang_peanut,
                snacks::reorder_snacks,
                snacks::sell_slot,
                snacks::sell_snack,
                socket_io::socket_io,
                socket_io::socket_io_post,
                squirrels::buy_a_dang_squirrel,
                start::credits,
                start::info,
                start::start,
                tarot::deal_cards,
                tarot::reorder_cards,
                user::clear_user_notifications,
                user::get_user,
                user::get_user_notifications,
                user::get_user_rewards,
                reset,
            ],
        )
        .register("/", catchers![client::index_default]))
}
