use crate::offset::OffsetTime;
use crate::time::{datetime, DateTime, Duration};
use crate::{Config, Result};
use anyhow::anyhow;
use itertools::Itertools;
use rocket::serde::json::Json;
use rocket::{get, routes, Route, State};
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::collections::HashMap;

pub(crate) fn entity_routes() -> Vec<Route> {
    macro_rules! route {
        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub(crate) async fn entity(
                config: &State<Config>,
                time: OffsetTime,
            ) -> Result<Option<Json<Box<RawValue>>>> {
                Ok(config.fetch($ty, None, time.0).await?.next().map(Json))
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
                Ok(Json(config.fetch($ty, None, time.0).await?.collect()))
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
                    Ok(config.fetch($ty, Some(id), time.0).await?.next().map(Json))
                }
            }
            routes![entity_id]
        }};
    }

    vec![
        route!("/api/getIdols", "Idols"),
        route!("/api/getRisingStars", "RisingStars"),
        route!("/api/getTribute", "Tributes"),
        route!("/api/championCallout", "ChampionCallout"),
        route!(
            "/api/daysSinceLastIncineration",
            "DaysSinceLastIncineration"
        ),
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
        // s3-stored configs
        route!("/_before/s3-configs/attributes.json", "Attributes"),
        route!("/_before/s3-configs/fanart.json", "Fanart"),
        route!("/_before/s3-configs/glossary_words.json", "GlossaryWords"),
        route!("/_before/s3-configs/library.json", "Library"),
        route!("/_before/s3-configs/sponsor_data.json", "SponsorData"),
        route!("/_before/s3-configs/stadium_prefabs.json", "StadiumPrefabs"),
        route!(
            "/_before/s3-configs/feed_season_list.json",
            "FeedSeasonList"
        ),
        route!("/_before/s3-configs/the_beat.json", "TheBeat"),
        route!("/_before/s3-configs/the_book.json", "TheBook"),
    ]
    .concat()
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/database/gameById/<id>")]
pub(crate) async fn game_by_id(
    config: &State<Config>,
    id: String,
    time: OffsetTime,
) -> Result<Option<Json<Box<RawValue>>>> {
    Ok(config.fetch_game(id, time.0).await?.map(Json))
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
    let data = config
        .fetch("Item", Some(ids.clone()), time.0)
        .await?
        .collect::<Vec<_>>();
    Ok(Json(if !ids.contains(',') && data.is_empty() {
        config
            .fetch("Item", Some(ids), time.0 + Duration::hours(1))
            .await?
            .collect()
    } else {
        data
    }))
}

#[get("/database/renovations?<ids>")]
pub(crate) fn renovations(ids: &str) -> Json<Vec<&'static RawValue>> {
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Serialize)]
#[serde(untagged)]
pub(crate) enum PreviousChamp {
    OverUnder {
        over: Box<RawValue>,
        under: Box<RawValue>,
    },
    Raw(Option<Box<RawValue>>),
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

    let sim: Sim = config
        .fetch("Sim", None, time.0)
        .await?
        .next()
        .ok_or_else(|| anyhow!("sim doesn't exist yet"))?;
    let season = sim.season - if sim.phase == 0 { 0 } else { 1 };

    let mut playoffs = config
        .fetch("Playoffs", None, time.0)
        .await?
        .filter_map(|value: Playoffs| {
            if value.season == season {
                Some(Ok(value))
            } else {
                None
            }
        })
        .collect::<anyhow::Result<Vec<_>>>()?;
    playoffs.sort_by_key(|p| p.bracket);

    Ok(Json(if time.0 < UNDERCHAMP {
        match playoffs.into_iter().find(|p| {
            if season == 21 {
                // ¡dale!
                p.bracket == Some(1)
            } else {
                p.bracket != Some(1)
            }
        }) {
            Some(p) => {
                PreviousChamp::Raw(config.fetch("Team", Some(p.winner), time.0).await?.next())
            }
            None => PreviousChamp::Raw(None),
        }
    } else {
        let mut iter = config
            .fetch(
                "Team",
                Some(playoffs.iter().map(|p| &p.winner).join(",")),
                time.0,
            )
            .await?;
        PreviousChamp::OverUnder {
            over: iter.next().ok_or_else(|| anyhow!("missing over"))?,
            under: iter.next().ok_or_else(|| anyhow!("missing under"))?,
        }
    }))
}
