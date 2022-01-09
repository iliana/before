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

lazy_static::lazy_static! {
    static ref OFFSEASON_RECAP: Vec<&'static RawValue> =
        serde_json::from_str(include_str!("../data/offseasonrecap.json")).unwrap();
    static ref BONUS_RESULTS: HashMap<&'static str, &'static RawValue> =
        serde_json::from_str(include_str!("../data/bonusresults.json")).unwrap();
    static ref DECREE_RESULTS: HashMap<&'static str, &'static RawValue> =
        serde_json::from_str(include_str!("../data/decreeresults.json")).unwrap();
    static ref EVENT_RESULTS: HashMap<&'static str, &'static RawValue> =
        serde_json::from_str(include_str!("../data/eventresults.json")).unwrap();
}

#[cfg(test)]
#[test]
fn check_data() {
    assert!(!OFFSEASON_RECAP.is_empty());
    assert!(!BONUS_RESULTS.is_empty());
    assert!(!DECREE_RESULTS.is_empty());
    assert!(!EVENT_RESULTS.is_empty());
}

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

    Ok(if season < 11 {
        OFFSEASON_RECAP
            .get(usize::try_from(season).map_err(anyhow::Error::from)?)
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
    locally_patched(config, ids, time, "BonusResult", &BONUS_RESULTS).await
}

#[get("/database/decreeResults?<ids>")]
pub(crate) async fn decree_results(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    locally_patched(config, ids, time, "DecreeResult", &DECREE_RESULTS).await
}

#[get("/database/eventResults?<ids>")]
pub(crate) async fn event_results(
    config: &State<Config>,
    ids: &str,
    time: OffsetTime,
) -> Result<Json<Vec<Cow<'static, RawValue>>>> {
    locally_patched(config, ids, time, "EventResult", &EVENT_RESULTS).await
}
