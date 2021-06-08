use crate::chronicler::{PlayerNameId, RequestBuilder, Versions};
use crate::time::OffsetTime;
use crate::Result;
use rocket::futures::TryStreamExt;
use rocket::serde::json::Json;
use rocket::Route;
use rocket::{get, routes};
use serde_json::value::RawValue;

type Entity = Result<Option<Json<Box<RawValue>>>>;

async fn entity(ty: &'static str, time: OffsetTime) -> Entity {
    Ok(RequestBuilder::new("v2/entities")
        .ty(ty)
        .at(time.0)
        .count(1)
        .json::<Versions<Box<RawValue>>>()
        .await?
        .items
        .into_iter()
        .next()
        .map(|version| Json(version.data)))
}

pub fn entity_routes() -> Vec<Route> {
    macro_rules! entity_route {
        ($uri:expr) => {
            entity_route!($uri, $uri.rsplitn(2, '/').next().unwrap())
        };

        ($uri:expr, $ty:expr) => {{
            #[get($uri)]
            pub async fn entity_route(time: OffsetTime) -> Entity {
                entity($ty, time).await
            }
            routes![entity_route]
        }};
    }

    vec![
        entity_route!("/api/getIdols", "Idols"),
        entity_route!("/database/globalEvents"),
        entity_route!("/database/offseasonSetup"),
        entity_route!("/database/shopSetup"),
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
