use crate::api::ApiResult;
use crate::cookies::CookieJarExt;
use crate::offset::OffsetTime;
use crate::snacks::{Slot, SlotContents, Snack, SnackPack};
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::Deserialize;

#[post("/api/buyVote", data = "<purchase>")]
pub(crate) fn buy_vote(
    purchase: Json<VotePurchase>,
    cookies: &CookieJar<'_>,
    time: OffsetTime,
) -> ApiResult<&'static str> {
    let amount = purchase.into_inner().amount.unwrap_or(1);
    if !amount.is_positive() {
        return ApiResult::Err("Invalid request");
    }
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if time.0 < crate::EXPANSION {
        if snacks
            .set(
                Snack::Votes,
                snacks.get(Snack::Votes).unwrap_or_default() + amount,
            )
            .is_none()
        {
            return ApiResult::Err("Snack pack full");
        }
    } else {
        snacks.set_force(
            Snack::Votes,
            snacks.get(Snack::Votes).unwrap_or_default() + amount,
        );
    }
    cookies.store(&snacks);
    ApiResult::Ok("Vote Bought")
}

#[derive(Deserialize)]
pub(crate) struct VotePurchase {
    amount: Option<i64>,
}

#[post("/api/buyIncreaseMaxBet")]
pub(crate) fn buy_increase_max_bet(cookies: &CookieJar<'_>) -> ApiResult<&'static str> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    snacks.set_force(
        Snack::MaxBet,
        snacks.get(Snack::MaxBet).unwrap_or_default() + 1,
    );
    cookies.store(&snacks);
    ApiResult::Ok("Increased max bet")
}

#[post("/api/buyIncreaseDailyCoins")]
pub(crate) fn buy_increase_daily_coins(cookies: &CookieJar<'_>) -> ApiResult<&'static str> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    snacks.set_force(
        Snack::TeamWin,
        snacks.get(Snack::TeamWin).unwrap_or_default() + 1,
    );
    cookies.store(&snacks);
    ApiResult::Ok("Increased coins per win")
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
    let amount = snacks.get(Snack::Peanuts).unwrap_or_default() - dang_peanut.into_inner().amount;
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
    let snack_id = purchase.into_inner().snack_id;
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let (amount, what) = match snacks.get(snack_id) {
        Some(current) => (current + 1, "upgraded"),
        None => (snack_id.min(), "bought"),
    };
    if snacks.set(snack_id, amount).is_none() {
        return ApiResult::Err("Snack pack full".to_string());
    }
    cookies.store(&snacks);
    ApiResult::Ok(format!("You {} the {}.", what, snack_id.name(time.0)))
}

#[post("/api/buyRelic", data = "<purchase>")]
pub(crate) fn buy_relic(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
) -> ApiResult<&'static str> {
    let snack_id = purchase.into_inner().snack_id;
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let amount = match snacks.get(snack_id) {
        Some(current) => current + 1,
        None => snack_id.min(),
    };
    snacks.set_force(snack_id, amount);
    cookies.store(&snacks);
    ApiResult::Ok("Bought relic") // FIXME use actual messages found in frontend
}

#[post("/api/buySnackNoUpgrade", data = "<purchase>")]
pub(crate) fn buy_snack_no_upgrade(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> ApiResult<String> {
    let snack_id = purchase.into_inner().snack_id;
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    let amount = match snack_id {
        Snack::Peanuts => 1000,
        _ => snack_id.min(),
    };
    if snacks
        .set(snack_id, snacks.get(snack_id).unwrap_or_default() + amount)
        .is_none()
    {
        return ApiResult::Err("Snack pack full".to_string());
    }
    cookies.store(&snacks);
    ApiResult::Ok(format!("You bought the {}.", snack_id.name(time.0)))
}

#[post("/api/sellSnack", data = "<purchase>")]
pub(crate) fn sell_snack(
    cookies: &CookieJar<'_>,
    purchase: Json<SnackPurchase>,
    time: OffsetTime,
) -> ApiResult<String> {
    let purchase = purchase.into_inner();
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[post("/api/buySlot")]
pub(crate) fn buy_slot(cookies: &CookieJar<'_>) -> ApiResult<&'static str> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    snacks.0.push(Slot::Vacant);
    cookies.store(&snacks);
    ApiResult::Ok("You bought the Snack Slot.")
}

#[post("/api/sellSlot", data = "<sell_slot>")]
pub(crate) fn sell_slot(
    cookies: &CookieJar<'_>,
    sell_slot: Json<SellSlot>,
) -> ApiResult<&'static str> {
    let index = sell_slot.into_inner().slot_index;
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    if index < snacks.len() {
        snacks.0.remove(index);
        cookies.store(&snacks);
        ApiResult::Ok("You discarded the Snack Slot.")
    } else {
        ApiResult::Err("Invalid request")
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SellSlot {
    slot_index: usize,
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[post("/api/reorderSnacks", data = "<reorder>")]
pub(crate) fn reorder_snacks(
    cookies: &CookieJar<'_>,
    reorder: Json<ReorderSnacks>,
) -> ApiResult<&'static str> {
    let mut snacks = cookies.load::<SnackPack>().unwrap_or_default();
    match snacks.reorder(&reorder.into_inner().snack_order) {
        Ok(()) => {
            cookies.store(&snacks);
            ApiResult::Ok("Snacks reordered")
        }
        Err(_) => ApiResult::Err("Invalid request"),
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ReorderSnacks {
    snack_order: Vec<SlotContents>,
}
