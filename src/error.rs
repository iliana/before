use crate::choose;
use rocket::response::status::BadRequest;
use rocket::response::{Responder, Result};
use rocket::serde::json::Json;
use rocket::Request;
use serde_json::json;

#[derive(Debug)]
pub struct ErrorMessage(pub &'static str);

static ERROR_MESSAGES: &[&str] = &[
    "If you were meant to have that, you already would",
    "Monitor's on vacation, sorry",
    "You can't get ye flask!",
];

impl<'r> Responder<'r, 'static> for ErrorMessage {
    fn respond_to(self, req: &'r Request<'_>) -> Result<'static> {
        BadRequest(Some(Json(json!({
            self.0: choose(ERROR_MESSAGES),
        }))))
        .respond_to(req)
    }
}
