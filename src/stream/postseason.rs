use crate::time::DateTime;
use crate::Config;
use anyhow::{anyhow, Result};
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::collections::HashMap;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Postseason {
    playoffs: Box<RawValue>,
    all_rounds: Vec<Box<RawValue>>,
    all_matchups: Vec<Box<RawValue>>,
    matchups: Vec<Box<RawValue>>,
    round: Box<RawValue>,
    tomorrow_matchups: Vec<Box<RawValue>>,
    tomorrow_round: Box<RawValue>,
}

impl Postseason {
    pub(crate) async fn build(
        config: &Config,
        id: String,
        season: i64,
        round: i64,
        time: DateTime,
    ) -> Result<Option<Postseason>> {
        let playoffs_raw = match config
            .fetch::<Box<RawValue>>("Playoffs", Some(id), time)
            .await?
            .next()
        {
            Some(x) => x,
            None => return Ok(None),
        };
        let playoffs: Playoffs = serde_json::from_str(playoffs_raw.get())?;
        if playoffs.season != season {
            return Ok(None);
        }

        let rounds_raw = config
            .fetch_map::<Box<RawValue>>("PlayoffRound", Some(playoffs.rounds.join(",")), time)
            .await?;
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

        let matchups_raw = config
            .fetch_map(
                "PlayoffMatchup",
                Some(rounds.iter().flat_map(|round| &round.matchups).join(",")),
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
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Playoffs {
    rounds: Vec<String>,
    tomorrow_round: i64,
    season: i64,
}

#[derive(Debug, Deserialize)]
struct Round {
    matchups: Vec<String>,
}

#[allow(clippy::borrowed_box, clippy::similar_names)]
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
