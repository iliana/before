use crate::cookies::CookieJarExt;
use crate::snacks::{Snack, SnackPack};
use rocket::http::{CookieJar, Status};
use rocket::post;
use rocket::serde::json::Json;
use serde::Deserialize;
use serde_json::{json, Value};

macro_rules! ensure {
    ($cond:expr, $message:expr) => {
        if !$cond {
            return (Status::BadRequest, Json(json!({
                "message": $message,
                "error": $message,
            })));
        }
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[post("/api/buyVote", data = "<purchase>")]
pub(crate) fn buy_vote(
    cookies: &CookieJar<'_>,
    purchase: Json<VotePurchase>,
) -> (Status, Json<Value>) {
    ensure!(
        purchase.amount.unwrap_or(1).is_positive(),
        "Invalid request"
    );
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    ensure!(
        snacks
            .adjust(Snack::Votes, purchase.amount.unwrap_or(1))
            .is_some(),
        "Snack pack full"
    );
    cookies.store(&snacks);
    (Status::Ok, Json(json!({})))
}

#[derive(Deserialize)]
pub(crate) struct VotePurchase {
    amount: Option<i64>,
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[post("/api/buySnackNoUpgrade", data = "<purchase>")]
pub(crate) fn buy_snack_no_upgrade(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
) -> (Status, Json<Value>) {
    let amount = match purchase.snack_id {
        Snack::Peanuts => 1000,
        _ => 1,
    };
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    ensure!(
        snacks.adjust(purchase.snack_id, amount).is_some(),
        "Snack pack full"
    );
    cookies.store(&snacks);
    (Status::Ok, Json(json!({})))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SnackPurchase {
    snack_id: Snack,
}
