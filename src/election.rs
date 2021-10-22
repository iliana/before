use crate::chronicler::{RequestBuilder, Version};
use crate::config::Config;
use crate::offset::OffsetTime;
use crate::Result;
use rocket::serde::json::Json;
use rocket::{get, State};
use serde::Deserialize;
use serde_json::value::RawValue;
use std::borrow::Cow;
use std::collections::HashMap;

#[get("/database/offseasonRecap?<season>")]
pub(crate) async fn offseason_recap(
    config: &State<Config>,
    season: i64,
    time: OffsetTime,
) -> Result<Option<Json<Cow<'static, RawValue>>>> {
    #[derive(Deserialize)]
    struct OffseasonRecap {
        season: i64,
    }

    lazy_static::lazy_static! {
        static ref DATA: Vec<&'static RawValue> =
            serde_json::from_str(include_str!("../data/offseasonrecap.json")).unwrap();
    }

    Ok(if season < 11 {
        DATA.get(usize::try_from(season).map_err(anyhow::Error::from)?)
            .copied()
            .map(|value| Json(Cow::Borrowed(value)))
    } else {
        RequestBuilder::v2("entities")
            .ty("OffseasonRecap")
            .at(time.0)
            .json(config)
            .await?
            .items
            .into_iter()
            .find(|version: &Version<Box<RawValue>>| {
                if let Ok(data) = serde_json::from_str::<OffseasonRecap>(version.data.get()) {
                    data.season == season
                } else {
                    false
                }
            })
            .map(|version| Json(Cow::Owned(version.data)))
    })
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

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
            config
                .fetch(ty, Some(to_fetch.join(",")), time.0)
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
