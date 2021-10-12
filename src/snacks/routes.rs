use crate::cookies::CookieJarExt;
use crate::offset::OffsetTime;
use crate::snacks::{Snack, SnackPack};
use rocket::http::{CookieJar, Status};
use rocket::post;
use rocket::serde::json::Json;
use serde::Deserialize;
use serde_json::{json, Value};

macro_rules! bail {
    ($message:expr) => {
        return (Status::BadRequest, Json(json!({
            "message": $message,
            "error": $message,
        })));
    };
}

macro_rules! ensure {
    ($cond:expr, $message:expr) => {
        if !$cond {
            bail!($message);
        }
    };
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
    (Status::Ok, Json(json!({"message": "Vote Bought"})))
}

#[derive(Deserialize)]
pub(crate) struct VotePurchase {
    amount: Option<i64>,
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

macro_rules! buy_snack {
    ($f:ident, $route:expr) => {
        #[post($route, data = "<purchase>")]
        pub(crate) fn $f(
            cookies: &CookieJar<'_>,
            purchase: Json<SnackPurchase>,
            time: OffsetTime,
        ) -> (Status, Json<Value>) {
            let amount = match purchase.snack_id {
                Snack::Peanuts => 1000,
                _ => 1,
            };
            let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
            let message = match snacks.adjust(purchase.snack_id, amount) {
                Some(amount) => {
                    if !$route.ends_with("NoUpgrade") && amount > 1 {
                        format!("You upgraded the {}.", purchase.snack_id.name(time.0))
                    } else {
                        format!("You bought the {}.", purchase.snack_id.name(time.0))
                    }
                }
                None => bail!("Snack pack full"),
            };
            cookies.store(&snacks);
            (Status::Ok, Json(json!({ "message": message })))
        }
    };
}

buy_snack!(buy_snack, "/api/buySnack");
buy_snack!(buy_snack_no_upgrade, "/api/buySnackNoUpgrade");

#[post("/api/sellSnack", data = "<purchase>")]
pub(crate) fn sell_snack(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> (Status, Json<Value>) {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    ensure!(snacks.remove(purchase.snack_id), "Invalid request");
    cookies.store(&snacks);
    (
        Status::Ok,
        Json(json!({
            "message": format!("You sold the {}.", purchase.snack_id.name(time.0))
        })),
    )
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SnackPurchase {
    snack_id: Snack,
}
