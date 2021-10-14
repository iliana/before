use crate::cookies::{AsCookie, CookieJarExt};
use crate::snacks::{Snack, SnackPack};
use anyhow::{Context, Error, Result};
use itertools::Itertools;
use rand::Rng;
use rocket::http::{CookieJar, Status};
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

    fn card_names(self) -> String {
        self.0
            .iter()
            .map(|n| match n + 1 {
                0 => " Fool",
                1 => "I The Magician",
                2 => "II The High Priestess",
                3 => "III The Empress",
                4 => "IIII The Emperor",
                5 => "V The Hierophant",
                6 => "VI The Lover",
                7 => "VII The Chariot",
                8 => "VIII Justice",
                9 => "VIIII The Hermit",
                10 => "X The Wheel of Fortune",
                11 => "XI Strength",
                12 => "XII The Hanged Man",
                13 => "XIII ",
                14 => "XIIII Temperance",
                15 => "XV The Devil",
                16 => "XVI The Tower",
                17 => "XVII The Star",
                18 => "XVIII The Moon",
                19 => "XVIIII The Sun",
                20 => "XX Judgment",
                _ => " ----",
            })
            .join(", ")
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
pub(crate) fn deal_cards(cookies: &CookieJar<'_>) -> (Status, Json<Value>) {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if snacks.get(Snack::TarotReroll).is_none() && snacks.adjust(Snack::TarotReroll, 1).is_none() {
        return (
            Status::BadRequest,
            Json(json!({
                "message": "Snack pack full",
                "error": "Snack pack full",
            })),
        );
    }
    cookies.store(&snacks);
    let spread = Spread::generate();
    cookies.store(&spread);
    (
        Status::Ok,
        Json(json!({"spread": spread, "message": format!("READING: {}", spread.card_names())})),
    )
}

#[post("/api/reorderCards", data = "<order_update>")]
pub(crate) fn reorder_cards(
    cookies: &CookieJar<'_>,
    order_update: Json<CardOrderUpdate>,
) -> Json<Value> {
    cookies.store(&order_update.spread);
    Json(json!({"message": "New Spread preserved"}))
}
