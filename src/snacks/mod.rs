mod routes;

pub use routes::*;

use crate::cookies::AsCookie;
use crate::snacks::Slot::{Occupied, Vacant};
use anyhow::{Context, Error, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt::{self, Display};
use std::str::FromStr;

#[derive(Debug)]
pub(crate) struct SnackPack(Vec<Slot>);

impl Default for SnackPack {
    fn default() -> SnackPack {
        let mut v = vec![Vacant; 8];
        v[0] = Occupied(Snack::Votes, 1);
        SnackPack(v)
    }
}

impl Display for SnackPack {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (i, slot) in self.0.iter().enumerate() {
            if i > 0 {
                write!(f, ",")?;
            }
            write!(f, "{}", slot)?;
        }
        Ok(())
    }
}

impl FromStr for SnackPack {
    type Err = Error;

    fn from_str(s: &str) -> Result<SnackPack> {
        Ok(SnackPack(
            s.split(',').map(|s| s.parse()).collect::<Result<_>>()?,
        ))
    }
}

impl AsCookie for SnackPack {
    const NAME: &'static str = "snack_pack";
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

impl SnackPack {
    pub(crate) fn get(&self, snack: Snack) -> Option<i64> {
        self.0.iter().find_map(|slot| match slot {
            Occupied(s, amount) if *s == snack => Some(*amount),
            _ => None,
        })
    }

    pub(crate) fn adjust(&mut self, snack: Snack, adjustment: i64) -> Option<i64> {
        if let Some(slot) = self
            .0
            .iter_mut()
            .find(|slot| matches!(slot, Occupied(s, _) if *s == snack))
        {
            let amount_ref = match slot {
                Occupied(_, ref mut amount) => amount,
                _ => unreachable!(),
            };
            *amount_ref += adjustment;
            let amount = *amount_ref;
            if amount == 0 {
                *slot = Vacant;
            }
            Some(amount)
        } else if let Some(slot) = self.0.iter_mut().find(|slot| matches!(slot, Vacant)) {
            *slot = Occupied(snack, adjustment);
            Some(adjustment)
        } else {
            None
        }
    }

    pub(crate) fn len(&self) -> usize {
        self.0.len()
    }

    pub(crate) fn amounts(&self) -> HashMap<Snack, i64> {
        self.0
            .iter()
            .copied()
            .filter_map(|slot| match slot {
                Vacant => None,
                Occupied(snack, amount) => Some((snack, amount)),
            })
            .collect()
    }

    pub(crate) fn order(&self) -> Vec<String> {
        self.0
            .iter()
            .copied()
            .map(|slot| match slot {
                Vacant => "E".to_owned(),
                Occupied(snack, _) => snack.to_string(),
            })
            .collect()
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Slot {
    Vacant,
    Occupied(Snack, i64),
}

impl Display for Slot {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Vacant => write!(f, "E"),
            Occupied(snack, amount) => write!(f, "{}:{}", snack, amount),
        }
    }
}

impl FromStr for Slot {
    type Err = Error;

    fn from_str(s: &str) -> Result<Slot> {
        if s == "E" {
            return Ok(Vacant);
        }
        let (snack, amount) = s.split_once(':').context("invalid format")?;
        Ok(Occupied(snack.parse()?, amount.parse()?))
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Clone, Copy, Deserialize, Serialize, PartialEq, Eq, Hash)]
pub(crate) enum Snack {
    #[serde(rename = "Idol_Hits")]
    IdolHits,
    #[serde(rename = "Idol_Homers")]
    IdolHomers,
    #[serde(rename = "Idol_Strikeouts")]
    IdolStrikeouts,
    #[serde(rename = "Idol_Shutouts")]
    IdolShutouts,
    #[serde(rename = "Team_Win")]
    TeamWin,
    #[serde(rename = "Max_Bet")]
    MaxBet,
    #[serde(rename = "Team_Loss")]
    TeamLoss,
    #[serde(rename = "Team_Slush")]
    TeamSlush,
    #[serde(rename = "Black_Hole")]
    BlackHole,
    #[serde(rename = "Idol_Steal")]
    IdolSteal,
    #[serde(rename = "Idol_Pitcher_Win")]
    IdolPitcherWin,
    #[serde(rename = "Idol_Pitcher_Loss")]
    IdolPitcherLoss,
    #[serde(rename = "Idol_Homer_Allowed")]
    IdolHomerAllowed,
    #[serde(rename = "Team_Shamed")]
    TeamShamed,
    #[serde(rename = "Team_Shaming")]
    TeamShaming,
    Breakfast,
    #[serde(rename = "Sun_2")]
    Sun2,
    Incineration,
    #[serde(rename = "Consumer_Attacks")]
    ConsumerAttacks,
    Votes,
    Flutes,
    #[serde(rename = "Stadium_Access")]
    StadiumAccess,
    #[serde(rename = "Wills_Access")]
    WillsAccess,
    #[serde(rename = "Forbidden_Knowledge_Access")]
    ForbiddenKnowledgeAccess,
    Beg,
    Peanuts,
    #[serde(rename = "Tarot_Reroll")]
    TarotReroll,
    #[serde(rename = "Red_Herring")]
    RedHerring,
}

serde_plain::derive_display_from_serialize!(Snack);
serde_plain::derive_fromstr_from_deserialize!(Snack);

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[cfg(test)]
mod tests {
    use super::{Snack, SnackPack};
    use maplit::hashmap;
    use std::str::FromStr;

    #[test]
    fn test() {
        assert_eq!(SnackPack::default().to_string(), "Votes:1,E,E,E,E,E,E,E");
        assert_eq!(
            SnackPack::from_str("Votes:1,E,E,E,E,E,E,E").unwrap().0,
            SnackPack::default().0
        );

        assert_eq!(SnackPack::default().get(Snack::Votes), Some(1));
        assert_eq!(SnackPack::default().len(), 8);
        assert_eq!(
            SnackPack::default().amounts(),
            hashmap! { Snack::Votes => 1 }
        );
        assert_eq!(
            SnackPack::default().order(),
            vec!["Votes", "E", "E", "E", "E", "E", "E", "E"]
        );

        let mut snacks = SnackPack::default();
        snacks.adjust(Snack::Votes, 100);
        assert_eq!(snacks.get(Snack::Votes), Some(101));
        assert_eq!(snacks.get(Snack::Peanuts), None);
        snacks.adjust(Snack::Peanuts, 1000);
        assert_eq!(snacks.get(Snack::Peanuts), Some(1000));
        assert_eq!(snacks.to_string(), "Votes:101,Peanuts:1000,E,E,E,E,E,E");
        snacks.adjust(Snack::Votes, -101);
        assert_eq!(snacks.get(Snack::Votes), None);
        assert_eq!(snacks.to_string(), "E,Peanuts:1000,E,E,E,E,E,E");
    }
}
