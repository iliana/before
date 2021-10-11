use crate::choose;
use crate::cookies::CookieJarExt;
use crate::favorite_team::FavoriteTeam;
use crate::settings::{DisableMotion, LightMode};
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
    Json(json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        // disable ability to change email on frontend
        "appleId": "what's umpdog",
        "verified": true,
        "motion": cookies.load::<DisableMotion>().unwrap_or_default(),
        "lightMode": cookies.load::<LightMode>().unwrap_or_default(),
        "coins": "Infinity",
        "peanuts": cookies.get_pending("peanuts").and_then(|t| t.value().parse::<i32>().ok()).unwrap_or(0),
        "squirrels": cookies.get_pending("squirrels").and_then(|t| t.value().parse::<i32>().ok()).unwrap_or(0),
        "idol": choose(IDOL_CHOICES),
        "favoriteTeam": cookies.load::<FavoriteTeam>(),
        "unlockedShop": true,
        "unlockedElection": true,
        "spread": cookies.load::<Spread>().unwrap_or_else(Spread::generate),
        "snacks": {
            "Forbidden_Knowledge_Access": 1,
            "Stadium_Access": 1,
            "Wills_Access": 1,
            "Flutes": 1,
            "Tarot_Reroll": 1,
            "Peanuts": cookies.get_pending("peanuts").and_then(|t| t.value().parse::<i32>().ok()).unwrap_or(0),
        },
        "snackOrder": [
            "Forbidden_Knowledge_Access",
            "Stadium_Access",
            "Wills_Access",
            "Flutes",
            "Tarot_Reroll",
            "Peanuts",
            "E",
            "E",
        ],
        "packSize": 8,
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
            "Idol_Strikeouts": 0,
            "Idol_Shutouts": 0,
            "Idol_Homers": 0,
            "Idol_Hits": 0,
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

// Should be a list of players that have been around (in the database) since Season 1
static IDOL_CHOICES: &[&str] = &[
    "04e14d7b-5021-4250-a3cd-932ba8e0a889", // Jaylen Hotdogfingers
    "083d09d4-7ed3-4100-b021-8fbe30dd43e8", // Jessica Telephone
    "1f159bab-923a-4811-b6fa-02bfde50925a", // NaN
    "20be1c34-071d-40c6-8824-dde2af184b4d", // Qais Dogwalker
    "20fd71e7-4fa0-4132-9f47-06a314ed539a", // Lars Taylor
    "338694b7-6256-4724-86b6-3884299a5d9e", // PolkaDot Patterson
    "493a83de-6bcf-41a1-97dd-cc5e150548a3", // Boyfriend Monreal
    "53e701c7-e3c8-4e18-ba05-9b41b4b64cda", // Marquez Clark
    "a3947fbc-50ec-45a4-bca4-49ffebb77dbe", // Chorby Short
    "c675fcdf-6117-49a6-ac32-99a89a3a88aa", // Valentine Games
    "c6a277c3-d2b5-4363-839b-950896a5ec5e", // Mike Townsend
    "d4a10c2a-0c28-466a-9213-38ba3339b65e", // Richmond Harrison
    "f2a27a7e-bf04-4d31-86f5-16bfa3addbe7", // Winnie Hess
    "f70dd57b-55c4-4a62-a5ea-7cc4bf9d8ac1", // Tillman Henderson
];
