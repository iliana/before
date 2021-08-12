use crate::chronicler::{OffseasonRecap, Order, PlayerNameId, RequestBuilder, Versions};
use crate::time::OffsetTime;
use crate::Result;
use chrono::{DateTime, Duration, Utc};
use either::{Either, Left, Right};
use itertools::Itertools;
use reqwest::Url;
use rocket::futures::{future::try_join_all, TryStreamExt};
use rocket::serde::json::Json;
use rocket::{get, routes, Route};
use serde::Deserialize;
use serde_json::value::RawValue;
use std::borrow::Cow;
use std::collections::{BTreeMap, HashMap};
use std::convert::TryFrom;

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum Nudge {
    Forward(DateTime<Utc>),
    Replace(serde_json::Value),
}

pub async fn fetch(
    ty: &'static str,
    ids: Option<String>,
    time: DateTime<Utc>,
) -> anyhow::Result<impl Iterator<Item = Box<RawValue>>> {
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

pub fn fix_id(v: Box<RawValue>, time: DateTime<Utc>) -> anyhow::Result<Box<RawValue>> {
    lazy_static::lazy_static! {
        static ref ID_EPOCH: DateTime<Utc> = "2020-08-23T23:23:00Z".parse().unwrap();
    }

    Ok(if time < *ID_EPOCH && v.get().contains(r#""id":"#) {
        RawValue::from_string(v.get().replace(r#""id":"#, r#""_id":"#))?
    } else if time >= *ID_EPOCH && v.get().contains(r#""_id":"#) {
        RawValue::from_string(v.get().replace(r#""_id":"#, r#""id":"#))?
    } else {
        v
    })
}

pub fn entity_routes() -> Vec<Route> {
    macro_rules! route {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity(time: OffsetTime) -> Result<Option<Json<Box<RawValue>>>> {
                Ok(fetch($ty, None, time.0).await?.next().map(Json))
            }
            routes![entity]
        }};
    }

    macro_rules! route_all {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity_all(time: OffsetTime) -> Result<Json<Vec<Box<RawValue>>>> {
                Ok(Json(fetch($ty, None, time.0).await?.collect()))
            }
            routes![entity_all]
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

    /*
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
    */

    vec![
        route!("/api/getIdols", "Idols"),
        route!("/api/getRisingStars", "RisingStars"),
        route!("/api/getTribute", "Tributes"),
        route!("/database/communityChestProgress", "CommunityChestProgress"),
        route!("/database/fuelProgress", "FuelProgress"),
        route!("/database/giftProgress", "GiftProgress"),
        route!("/database/globalEvents", "GlobalEvents"),
        route!("/database/nullified", "Nullified"),
        route!("/database/offseasonSetup", "OffseasonSetup"),
        route!("/database/shopSetup", "ShopSetup"),
        route!("/database/simulationData", "Sim"),
        route!("/database/sunsun", "SunSun"),
        route!("/database/vault", "Vault"),
        route_all!("/database/allDivisions", "Division"),
        route_all!("/database/allTeams", "Team"),
        route_id!("/database/renovationProgress?<id>", "RenovationProgress"),
        route_id!("/database/subleague?<id>", "Subleague"),
        route_id!("/database/team?<id>", "Team"),
        route_id!("/database/teamElectionStats?<id>", "TeamElectionStats"),
    ]
    .concat()
}

#[get("/database/gameById/<id>")]
pub async fn game_by_id(id: String, time: OffsetTime) -> Result<Option<Json<Box<RawValue>>>> {
    Ok(crate::chronicler::fetch_game(id, time.0).await?.map(Json))
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

#[get("/database/players?<ids>")]
pub async fn players(ids: &str, time: OffsetTime) -> Result<Json<Vec<Box<RawValue>>>> {
    if ids.is_empty() || ids == "placeholder-idol" {
        return Ok(Json(Vec::new()));
    }

    // Filter out players with nudges and handle those requests separately
    lazy_static::lazy_static! {
        static ref NUDGES: HashMap<String, BTreeMap<DateTime<Utc>, Option<Nudge>>> =
            serde_json::from_str(include_str!("../data/playernudge.json")).unwrap();
    }
    let mut nudges = Vec::new();
    let remaining_ids = ids
        .split(',')
        .filter(|id| {
            if let Some(nudge) = NUDGES
                .get(*id)
                .and_then(|nudges| nudges.range(..time.0).rev().next())
                .and_then(|(_, nudge)| nudge.as_ref())
            {
                match nudge {
                    Nudge::Forward(end) if time.0 >= *end => true,
                    _ => {
                        nudges.push((*id, nudge));
                        false
                    }
                }
            } else {
                true
            }
        })
        .join(",");

    let mut players = HashMap::new();
    for (id, nudge) in nudges {
        match nudge {
            Nudge::Forward(end) => {
                if let Some(player) = fetch("Player", Some(id.to_owned()), *end).await?.next() {
                    players.insert(Cow::Borrowed(id), player);
                }
            }
            Nudge::Replace(v) => {
                players.insert(
                    Cow::Borrowed(id),
                    serde_json::from_value(v.clone()).map_err(anyhow::Error::from)?,
                );
            }
        };
    }
    if !remaining_ids.is_empty() {
        players.extend(
            RequestBuilder::new("v2/entities")
                .ty("Player")
                .at(time.0)
                .id(remaining_ids)
                .json::<Versions<Box<RawValue>>>()
                .await?
                .items
                .into_iter()
                .map(|version| (Cow::Owned(version.entity_id), version.data)),
        );
    }

    // When a player is incinerated, the replacement won't be in Chronicler until it logs it. Check
    // for missing players in the response and fetch the earliest version Chronicler knows about if
    // missing.
    players.extend(
        try_join_all(
            ids.split(',')
                .filter(|id| !players.contains_key(*id))
                .map(|id| {
                    RequestBuilder::new("v2/versions")
                        .ty("Player")
                        .id(id.to_owned())
                        .order(Order::Asc)
                        .count(1)
                        .json::<Versions<Box<RawValue>>>()
                }),
        )
        .await?
        .into_iter()
        .filter_map(|versions| {
            versions
                .items
                .into_iter()
                .next()
                .map(|version| (Cow::Owned(version.entity_id), version.data))
        }),
    );

    // Combine a final list of players in the originally-provided ID order.
    Ok(Json(
        ids.split(',').filter_map(|id| players.remove(id)).collect(),
    ))
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

#[get("/database/offseasonRecap?<season>")]
pub async fn offseason_recap(
    season: i64,
    time: OffsetTime,
) -> Result<Option<Either<Json<&'static RawValue>, Json<OffseasonRecap>>>> {
    lazy_static::lazy_static! {
        static ref DATA: Vec<&'static RawValue> =
            serde_json::from_str(include_str!("../data/offseasonrecap.json")).unwrap();
    }

    Ok(if season < 11 {
        DATA.get(usize::try_from(season).map_err(anyhow::Error::from)?)
            .copied()
            .map(|b| Left(Json(b)))
    } else {
        RequestBuilder::new("v2/entities")
            .ty("OffseasonRecap")
            .at(time.0)
            .count(1000)
            .json::<Versions<OffseasonRecap>>()
            .await?
            .items
            .into_iter()
            .find_map(|item| {
                if item.data.season == season {
                    Some(Right(Json(item.data)))
                } else {
                    None
                }
            })
    })
}

async fn locally_patched(
    ids: &str,
    time: OffsetTime,
    ty: &'static str,
    data: &HashMap<&'static str, &'static RawValue>,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    let (local, to_fetch): (Vec<&str>, Vec<&str>) =
        ids.split(',').partition(|id| data.contains_key(id));
    let mut v: Vec<_> = local
        .into_iter()
        .filter_map(|id| data.get(id).copied().map(Cow::Borrowed))
        .collect();
    if !to_fetch.is_empty() {
        v.extend(
            fetch(ty, Some(to_fetch.join(",")), time.0)
                .await?
                .map(Cow::Owned),
        );
    }
    Ok(Json(v))
}

#[get("/database/bonusResults?<ids>")]
pub async fn bonus_results(
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/bonusresults.json")).unwrap();
    }

    locally_patched(ids, time, "BonusResult", &DATA).await
}

#[get("/database/decreeResults?<ids>")]
pub async fn decree_results(
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/decreeresults.json")).unwrap();
    }

    locally_patched(ids, time, "DecreeResult", &DATA).await
}

#[get("/database/eventResults?<ids>")]
pub async fn event_results(
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/eventresults.json")).unwrap();
    }

    locally_patched(ids, time, "EventResult", &DATA).await
}

#[get("/database/feed/<kind>?<id>&<start>&<category>&<sort>&<limit>")]
pub async fn feed(
    kind: &str,
    id: Option<&str>,
    start: Option<&str>,
    category: Option<&str>,
    sort: Option<&str>,
    limit: Option<&str>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let time = time.0.timestamp_millis().to_string();
    let url = Url::parse_with_params(
        &format!("{}feed/{}", crate::CONFIG.upnuts_base_url, kind),
        vec![
            (
                "one_of_providers",
                Some("7fcb63bc-11f2-40b9-b465-f1d458692a63"),
            ),
            ("time", Some(time.as_str())),
            ("id", id),
            ("start", start),
            ("category", category),
            ("sort", sort),
            ("limit", limit),
        ]
        .into_iter()
        .filter_map(|(k, v)| v.map(|v| (k, v))),
    )
    .map_err(anyhow::Error::from)?;

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

#[get("/database/feedbyphase?<phase>&<season>")]
pub(crate) async fn feedbyphase(
    phase: &str,
    season: &str,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = Url::parse_with_params(
        &format!("{}/feed/global", crate::CONFIG.upnuts_base_url),
        &[
            ("one_of_providers", "7fcb63bc-11f2-40b9-b465-f1d458692a63"),
            ("time", time.0.timestamp_millis().to_string().as_str()),
            ("sort", "1"),
            ("limit", "1000"),
            ("phase", phase),
            ("season", season),
        ],
    )
    .map_err(anyhow::Error::from)?;

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

#[get("/database/renovations?<ids>")]
pub fn renovations(ids: String) -> Json<Vec<&'static RawValue>> {
    lazy_static::lazy_static! {
        static ref RENOS: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/renos.json")).unwrap();
    }

    Json(
        ids.split(',')
            .filter_map(|id| RENOS.get(id))
            .copied()
            .collect(),
    )
}
