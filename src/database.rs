use crate::chronicler::{OffseasonRecap, Order, PlayerNameId, RequestBuilder, Versions};
use crate::offset::OffsetTime;
use crate::time::{datetime, DateTime, Duration};
use crate::{Config, Result};
use anyhow::anyhow;
use either::{Either, Left, Right};
use itertools::Itertools;
use reqwest::Url;
use rocket::futures::{future::try_join_all, TryStreamExt};
use rocket::serde::json::Json;
use rocket::{get, routes, Route, State};
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::borrow::Cow;
use std::collections::{BTreeMap, HashMap};
use std::convert::TryFrom;

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum Nudge {
    Forward(DateTime),
    Replace(serde_json::Value),
}

pub(crate) async fn fetch(
    config: &Config,
    ty: &'static str,
    ids: Option<String>,
    time: DateTime,
) -> anyhow::Result<impl Iterator<Item = Box<RawValue>>> {
    let mut builder = RequestBuilder::new("v2/entities").ty(ty).at(time);
    if let Some(ids) = ids {
        builder = builder.id(ids)
    }

    Ok(builder
        .json::<Versions<Box<RawValue>>>(config)
        .await?
        .items
        .into_iter()
        .map(|version| version.data))
}

pub(crate) fn fix_id(v: Box<RawValue>, time: DateTime) -> anyhow::Result<Box<RawValue>> {
    const ID_EPOCH: DateTime = datetime!(2020-08-23 23:23:00 UTC);

    Ok(if time < ID_EPOCH && v.get().contains(r#""id":"#) {
        RawValue::from_string(v.get().replace(r#""id":"#, r#""_id":"#))?
    } else if time >= ID_EPOCH && v.get().contains(r#""_id":"#) {
        RawValue::from_string(v.get().replace(r#""_id":"#, r#""id":"#))?
    } else {
        v
    })
}

pub(crate) fn entity_routes() -> Vec<Route> {
    macro_rules! route {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub(crate) async fn entity(
                config: &State<Config>,
                time: OffsetTime,
            ) -> Result<Option<Json<Box<RawValue>>>> {
                Ok(fetch(config, $ty, None, time.0).await?.next().map(Json))
            }
            routes![entity]
        }};
    }

    macro_rules! route_all {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub(crate) async fn entity_all(
                config: &State<Config>,
                time: OffsetTime,
            ) -> Result<Json<Vec<Box<RawValue>>>> {
                Ok(Json(fetch(config, $ty, None, time.0).await?.collect()))
            }
            routes![entity_all]
        }};
    }

    macro_rules! route_id {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub(crate) async fn entity_id(
                config: &State<Config>,
                id: String,
                time: OffsetTime,
            ) -> Result<Option<Json<Box<RawValue>>>> {
                if id.is_empty() {
                    Ok(None)
                } else {
                    Ok(fetch(config, $ty, Some(id), time.0).await?.next().map(Json))
                }
            }
            routes![entity_id]
        }};
    }

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
pub(crate) async fn game_by_id(
    config: &State<Config>,
    id: String,
    time: OffsetTime,
) -> Result<Option<Json<Box<RawValue>>>> {
    Ok(crate::chronicler::fetch_game(config, id, time.0)
        .await?
        .map(Json))
}

#[get("/database/items?<ids>")]
pub(crate) async fn items(
    config: &State<Config>,
    ids: String,
    time: OffsetTime,
) -> Result<Json<Vec<Box<RawValue>>>> {
    // Workaround for Chronicler not picking up items as soon as prize matches start: if requesting
    // a single item, fetch as normal, and if the response is empty, try again with an `at` of one
    // hour later.
    let data = fetch(config, "Item", Some(ids.clone()), time.0)
        .await?
        .collect::<Vec<_>>();
    Ok(Json(if !ids.contains(',') && data.is_empty() {
        fetch(config, "Item", Some(ids), time.0 + Duration::hours(1))
            .await?
            .collect()
    } else {
        data
    }))
}

#[get("/database/players?<ids>")]
pub(crate) async fn players(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Box<RawValue>>>> {
    const HALL_REVEALED: DateTime = datetime!(2020-09-20 19:18:00 UTC);
    const HALL_FIXED: DateTime = datetime!(2020-09-23 12:00:00 UTC);

    if ids.is_empty() || ids == "placeholder-idol" {
        return Ok(Json(Vec::new()));
    }

    // Filter out players with nudges and handle those requests separately
    lazy_static::lazy_static! {
        static ref NUDGES: HashMap<String, BTreeMap<DateTime, Option<Nudge>>> =
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
                if let Some(player) = fetch(config, "Player", Some(id.to_owned()), *end)
                    .await?
                    .next()
                {
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
                .at(
                    // heuristically detect a query for hall of flame players with missing
                    // attributes
                    if time.0 > HALL_REVEALED
                        && ids.contains("d74a2473-1f29-40fa-a41e-66fa2281dfca")
                    {
                        std::cmp::max(HALL_FIXED, time.0)
                    } else {
                        time.0
                    },
                )
                .id(remaining_ids)
                .json::<Versions<Box<RawValue>>>(config)
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
                        .json::<Versions<Box<RawValue>>>(config)
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
        ids.split(',')
            .filter_map(|id| players.remove(id).map(|p| fix_id(p, time.0)))
            .collect::<anyhow::Result<_>>()?,
    ))
}

#[get("/database/playerNamesIds")]
pub(crate) async fn player_names_ids(
    config: &State<Config>,
    time: OffsetTime,
) -> Result<Json<Vec<PlayerNameId>>> {
    let mut v = RequestBuilder::new("v2/entities")
        .ty("Player")
        .at(time.0)
        .paged_json::<PlayerNameId>(config)
        .map_ok(|v| v.data)
        .try_collect::<Vec<_>>()
        .await?;
    v.sort_by(|l, r| l.name.cmp(&r.name));
    Ok(Json(v))
}

#[get("/database/offseasonRecap?<season>")]
pub(crate) async fn offseason_recap(
    config: &State<Config>,
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
            .json::<Versions<OffseasonRecap>>(config)
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
    config: &Config,
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
            fetch(config, ty, Some(to_fetch.join(",")), time.0)
                .await?
                .map(Cow::Owned),
        );
    }
    Ok(Json(v))
}

#[get("/database/bonusResults?<ids>")]
pub(crate) async fn bonus_results(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/bonusresults.json")).unwrap();
    }

    locally_patched(config, ids, time, "BonusResult", &DATA).await
}

#[get("/database/decreeResults?<ids>")]
pub(crate) async fn decree_results(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/decreeresults.json")).unwrap();
    }

    locally_patched(config, ids, time, "DecreeResult", &DATA).await
}

#[get("/database/eventResults?<ids>")]
pub(crate) async fn event_results(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    lazy_static::lazy_static! {
        static ref DATA: HashMap<&'static str, &'static RawValue> =
            serde_json::from_str(include_str!("../data/eventresults.json")).unwrap();
    }

    locally_patched(config, ids, time, "EventResult", &DATA).await
}

#[get("/database/feed/<kind>?<id>&<start>&<category>&<sort>&<limit>")]
pub(crate) async fn feed(
    config: &State<Config>,
    kind: &str,
    id: Option<&str>,
    start: Option<&str>,
    category: Option<&str>,
    sort: Option<&str>,
    limit: Option<&str>,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = Url::parse_with_params(
        &format!("{}feed/{}", config.upnuts_base_url, kind),
        vec![
            (
                "one_of_providers",
                Some("7fcb63bc-11f2-40b9-b465-f1d458692a63"),
            ),
            (
                "time",
                Some(time.0.unix_timestamp_millis().to_string().as_str()),
            ),
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
        config
            .client
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
    config: &State<Config>,
    phase: &str,
    season: &str,
    time: OffsetTime,
) -> Result<Json<Box<RawValue>>> {
    let url = Url::parse_with_params(
        &format!("{}/feed/global", config.upnuts_base_url),
        &[
            ("one_of_providers", "7fcb63bc-11f2-40b9-b465-f1d458692a63"),
            ("time", time.0.unix_timestamp_millis().to_string().as_str()),
            ("sort", "1"),
            ("limit", "1000"),
            ("phase", phase),
            ("season", season),
        ],
    )
    .map_err(anyhow::Error::from)?;

    Ok(Json(
        config
            .client
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
pub(crate) fn renovations(ids: String) -> Json<Vec<&'static RawValue>> {
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

#[derive(Serialize)]
#[serde(transparent)]
pub(crate) struct PreviousChamp {
    #[serde(with = "either::serde_untagged")]
    value: Either<OverUnder, Option<Box<RawValue>>>,
}

#[derive(Serialize)]
pub(crate) struct OverUnder {
    over: Box<RawValue>,
    under: Box<RawValue>,
}

#[get("/database/getPreviousChamp")]
pub(crate) async fn get_previous_champ(
    config: &State<Config>,
    time: OffsetTime,
) -> Result<Json<PreviousChamp>> {
    #[derive(Deserialize)]
    struct Sim {
        season: i64,
        phase: i64,
    }

    #[derive(Deserialize)]
    struct Playoffs {
        season: i64,
        winner: String,
        bracket: Option<i64>,
    }

    const UNDERCHAMP: DateTime = datetime!(2021-07-19 14:50:00 UTC);

    let sim = serde_json::from_str::<Sim>(
        fetch(config, "Sim", None, time.0)
            .await?
            .next()
            .ok_or_else(|| anyhow!("sim doesn't exist yet"))?
            .get(),
    )
    .map_err(anyhow::Error::from)?;
    let season = sim.season - if sim.phase == 0 { 0 } else { 1 };

    let mut playoffs = fetch(config, "Playoffs", None, time.0)
        .await?
        .filter_map(
            |value| match serde_json::from_str::<Playoffs>(value.get()) {
                Ok(playoff) => {
                    if playoff.season == season {
                        Some(Ok(playoff))
                    } else {
                        None
                    }
                }
                Err(err) => Some(Err(err.into())),
            },
        )
        .collect::<anyhow::Result<Vec<_>>>()?;
    playoffs.sort_by_key(|p| p.bracket);

    Ok(Json(PreviousChamp {
        value: if time.0 < UNDERCHAMP {
            match playoffs.into_iter().find(|p| {
                if season == 21 {
                    // ¡dale!
                    p.bracket == Some(1)
                } else {
                    p.bracket != Some(1)
                }
            }) {
                Some(p) => Right(fetch(config, "Team", Some(p.winner), time.0).await?.next()),
                None => Right(None),
            }
        } else {
            let mut iter = fetch(
                config,
                "Team",
                Some(playoffs.iter().map(|p| &p.winner).join(",")),
                time.0,
            )
            .await?;
            Left(OverUnder {
                over: iter.next().ok_or_else(|| anyhow!("missing over"))?,
                under: iter.next().ok_or_else(|| anyhow!("missing under"))?,
            })
        },
    }))
}
