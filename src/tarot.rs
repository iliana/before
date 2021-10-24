use crate::api::ApiResult;
use crate::cookies::{AsCookie, CookieJarExt};
use crate::offset::OffsetTime;
use crate::snacks::{Snack, SnackPack};
use crate::time::{datetime, DateTime};
use itertools::Itertools;
use rand::prelude::*;
use rocket::http::{CookieJar, Status};
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::fmt::{self, Display};
use std::ops::Range;
use std::str::FromStr;

struct TarotSeason {
    range: Range<DateTime>,
    champ_card: i8,
}

fn get_season(time: DateTime) -> &'static TarotSeason {
    &SEASONS[std::cmp::min(
        match SEASONS.binary_search_by_key(&time, |season| season.range.start) {
            Ok(pos) => pos,
            Err(pos) => std::cmp::max(pos, 1) - 1,
        },
        SEASONS.len() - 1,
    )]
}

const SEASONS: &[TarotSeason] = &[
    TarotSeason {
        range: crate::EXPANSION..datetime!(2021-03-02 18:36:01 UTC),
        champ_card: 11,
    },
    TarotSeason {
        range: datetime!(2021-03-07 19:00:00 UTC)..datetime!(2021-03-09 18:42:55 UTC),
        champ_card: 14,
    },
    TarotSeason {
        range: datetime!(2021-03-14 19:00:00 UTC)..datetime!(2021-03-16 17:35:25 UTC),
        champ_card: -1,
    },
    TarotSeason {
        range: datetime!(2021-03-21 18:00:00 UTC)..datetime!(2021-04-06 17:39:12 UTC),
        champ_card: 4,
    },
    TarotSeason {
        range: datetime!(2021-04-11 18:15:00 UTC)..datetime!(2021-04-13 18:44:03 UTC),
        champ_card: 4,
    },
    TarotSeason {
        range: datetime!(2021-04-18 18:00:00 UTC)..datetime!(2021-04-20 17:32:53 UTC),
        champ_card: 3,
    },
    TarotSeason {
        range: datetime!(2021-04-11 18:15:00 UTC)..datetime!(2021-05-11 18:35:15 UTC),
        champ_card: 6,
    },
];

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct Spread {
    valid: Range<DateTime>,
    cards: [i8; 3],
}

impl Spread {
    fn generate(time: DateTime) -> Spread {
        let season = get_season(time);
        let mut cards = [season.champ_card, 0, 0];
        let mut rng = rand::thread_rng();
        for i in 1..3 {
            loop {
                let x = rng.gen_range(0..20);
                if !cards[0..i].contains(&x) {
                    cards[i] = x;
                    break;
                }
            }
        }
        cards.shuffle(&mut rng);
        Spread {
            valid: season.range.clone(),
            cards,
        }
    }

    fn card_names(&self) -> String {
        self.cards
            .iter()
            .map(|n| match *n + 1 {
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Default, Deserialize, Serialize)]
#[serde(transparent)]
pub(crate) struct SpreadCookie(Option<Spread>);

impl SpreadCookie {
    pub(crate) fn cards(&self) -> &[i8] {
        match &self.0 {
            Some(spread) => &spread.cards,
            None => &[],
        }
    }
}

impl Display for SpreadCookie {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            serde_json::to_string(self).map_err(|_| fmt::Error)?
        )
    }
}

impl FromStr for SpreadCookie {
    type Err = serde_json::Error;

    fn from_str(s: &str) -> serde_json::Result<SpreadCookie> {
        serde_json::from_str(s)
    }
}

impl AsCookie for SpreadCookie {
    const NAME: &'static str = "tarot_spread";

    fn modify_on_load(&mut self, time: DateTime) {
        if let Some(spread) = self.0.take() {
            if spread.valid.contains(&time) {
                self.0 = Some(spread);
            }
        }
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Deserialize)]
pub(crate) struct CardOrderUpdate {
    spread: [i8; 3],
}

#[post("/api/dealCards")]
pub(crate) fn deal_cards(cookies: &CookieJar<'_>, time: OffsetTime) -> (Status, Value) {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if snacks.set(Snack::TarotReroll, 1).is_none() {
        return ApiResult::Err("Snack pack full").into();
    }
    cookies.store(&snacks);
    let spread = Spread::generate(time.0);
    let cards = spread.cards;
    let message = format!("READING: {}", spread.card_names());
    cookies.store(&SpreadCookie(Some(spread)));
    (Status::Ok, json!({"spread": cards, "message": message}))
}

#[post("/api/reorderCards", data = "<order_update>")]
pub(crate) fn reorder_cards(
    cookies: &CookieJar<'_>,
    order_update: Json<CardOrderUpdate>,
) -> ApiResult<&'static str> {
    if let SpreadCookie(Some(mut spread)) = cookies.load::<SpreadCookie>().unwrap_or_default() {
        spread.cards = order_update.into_inner().spread;
        cookies.store(&SpreadCookie(Some(spread)));
        ApiResult::Ok("New Spread preserved")
    } else {
        ApiResult::Err("Invalid request")
    }
}
