use crate::chronicler::{StreamEvent, Version};
use crate::config::Config;
use crate::database::{fetch, fix_id};
use crate::time::{datetime, DateTime};
use anyhow::Result;
use rocket::tokio::try_join;
use serde::Serialize;
use serde_json::value::RawValue;

const LEAGUES_START: DateTime = datetime!(2020-09-03 21:40:38.266 UTC);
const TIEBREAKERS_START: DateTime = datetime!(2020-09-10 17:51:30.577 UTC);

#[derive(Debug, Serialize)]
#[serde(untagged)]
pub(crate) enum Leagues {
    Value(Box<RawValue>),
    Constructed {
        leagues: Vec<Box<RawValue>>,
        stadiums: Vec<Box<RawValue>>,
        subleagues: Vec<Box<RawValue>>,
        divisions: Vec<Box<RawValue>>,
        teams: Vec<Box<RawValue>>,
        tiebreakers: Vec<Box<RawValue>>,
        stats: LeaguesStats,
    },
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct LeaguesStats {
    #[serde(skip_serializing_if = "Option::is_none")]
    community_chest: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    sunsun: Option<Box<RawValue>>,
}

impl Leagues {
    pub(crate) async fn first(
        config: &Config,
        past: &mut [Version<StreamEvent>],
        time: DateTime,
    ) -> Result<Leagues> {
        Ok(
            match past
                .iter_mut()
                .rev()
                .find_map(|v| v.data.value.leagues.take())
            {
                Some(v) => Leagues::Value(v),
                None => {
                    let (
                        leagues,
                        stadiums,
                        subleagues,
                        divisions,
                        teams,
                        tiebreakers,
                        mut community_chest,
                        mut sunsun,
                    ) = try_join!(
                        fetch(config, "League", None, std::cmp::max(time, LEAGUES_START)),
                        fetch(config, "Stadium", None, time),
                        fetch(
                            config,
                            "Subleague",
                            None,
                            std::cmp::max(time, LEAGUES_START)
                        ),
                        fetch(config, "Division", None, std::cmp::max(time, LEAGUES_START)),
                        fetch(config, "Team", None, time),
                        fetch(
                            config,
                            "Tiebreakers",
                            None,
                            std::cmp::max(time, TIEBREAKERS_START)
                        ),
                        fetch(config, "CommunityChestProgress", None, time),
                        fetch(config, "SunSun", None, time),
                    )?;
                    Leagues::Constructed {
                        leagues: leagues.map(|v| fix_id(v, time)).collect::<Result<_>>()?,
                        stadiums: stadiums.collect(),
                        subleagues: subleagues.map(|v| fix_id(v, time)).collect::<Result<_>>()?,
                        divisions: divisions.map(|v| fix_id(v, time)).collect::<Result<_>>()?,
                        teams: teams.map(|v| fix_id(v, time)).collect::<Result<_>>()?,
                        tiebreakers: tiebreakers.collect(),
                        stats: LeaguesStats {
                            community_chest: community_chest.next(),
                            sunsun: sunsun.next(),
                        },
                    }
                }
            },
        )
    }
}
