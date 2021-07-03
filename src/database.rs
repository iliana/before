use crate::chronicler::{PlayerNameId, RequestBuilder, Versions};
use crate::time::OffsetTime;
use crate::Result;
use chrono::{DateTime, Duration, Utc};
use rocket::futures::TryStreamExt;
use rocket::serde::json::Json;
use rocket::Route;
use rocket::{get, routes};
use serde_json::value::RawValue;
use std::collections::HashMap;

lazy_static::lazy_static! {
    static ref EVENTUALLY_BASE_URL: String = std::env::var("EVENTUALLY_BASE_URL")
        .ok()
        .unwrap_or_else(|| "https://api.sibr.dev/eventually/v2/".to_string());
}

lazy_static::lazy_static! {
    static ref UPNUTS_BASE_URL: String = std::env::var("UPNUTS_BASE_URL")
        .ok()
        .unwrap_or_else(|| "https://api.sibr.dev/upnuts/".to_string());
}

async fn fetch(
    ty: &'static str,
    ids: Option<String>,
    time: DateTime<Utc>,
) -> Result<impl Iterator<Item = Box<RawValue>>> {
    let mut builder = RequestBuilder::new("v2/entities").ty(ty).at(time);
    if let Some(ids) = ids {
        builder = builder.id(ids)
    }

    Ok(builder
        .json::<Versions<Box<RawValue>>>()
        .await?
        .items
        .into_iter()
        .map(|version| version.data))
}

pub fn entity_routes() -> Vec<Route> {
    macro_rules! route {
        ($uri:expr) => {
            route!($uri, $uri.rsplitn(2, '/').next().unwrap())
        };

        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity(time: OffsetTime) -> Result<Option<Json<Box<RawValue>>>> {
                Ok(fetch($ty, None, time.0).await?.next().map(Json))
            }
            routes![entity]
        }};
    }

    macro_rules! route_id {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity_id(
                id: String,
                time: OffsetTime,
            ) -> Result<Option<Json<Box<RawValue>>>> {
                if id.is_empty() {
                    Ok(None)
                } else {
                    Ok(fetch($ty, Some(id), time.0).await?.next().map(Json))
                }
            }
            routes![entity_id]
        }};
    }

    macro_rules! route_ids {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity_ids(
                ids: String,
                time: OffsetTime,
            ) -> Result<Json<Vec<Box<RawValue>>>> {
                if ids.is_empty() || ids == "placeholder-idol" {
                    Ok(Json(vec![]))
                } else {
                    Ok(Json(fetch($ty, Some(ids), time.0).await?.collect()))
                }
            }
            routes![entity_ids]
        }};
    }

    vec![
        route!("/api/getIdols", "Idols"),
        route!("/api/getTribute", "Tributes"),
        route!("/database/allTeams", "Team"),
        route!("/database/giftProgress"),
        route!("/database/globalEvents"),
        route!("/database/offseasonRecap"),
        route!("/database/offseasonSetup"),
        route!("/database/shopSetup"),
        route!("/database/sunsun", "sunsun"),
        route_id!("/database/renovationProgress?<id>", "RenovationProgress"),
        route_id!("/database/teamElectionStats?<id>", "TeamElectionStats"),
        route_ids!("/database/bonusResults?<ids>", "BonusResult"),
        route_ids!("/database/decreeResults?<ids>", "DecreeResult"),
        route_ids!("/database/eventResults?<ids>", "EventResult"),
        route_ids!("/database/players?<ids>", "Player"),
    ]
    .concat()
}

#[get("/database/items?<ids>")]
pub async fn items(ids: String, time: OffsetTime) -> Result<Json<Vec<Box<RawValue>>>> {
    // Workaround for Chronicler not picking up items as soon as prize matches start: if requesting
    // a single item, fetch as normal, and if the response is empty, try again with an `at` of one
    // hour later.
    let data = fetch("Item", Some(ids.clone()), time.0)
        .await?
        .collect::<Vec<_>>();
    Ok(Json(if !ids.contains(',') && data.is_empty() {
        fetch("Item", Some(ids), time.0 + Duration::hours(1))
            .await?
            .collect()
    } else {
        data
    }))
}

#[get("/database/playerNamesIds")]
pub async fn player_names_ids(time: OffsetTime) -> Result<Json<Vec<PlayerNameId>>> {
    let mut v = RequestBuilder::new("v2/entities")
        .ty("Player")
        .at(time.0)
        .paged_json::<PlayerNameId>()
        .map_ok(|v| v.data)
        .try_collect::<Vec<_>>()
        .await?;
    v.sort_by(|l, r| l.name.cmp(&r.name));
    Ok(Json(v))
}

// TODO get these in chronicler, then add a workaround to cap the OffsetTime at the earliest point
// where the data is present
#[get("/database/renovations?<ids>")]
pub async fn renovations(ids: String) -> Result<Json<Box<RawValue>>> {
    Ok(Json(
        crate::CLIENT
            .get(format!(
                "https://www.blaseball.com/database/renovations?ids={}",
                ids
            ))
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feed/global?<sort>&<category>&<start>&<limit>")]
pub async fn global_feed(
    sort: Option<String>,
    category: Option<String>,
    start: Option<String>,
    limit: Option<String>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = if let Some(c) = category {
        format!(
            "{base_url}feed/global?time={time}&start={start}&limit={limit}&sort={sort}&category={category}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            start = start.unwrap_or("0".to_owned()),
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("0".to_owned()),
            time = time.0.timestamp_millis(),
            category = c
        )
    } else {
        format!(
            "{base_url}feed/global?time={time}&start={start}&limit={limit}&sort={sort}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            start = start.unwrap_or("0".to_owned()),
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("0".to_owned()),
            time = time.0.timestamp_millis()
        )
    };

    Ok(Json(
        crate::CLIENT
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feed/game?<id>&<sort>&<category>&<limit>")]
pub async fn game_feed(
    id: String,
    sort: Option<String>,
    category: Option<String>,
    limit: Option<String>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = if let Some(c) = category {
        format!(
            "{base_url}feed/game?id={id}&time={time}&limit={limit}&sort={sort}&category={category}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("2000".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis(),
            category = c
        )
    } else {
        format!(
            "{base_url}feed/game?id={id}&time={time}&limit={limit}&sort={sort}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("2000".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis()
        )
    };

    Ok(Json(
        crate::CLIENT
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feed/player?<id>&<sort>&<category>&<limit>")]
pub async fn player_feed(
    id: String,
    sort: Option<String>,
    category: Option<String>,
    limit: Option<String>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = if let Some(c) = category {
        format!(
            "{base_url}feed/player?id={id}&time={time}&limit={limit}&sort={sort}&category={category}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis(),
            category = c
        )
    } else {
        format!(
            "{base_url}feed/player?id={id}&time={time}&limit={limit}&sort={sort}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis()
        )
    };

    Ok(Json(
        crate::CLIENT
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feed/team?<id>&<sort>&<category>&<limit>")]
pub async fn team_feed(
    id: String,
    sort: Option<String>,
    category: Option<String>,
    limit: Option<String>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = if let Some(c) = category {
        format!(
            "{base_url}feed/team?id={id}&time={time}&limit={limit}&sort={sort}&category={category}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis(),
            category = c
        )
    } else {
        format!(
            "{base_url}feed/team?id={id}&time={time}&limit={limit}&sort={sort}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("200".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis()
        )
    };

    Ok(Json(
        crate::CLIENT
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}

#[get("/database/feed/story?<id>&<sort>&<category>&<limit>")]
pub async fn story_feed(
    id: String,
    sort: Option<String>,
    category: Option<String>,
    limit: Option<String>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = if let Some(c) = category {
        format!(
            "{base_url}feed/story?id={id}&time={time}&limit={limit}&sort={sort}&category={category}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("2000".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis(),
            category = c
        )
    } else {
        format!(
            "{base_url}feed/story?id={id}&time={time}&limit={limit}&sort={sort}&one_of_providers=7fcb63bc-11f2-40b9-b465-f1d458692a63",
            base_url = *UPNUTS_BASE_URL,
            id = id,
            limit = limit.unwrap_or("2000".to_owned()),
            sort = sort.unwrap_or("1".to_owned()),
            time = time.0.timestamp_millis()
        )
    };

    Ok(Json(
        crate::CLIENT
            .get(url)
            .send()
            .await
            .map_err(anyhow::Error::from)?
            .json()
            .await
            .map_err(anyhow::Error::from)?,
    ))
}
