use rocket::get;
use rocket::response::status::NoContent;
use rocket::serde::json::Json;
use serde_json::{json, Value};

#[get("/api/getUser")]
pub fn get_user() -> Json<Value> {
    Json(json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        "verified": true,
        "snacks": [],
        "snackOrder": [],
        // set all these to reasonably high values to avoid rendering the "what to do next" actions
        // in the bulletin
        "trackers": {
            "BEGS": 69,
            "BETS": 69,
            "VOTES_CAST": 69,
            "SNACKS_BOUGHT": 69,
            "SNACK_UPGRADES": 69,
        },
    }))
}

#[get("/api/getUserRewards")]
pub fn get_user_rewards() -> NoContent {
    NoContent
}
