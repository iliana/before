use crate::chronicler::{PlayerNameId, RequestBuilder, Versions};
use crate::time::OffsetTime;
use crate::Result;
use rocket::futures::TryStreamExt;
use rocket::serde::json::Json;
use rocket::Route;
use rocket::{get, routes};
use serde_json::value::RawValue;

async fn fetch(
    ty: &'static str,
    ids: Option<String>,
    time: OffsetTime,
) -> Result<impl Iterator<Item = Box<RawValue>>> {
    let mut builder = RequestBuilder::new("v2/entities").ty(ty).at(time.0);
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
                Ok(fetch($ty, None, time).await?.next().map(Json))
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
                    Ok(fetch($ty, Some(id), time).await?.next().map(Json))
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
                if ids.is_empty() {
                    Ok(Json(vec![]))
                } else {
                    Ok(Json(fetch($ty, Some(ids), time).await?.collect()))
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
        route_id!("/database/renovationProgress?<id>", "RenovationProgress"),
        route_id!("/database/teamElectionStats?<id>", "TeamElectionStats"),
        route_ids!("/database/bonusResults?<ids>", "BonusResult"),
        route_ids!("/database/decreeResults?<ids>", "DecreeResult"),
        route_ids!("/database/eventResults?<ids>", "EventResult"),
        route_ids!("/database/players?<ids>", "Player"),
    ]
    .concat()
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
