use crate::api::ApiResult;
use crate::cookies::CookieJarExt;
use crate::offset::OffsetTime;
use crate::snacks::{Snack, SnackPack};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::Deserialize;

#[post("/api/buyVote", data = "<purchase>")]
pub(crate) fn buy_vote(
    cookies: &CookieJar<'_>,
    purchase: Json<VotePurchase>,
) -> ApiResult<&'static str> {
    let amount = purchase.amount.unwrap_or(1);
    if !amount.is_positive() {
        return ApiResult::Err("Invalid request");
    }
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if snacks
        .set(
            Snack::Votes,
            snacks.get(Snack::Votes).unwrap_or_default() + amount,
        )
        .is_none()
    {
        return ApiResult::Err("Snack pack full");
    }
    cookies.store(&snacks);
    ApiResult::Ok("Vote Bought")
}

#[derive(Deserialize)]
pub(crate) struct VotePurchase {
    amount: Option<i64>,
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Deserialize)]
pub(crate) struct EatADangPeanut {
    pub(crate) amount: i64,
}

#[post("/api/eatADangPeanut", data = "<dang_peanut>")]
pub(crate) fn eat_a_dang_peanut(
    cookies: &CookieJar<'_>,
    dang_peanut: Json<EatADangPeanut>,
) -> ApiResult<()> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let amount = snacks.get(Snack::Peanuts).unwrap_or_default() - dang_peanut.amount;
    if amount.is_negative() {
        ApiResult::Err(())
    } else {
        snacks.set(Snack::Peanuts, amount);
        cookies.store(&snacks);
        ApiResult::Ok(())
    }
}

#[post("/api/buyADangPeanut")]
pub(crate) fn buy_a_dang_peanut(cookies: &CookieJar<'_>) -> ApiResult<String> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let peanuts = snacks.set_force(
        Snack::Peanuts,
        snacks.get(Snack::Peanuts).unwrap_or_default() + 1000,
    );
    cookies.store(&snacks);
    ApiResult::Ok(format!(
        "You receive 1000 peanuts. You now have {} peanuts",
        peanuts
    ))
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[post("/api/buySnack", data = "<purchase>")]
pub(crate) fn buy_snack(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> ApiResult<String> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let (amount, what) = match snacks.get(purchase.snack_id) {
        Some(current) => (current + 1, "upgraded"),
        None => (purchase.snack_id.min(), "bought"),
    };
    if snacks.set(purchase.snack_id, amount).is_none() {
        return ApiResult::Err("Snack pack full".to_string());
    }
    cookies.store(&snacks);
    ApiResult::Ok(format!(
        "You {} the {}.",
        what,
        purchase.snack_id.name(time.0)
    ))
}

#[post("/api/buyRelic", data = "<purchase>")]
pub(crate) fn buy_relic(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
) -> ApiResult<&'static str> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let amount = match snacks.get(purchase.snack_id) {
        Some(current) => current + 1,
        None => purchase.snack_id.min(),
    };
    snacks.set_force(purchase.snack_id, amount);
    cookies.store(&snacks);
    ApiResult::Ok("Bought relic") // FIXME use actual messages found in frontend
}

#[post("/api/buySnackNoUpgrade", data = "<purchase>")]
pub(crate) fn buy_snack_no_upgrade(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> ApiResult<String> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let amount = match purchase.snack_id {
        Snack::Peanuts => 1000,
        _ => purchase.snack_id.min(),
    };
    if snacks
        .set(
            purchase.snack_id,
            snacks.get(purchase.snack_id).unwrap_or_default() + amount,
        )
        .is_none()
    {
        return ApiResult::Err("Snack pack full".to_string());
    }
    cookies.store(&snacks);
    ApiResult::Ok(format!(
        "You bought the {}.",
        purchase.snack_id.name(time.0)
    ))
}

#[post("/api/sellSnack", data = "<purchase>")]
pub(crate) fn sell_snack(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> ApiResult<String> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if let Some(amount) = purchase.amount {
        if let Some(current) = snacks.get(purchase.snack_id) {
            if current - amount < purchase.snack_id.min() {
                snacks.remove(purchase.snack_id);
            } else {
                snacks.set(purchase.snack_id, current - amount);
            }
        } else {
            return ApiResult::Err("Invalid request".to_string());
        }
    } else if !snacks.remove(purchase.snack_id) {
        return ApiResult::Err("Invalid request".to_string());
    }
    cookies.store(&snacks);
    ApiResult::Ok(format!("You sold the {}.", purchase.snack_id.name(time.0)))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SnackPurchase {
    #[serde(alias = "relicId")]
    snack_id: Snack,
    amount: Option<i64>,
}
