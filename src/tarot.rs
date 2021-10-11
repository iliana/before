use crate::cookies::{AsCookie, CookieJarExt};
use anyhow::{Context, Error, Result};
use itertools::Itertools;
use rand::Rng;
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::fmt::{self, Display};
use std::str::FromStr;

#[derive(Debug, Clone, Copy, Deserialize, Serialize)]
#[serde(transparent)]
pub(crate) struct Spread([i8; 3]);

impl Spread {
    pub(crate) fn generate() -> Spread {
        // FIXME: use the actual game logic of always including the previous champ
        let mut spread = [0; 3];
        let mut rng = rand::thread_rng();
        for i in 0..3 {
            loop {
                let x = rng.gen_range(-1..20);
                if !spread[0..i].contains(&x) {
                    spread[i] = x;
                    break;
                }
            }
        }
        Spread(spread)
    }
}

impl Display for Spread {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{},{},{}", self.0[0], self.0[1], self.0[2])
    }
}

impl FromStr for Spread {
    type Err = Error;

    fn from_str(s: &str) -> Result<Spread> {
        let (a, b, c) = s
            .split(',')
            .filter_map(|s| s.parse().ok())
            .collect_tuple()
            .context("failed to parse tarot_spread")?;
        Ok(Spread([a, b, c]))
    }
}

impl AsCookie for Spread {
    const NAME: &'static str = "tarot_spread";
}

#[derive(Deserialize)]
pub(crate) struct CardOrderUpdate {
    spread: Spread,
}

#[post("/api/dealCards")]
pub(crate) fn deal_cards(cookies: &CookieJar<'_>) -> Json<Value> {
    let spread = Spread::generate();
    cookies.store(&spread);
    Json(json!({"spread": spread, "message": "New Spread preserved"}))
}

#[post("/api/reorderCards", data = "<order_update>")]
pub(crate) fn reorder_cards(
    cookies: &CookieJar<'_>,
    order_update: Json<CardOrderUpdate>,
) -> Json<Value> {
    cookies.store(&order_update.spread);
    Json(json!({"message": "New Spread preserved"}))
}
