use crate::chronicler::{fix_id, Order, RequestBuilder};
use crate::offset::OffsetTime;
use crate::time::{datetime, DateTime};
use crate::{Config, Result};
use itertools::Itertools;
use rocket::futures::{future::try_join_all, TryStreamExt};
use rocket::serde::json::Json;
use rocket::{get, State};
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::borrow::Cow;
use std::collections::{BTreeMap, HashMap};

lazy_static::lazy_static! {
    static ref NUDGES: HashMap<String, BTreeMap<DateTime, Option<Nudge>>> =
        serde_json::from_str(include_str!("../data/playernudge.json")).unwrap();
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum Nudge {
    Forward(DateTime),
    Replace(serde_json::Value),
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

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
    let mut nudges = Vec::new();
    let remaining_ids = ids
        .split(',')
        .filter(|id| {
            match NUDGES
                .get(*id)
                .and_then(|nudges| nudges.range(..time.0).rev().next())
                .and_then(|(_, nudge)| nudge.as_ref())
            {
                Some(Nudge::Forward(end)) if time.0 >= *end => true,
                Some(nudge) => {
                    nudges.push((*id, nudge));
                    false
                }
                None => true,
            }
        })
        .join(",");

    let mut players = HashMap::new();
    for (id, nudge) in nudges {
        match nudge {
            Nudge::Forward(end) => {
                if let Some(player) = config
                    .fetch("Player", Some(id.to_owned()), *end)
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
            RequestBuilder::v2("entities")
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
                .json(config)
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
                    RequestBuilder::v2("versions")
                        .ty("Player")
                        .id(id.to_owned())
                        .order(Order::Asc)
                        .count(1)
                        .json(config)
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/database/playerNamesIds")]
pub(crate) async fn player_names_ids(
    config: &State<Config>,
    time: OffsetTime,
) -> Result<Json<Vec<PlayerNameId>>> {
    let mut v: Vec<PlayerNameId> = RequestBuilder::v2("entities")
        .ty("Player")
        .at(time.0)
        .paged_json(config)
        .map_ok(|v| v.data)
        .try_collect()
        .await?;
    v.sort_by(|l, r| l.name.cmp(&r.name));
    Ok(Json(v))
}

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct PlayerNameId {
    pub(crate) id: String,
    pub(crate) name: String,
}
