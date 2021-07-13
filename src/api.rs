use crate::choose;
use rocket::http::{Cookie, CookieJar};
use rocket::response::status::BadRequest;
use rocket::serde::json::Json;
use rocket::{get, post, routes, Route};
use serde::Deserialize;
use serde_json::{json, Value};
use std::str::FromStr;

#[get("/api/getActiveBets")]
pub fn get_active_bets() -> Json<Vec<()>> {
    Json(vec![])
}

#[get("/api/getUser")]
pub fn get_user(cookies: &CookieJar<'_>) -> Json<Value> {
    Json(json!({
        "id": "be457c4e-79e6-4016-94f5-76c6705741bb",
        "email": "before@sibr.dev",
        // disable ability to change email on frontend
        "appleId": "what's umpdog",
        "lightMode": cookies.get_pending("light_mode")
            .and_then(|s| bool::from_str(s.value()).ok())
            .unwrap_or(false),
        "verified": true,
        "coins": 0,
        "idol": choose(IDOL_CHOICES),
        "favoriteTeam": cookies.get_pending("favorite_team")
            .map(|s| {
                let s = s.value().to_owned();
                if s == "_before_change_team" {
                    Value::Null
                } else {
                    Value::String(s)
                }
            })
            .unwrap_or_else(|| Value::String(choose(TEAM_CHOICES).to_owned())),
        "unlockedShop": true,
        "unlockedElection": true,
        "spread": [],
        "snacks": {
            "Forbidden_Knowledge_Access": 1,
            "Stadium_Access": 1,
            "Wills_Access": 1,
            "Flutes": 1,
        },
        "snackOrder": [
            "Forbidden_Knowledge_Access",
            "Stadium_Access",
            "Wills_Access",
            "Flutes",
            "E",
            "E",
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
pub fn get_user_rewards() -> Json<Option<()>> {
    Json(None)
}

#[get("/api/getUserNotifications")]
pub fn get_user_notifications() -> Json<Option<()>> {
    Json(None)
}

#[post("/api/clearUserNotifications")]
pub fn clear_user_notifications() -> Json<Option<()>> {
    Json(None)
}

#[post("/api/buyUpdateFavoriteTeam")]
pub fn buy_flute(cookies: &CookieJar<'_>) -> Json<Value> {
    cookies.add(Cookie::new(
        "favorite_team",
        "_before_change_team".to_string(),
    ));
    Json(json!({"message": "Reload this page to choose a new team."}))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FavoriteTeamUpdate {
    pub team_id: String,
}

#[post("/api/updateFavoriteTeam", data = "<new_favorite>")]
pub fn update_favourite_team(
    cookies: &CookieJar<'_>,
    new_favorite: Json<FavoriteTeamUpdate>,
) -> Json<Value> {
    cookies.add(Cookie::new(
        "favorite_team",
        new_favorite.team_id.to_string(),
    ));
    Json(json!({ "message": "You now remember the Before of a new team." }))
}

pub fn mocked_error_routes() -> Vec<Route> {
    static ERROR_MESSAGES: &[&str] = &[
        "If you were meant to have that, you already would",
        "Monitor's on vacation, sorry",
        "You can't get ye flask!",
    ];

    macro_rules! mock {
        ($uri:expr) => {{
            #[post($uri)]
            pub fn mock_error() -> BadRequest<Json<Value>> {
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
        mock!("/api/buySnackNoUpgrade"),
        mock!("/api/reorderSnacks"),
        mock!("/api/sellSlot"),
        mock!("/api/sellSnack"),
    ]
    .concat()
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    pub light_mode: bool,
}

#[post("/api/updateSettings", data = "<settings>")]
pub fn update_settings(cookies: &CookieJar<'_>, settings: Json<Settings>) -> Json<Value> {
    cookies.add(Cookie::new("light_mode", settings.light_mode.to_string()));
    Json(json!({ "message": "Settings updated" }))
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
    "a1628d97-16ca-4a75-b8df-569bae02bef9", // Chorby Soul
    "a3947fbc-50ec-45a4-bca4-49ffebb77dbe", // Chorby Short
    "c675fcdf-6117-49a6-ac32-99a89a3a88aa", // Valentine Games
    "c6a277c3-d2b5-4363-839b-950896a5ec5e", // Mike Townsend
    "d4a10c2a-0c28-466a-9213-38ba3339b65e", // Richmond Harrison
    "f2a27a7e-bf04-4d31-86f5-16bfa3addbe7", // Winnie Hess
    "f70dd57b-55c4-4a62-a5ea-7cc4bf9d8ac1", // Tillman Henderson
];

// All 20 original Season 1 teams, no Breach/Lift
static TEAM_CHOICES: &[&str] = &[
    "105bc3ff-1320-4e37-8ef0-8d595cb95dd0", // Garages
    "23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7", // Pies
    "36569151-a2fb-43c1-9df7-2df512424c82", // Millennials
    "3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e", // Flowers
    "57ec08cc-0411-4643-b304-0e80dbc15ac7", // Wild Wings
    "747b8e4a-7e50-4638-a973-ea7950a3e739", // Tigers
    "7966eb04-efcc-499b-8f03-d13916330531", // Magic
    "878c1bf6-0d21-4659-bfee-916c8314d69c", // Tacos
    "8d87c468-699a-47a8-b40d-cfb73a5660ad", // Crabs
    "979aee4a-6d80-4863-bf1c-ee1a78e06024", // Fridays
    "9debc64f-74b7-4ae1-a4d6-fce0144b6ea5", // Spies
    "a37f9158-7f82-46bc-908c-c9e2dda7c33b", // Jazz Hands
    "adc5b394-8f76-416d-9ce9-813706877b84", // The Breath Mints.
    "b024e975-1c4a-4575-8936-a3754a08806a", // Steaks
    "b63be8c2-576a-4d6e-8daf-814f8bcea96f", // Dale
    "b72f3061-f573-40d7-832a-5ad475bd7909", // Lovers
    "bfd38797-8404-4b38-8b82-341da28b1f83", // Shoe Thieves
    "ca3f1c8c-c025-4d8e-8eef-5be6accbeb16", // Firefighters
    "eb67ae5e-c4bf-46ca-bbbc-425cd34182ff", // Moist Talkers
    "f02aeae2-5e6a-4098-9842-02d2273f25c7", // Sunbeams
];
