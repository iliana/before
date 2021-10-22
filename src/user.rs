use crate::cookies::CookieJarExt;
use crate::favorite_team::FavoriteTeam;
use crate::idol::Idol;
use crate::offset::OffsetTime;
use crate::settings::{DisableMotion, LightMode};
use crate::snacks::{Snack, SnackPack};
use crate::squirrels::Squirrels;
use crate::tarot::Spread;
use crate::time::{datetime, DateTime};
use rocket::get;
use rocket::http::CookieJar;
use serde::Serialize;
use serde_json::{json, Value};

const SIM_NO_COIN: DateTime = datetime!(2021-07-30 03:00:15.845649 UTC);

#[get("/api/getUser")]
pub(crate) fn get_user(cookies: &CookieJar<'_>, time: OffsetTime) -> Value {
    #[derive(Serialize)]
    struct Relics {
        #[serde(rename = "Idol_Hits", skip_serializing_if = "Option::is_none")]
        hits: Option<i64>,
        #[serde(rename = "Idol_Strikeouts", skip_serializing_if = "Option::is_none")]
        strikeouts: Option<i64>,
        #[serde(rename = "Idol_Homers", skip_serializing_if = "Option::is_none")]
        homers: Option<i64>,
        #[serde(rename = "Idol_Shutouts", skip_serializing_if = "Option::is_none")]
        shutouts: Option<i64>,
    }

    lazy_static::lazy_static! {
        /// Infinity is not representable in JSON, but JavaScript will treat double-precision
        /// floating point overflows as infinity. `1e1000` is sufficient to do this, but requires
        /// the `arbitrary_precision` feature of serde_json.
        ///
        /// ```text
        /// $ node
        /// Welcome to Node.js v14.18.0.
        /// Type ".help" for more information.
        /// > JSON.parse("1e1000")
        /// Infinity
        /// ```
        static ref INFINITY: Value = serde_json::from_str::<Value>("1e1000").unwrap();

        /// Allocates due to `arbitrary_precision`, so let's only do this once.
        static ref ZERO: Value = Value::from(0);
    }

    let coins = if time.0 >= SIM_NO_COIN {
        &*ZERO
    } else {
        &*INFINITY
    };

    let snacks = cookies.load::<SnackPack>().unwrap_or_default();

    json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        // disable ability to change email on frontend
        "appleId": "what's umpdog",
        "verified": true,

        "motion": cookies.load::<DisableMotion>().unwrap_or_default(),
        "lightMode": cookies.load::<LightMode>().unwrap_or_default(),

        "idol": cookies.load::<Idol>(),
        "favoriteTeam": cookies.load::<FavoriteTeam>(),

        "unlockedShop": true,
        "unlockedElection": true,

        "squirrels": cookies.load::<Squirrels>().unwrap_or_default(),

        "coins": coins,
        "votes": snacks.get(Snack::Votes).unwrap_or_default(),
        "peanuts": snacks.get(Snack::Peanuts).unwrap_or_default(),
        "spread": cookies.load::<Spread>().unwrap_or_else(Spread::generate),
        "relics": Relics {
            hits: snacks.get(Snack::IdolHits),
            strikeouts: snacks.get(Snack::IdolStrikeouts),
            homers: snacks.get(Snack::IdolHomers),
            shutouts: snacks.get(Snack::IdolShutouts),
        },

        "snacks": snacks.amounts(),
        "snackOrder": snacks.order(),
        "packSize": snacks.len(),

        // set all these to reasonably high values to avoid rendering the "what to do next" actions
        // in the bulletin
        "trackers": {
            "BEGS": 3,
            "BETS": 10,
            "VOTES_CAST": 1,
            "SNACKS_BOUGHT": 2,
            "SNACK_UPGRADES": 3,
        },
    })
}
