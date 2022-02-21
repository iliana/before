#![deny(rust_2018_idioms)]
#![warn(clippy::pedantic)]
#![allow(clippy::no_effect_underscore_binding)]

mod api;
mod bet;
mod chronicler;
mod client;
mod config;
mod cookies;
mod database;
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
mod stream;
mod tarot;
mod time;
mod user;

pub use crate::config::Config;

use crate::time::{datetime, DateTime};
use rocket::fairing::AdHoc;
use rocket::figment::Figment;
use rocket::http::CookieJar;
use rocket::response::Redirect;
use rocket::tokio;
use rocket::{catchers, get, routes, uri, Build, Rocket};
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

async fn background_tasks() {
    tokio::spawn(async {
        let mut interval = tokio::time::interval(StdDuration::from_secs(15 * 60));
        loop {
            interval.tick().await;
            crate::socket_io::remove_expired_sessions().await;
        }
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
        .attach(AdHoc::on_liftoff("Before background tasks", |_rocket| {
            Box::pin(background_tasks())
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
                snacks::buy_increase_daily_coins,
                snacks::buy_increase_max_bet,
                snacks::buy_relic,
                snacks::buy_slot,
                snacks::buy_snack,
                snacks::buy_snack_no_upgrade,
                snacks::buy_vote,
                snacks::eat_a_dang_peanut,
                snacks::increase_votes,
                snacks::reorder_snacks,
                snacks::sell_slot,
                snacks::sell_snack,
                snacks::vote,
                socket_io::socket_io,
                socket_io::socket_io_post,
                squirrels::buy_a_dang_squirrel,
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
