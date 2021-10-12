use crate::choose;
use crate::cookies::CookieJarExt;
use crate::favorite_team::FavoriteTeam;
use crate::idol::Idol;
use crate::settings::{DisableMotion, LightMode};
use crate::snacks::{Snack, SnackPack};
use crate::tarot::Spread;
use rocket::http::{CookieJar, Status};
use rocket::response::status::BadRequest;
use rocket::serde::json::Json;
use rocket::{get, post, routes, Route};
use serde::Deserialize;
use serde_json::{json, Value};

static ERROR_MESSAGES: &[&str] = &[
    "If you were meant to have that, you already would",
    "Monitor's on vacation, sorry",
    "You can't get ye flask!",
];

#[get("/api/getActiveBets")]
pub(crate) fn get_active_bets() -> Json<Vec<()>> {
    Json(vec![])
}

#[get("/api/getUser")]
pub(crate) fn get_user(cookies: &CookieJar<'_>) -> Json<Value> {
    let snacks = cookies.load::<SnackPack>().unwrap_or_default();

    Json(json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        // disable ability to change email on frontend
        "appleId": "what's umpdog",
        "verified": true,
        "motion": cookies.load::<DisableMotion>().unwrap_or_default(),
        "lightMode": cookies.load::<LightMode>().unwrap_or_default(),
        "coins": "Infinity",
        "peanuts": snacks.get(Snack::Peanuts).unwrap_or_default(),
        "squirrels": cookies.get_pending("squirrels").and_then(|t| t.value().parse::<i32>().ok()).unwrap_or(0),
        "idol": cookies.load::<Idol>(),
        "favoriteTeam": cookies.load::<FavoriteTeam>(),
        "unlockedShop": true,
        "unlockedElection": true,
        "spread": cookies.load::<Spread>().unwrap_or_else(Spread::generate),
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
        "relics": {
            "Idol_Strikeouts": snacks.get(Snack::IdolStrikeouts).unwrap_or_default(),
            "Idol_Shutouts": snacks.get(Snack::IdolShutouts).unwrap_or_default(),
            "Idol_Homers": snacks.get(Snack::IdolHomers).unwrap_or_default(),
            "Idol_Hits": snacks.get(Snack::IdolHits).unwrap_or_default(),
        },
    }))
}

#[get("/api/getUserRewards")]
pub(crate) fn get_user_rewards() -> Json<Option<()>> {
    Json(None)
}

#[get("/api/getUserNotifications")]
pub(crate) fn get_user_notifications() -> Json<Option<()>> {
    Json(None)
}

#[post("/api/clearUserNotifications")]
pub(crate) fn clear_user_notifications() -> Json<Option<()>> {
    Json(None)
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SnackPurchase {
    pub(crate) snack_id: String,
}

#[post("/api/buySnackNoUpgrade", data = "<purchase>")]
pub(crate) fn buy_snack(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
) -> (Status, Json<Value>) {
    if purchase.snack_id == "Peanuts" {
        let peanuts = cookies
            .get_pending("peanuts")
            .and_then(|t| t.value().parse::<i32>().ok())
            .unwrap_or(0)
            + 1000;

        cookies.add(crate::new_cookie("peanuts", peanuts.to_string()));
        (
            Status::Ok,
            Json(json!({
                "message": "Peanuts purchased"
            })),
        )
    } else {
        let message = choose(ERROR_MESSAGES);
        (
            Status::BadRequest,
            Json(json!({
                "error": message,
                "message": message,
            })),
        )
    }
}

#[post("/api/buyADangSquirrel")]
pub(crate) fn buy_a_dang_squirrel(cookies: &CookieJar<'_>) -> Json<Value> {
    cookies.add(crate::new_cookie(
        "squirrels",
        (cookies
            .get_pending("squirrels")
            .and_then(|t| t.value().parse::<i32>().ok())
            .unwrap_or(0)
            + 1)
        .to_string(),
    ));
    Json(json!({"message": "Bought a squirrel."}))
}

#[derive(Deserialize)]
pub(crate) struct EatADangPeanut {
    pub(crate) amount: i32,
}

#[post("/api/eatADangPeanut", data = "<dang_peanut>")]
pub(crate) fn eat_a_dang_peanut(
    cookies: &CookieJar<'_>,
    dang_peanut: Json<EatADangPeanut>,
) -> Json<Value> {
    cookies.add(crate::new_cookie(
        "peanuts",
        (cookies
            .get_pending("peanuts")
            .and_then(|t| t.value().parse::<i32>().ok())
            .unwrap_or(0)
            - dang_peanut.amount)
            .to_string(),
    ));
    Json(json!({}))
}

#[post("/api/buyADangPeanut")]
pub(crate) fn buy_a_dang_peanut(cookies: &CookieJar<'_>) -> Json<Value> {
    let peanuts = cookies
        .get_pending("peanuts")
        .and_then(|t| t.value().parse::<i32>().ok())
        .unwrap_or(0)
        + 1000;

    cookies.add(crate::new_cookie("peanuts", peanuts.to_string()));
    Json(json!({
        "message": format!("You receive 1000 peanuts. You now have {} peanuts", peanuts)
    }))
}

pub(crate) fn mocked_error_routes() -> Vec<Route> {
    macro_rules! mock {
        ($uri:expr) => {{
            #[post($uri)]
            pub(crate) fn mock_error() -> BadRequest<Json<Value>> {
                let message = choose(ERROR_MESSAGES);
                BadRequest(Some(Json(json!({
                    "error": message,
                    "message": message,
                }))))
            }
            routes![mock_error]
        }};
    }

    vec![
        mock!("/api/buySlot"),
        mock!("/api/buySnack"),
        mock!("/api/logBeg"),
        mock!("/api/reorderSnacks"),
        mock!("/api/sellSlot"),
        mock!("/api/sellSnack"),
        mock!("/api/buyIncreaseMaxBet"),
        mock!("/api/buyIncreaseDailyCoins"),
        mock!("/api/buyRelic"),
        mock!("/api/buyUnlockShop"),
        mock!("/api/buyVote"),
    ]
    .concat()
}
