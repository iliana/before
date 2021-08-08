use crate::chronicler::{RequestBuilder, Versions};
use crate::database::fetch;
use anyhow::{anyhow, Result};
use chrono::{DateTime, Utc};
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::collections::HashMap;
use std::convert::TryFrom;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Postseason {
    playoffs: Box<RawValue>,
    all_rounds: Vec<Box<RawValue>>,
    all_matchups: Vec<Box<RawValue>>,
    matchups: Vec<Box<RawValue>>,
    round: Box<RawValue>,
    tomorrow_matchups: Vec<Box<RawValue>>,
    tomorrow_round: Box<RawValue>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Playoffs {
    rounds: Vec<String>,
    tomorrow_round: i64,
    season: i64,
}

#[derive(Deserialize)]
struct Round {
    matchups: Vec<String>,
}

pub async fn postseason(
    id: String,
    season: i64,
    round: i64,
    time: DateTime<Utc>,
) -> Result<Option<Postseason>> {
    let playoffs_raw = match fetch("Playoffs", Some(id), time).await?.next() {
        Some(x) => x,
        None => return Ok(None),
    };
    let playoffs: Playoffs = serde_json::from_str(playoffs_raw.get())?;
    if playoffs.season != season {
        return Ok(None);
    }

    let rounds_raw = fetch_map("PlayoffRound", playoffs.rounds.join(","), time).await?;
    let rounds_raw_vec = playoffs
        .rounds
        .iter()
        .map(|id| {
            rounds_raw
                .get(id)
                .ok_or_else(|| anyhow!("id missing in rounds_raw"))
        })
        .collect::<Result<Vec<_>>>()?;
    let rounds = rounds_raw
        .values()
        .map(|round| serde_json::from_str::<Round>(round.get()))
        .collect::<serde_json::Result<Vec<_>>>()?;
    let rounds_vec = rounds_raw_vec
        .iter()
        .map(|round| serde_json::from_str::<Round>(round.get()))
        .collect::<serde_json::Result<Vec<_>>>()?;

    let matchups_raw = fetch_map(
        "PlayoffMatchup",
        rounds.iter().flat_map(|round| &round.matchups).join(","),
        time,
    )
    .await?;

    let (today_round, today_matchups) =
        matchups_for_round(&rounds_raw_vec, &rounds_vec, round, &matchups_raw)?;
    let (tomorrow_round, tomorrow_matchups) = matchups_for_round(
        &rounds_raw_vec,
        &rounds_vec,
        playoffs.tomorrow_round,
        &matchups_raw,
    )?;

    Ok(Some(Postseason {
        playoffs: playoffs_raw,
        all_rounds: rounds_raw.into_values().collect(),
        all_matchups: matchups_raw.into_values().collect(),
        matchups: today_matchups,
        round: today_round,
        tomorrow_matchups,
        tomorrow_round,
    }))
}

#[allow(clippy::borrowed_box)] // i have no idea what i'm doing dot jpeg
fn matchups_for_round(
    rounds_raw: &[&Box<RawValue>],
    rounds: &[Round],
    round: i64,
    matchups: &HashMap<String, Box<RawValue>>,
) -> Result<(Box<RawValue>, Vec<Box<RawValue>>)> {
    let round_raw = rounds_raw
        .get(usize::try_from(round)?)
        .ok_or_else(|| anyhow!("out of bounds in rounds_raw"))?;
    let today_round = rounds
        .get(usize::try_from(round)?)
        .ok_or_else(|| anyhow!("out of bounds in rounds"))?;
    let today_matchups = today_round
        .matchups
        .iter()
        .map(|id| {
            matchups
                .get(id)
                .map(|x| (*x).clone())
                .ok_or_else(|| anyhow!("id missing in matchups"))
        })
        .collect::<Result<Vec<_>>>()?;

    Ok(((*round_raw).clone(), today_matchups))
}

async fn fetch_map(
    ty: &'static str,
    ids: String,
    time: DateTime<Utc>,
) -> Result<HashMap<String, Box<RawValue>>> {
    Ok(RequestBuilder::new("v2/entities")
        .ty(ty)
        .at(time)
        .id(ids)
        .json::<Versions<Box<RawValue>>>()
        .await?
        .items
        .into_iter()
        .map(|version| (version.entity_id, version.data))
        .collect::<HashMap<_, _>>())
}
