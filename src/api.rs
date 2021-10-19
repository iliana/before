use rocket::http::Status;
use rocket::request::Request;
use rocket::response::{self, Responder};
use rocket::serde::json::Json;
use rocket::{get, post};
use serde::Serialize;
use serde_json::{json, Value};

pub(crate) enum ApiResult<T> {
    Ok(T),
    Err(T),
}

impl<T: Serialize> From<ApiResult<T>> for (Status, Value) {
    fn from(res: ApiResult<T>) -> (Status, Value) {
        match res {
            ApiResult::Ok(message) => (Status::Ok, json!({ "message": message })),
            ApiResult::Err(message) => (
                Status::BadRequest,
                json!({ "message": message, "error": message }),
            ),
        }
    }
}

impl<'r, 'o: 'r, T: Serialize + 'o> Responder<'r, 'o> for ApiResult<T> {
    fn respond_to(self, request: &'r Request<'_>) -> response::Result<'o> {
        let responder: (Status, Value) = self.into();
        responder.respond_to(request)
    }
}

#[get("/api/getActiveBets")]
pub(crate) fn get_active_bets() -> Json<Vec<()>> {
    Json(vec![])
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
