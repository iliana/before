#![allow(clippy::enum_glob_use)]

mod routes;

pub use routes::*;

use crate::cookies::AsCookie;
use crate::snacks::Slot::{Occupied, Vacant};
use crate::time::{datetime, DateTime};
use anyhow::{bail, ensure, Context, Error, Result};
use serde::{de::Error as _, Deserialize, Deserializer, Serialize};
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
            s.split(',').map(str::parse).collect::<Result<_>>()?,
        ))
    }
}

impl AsCookie for SnackPack {
    const NAME: &'static str = "snack_pack";
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

impl SnackPack {
    fn find_snack_mut(&mut self, snack: Snack) -> Option<&mut Slot> {
        self.0
            .iter_mut()
            .find(|slot| matches!(slot, Occupied(s, _) if *s == snack))
    }

    fn find_empty_mut(&mut self) -> Option<&mut Slot> {
        self.0.iter_mut().find(|slot| matches!(slot, Vacant))
    }

    pub(crate) fn get(&self, snack: Snack) -> Option<i64> {
        self.0.iter().find_map(|slot| match slot {
            Occupied(s, amount) if *s == snack => Some(*amount),
            _ => None,
        })
    }

    /// Returns the new amount, or `None` if an empty slot was required but none was available.
    pub(crate) fn set(&mut self, snack: Snack, amount: i64) -> Option<i64> {
        if let Some(slot) = self.find_snack_mut(snack) {
            *slot = Occupied(snack, amount);
            Some(amount)
        } else if let Some(slot) = self.find_empty_mut() {
            *slot = Occupied(snack, amount);
            Some(amount)
        } else {
            None
        }
    }

    /// Adds a new slot if necessary. Returns the new amount.
    pub(crate) fn set_force(&mut self, snack: Snack, amount: i64) -> i64 {
        self.set(snack, amount).unwrap_or_else(|| {
            self.0.push(Occupied(snack, amount));
            amount
        })
    }

    /// Returns `true` if the item was present.
    pub(crate) fn remove(&mut self, snack: Snack) -> bool {
        match self
            .0
            .iter_mut()
            .find(|slot| matches!(slot, Occupied(s, _) if *s == snack))
        {
            Some(slot) => {
                *slot = Vacant;
                true
            }
            None => false,
        }
    }

    fn reorder(&mut self, order: &[SlotContents]) -> Result<()> {
        ensure!(self.0.len() == order.len(), "order length does not match");
        for (i, contents) in order.iter().enumerate() {
            if let Some(position) = self
                .0
                .iter()
                .skip(i)
                .position(|slot| slot.contents() == *contents)
            {
                self.0.swap(i, position + i);
            } else {
                bail!("item not found");
            }
        }
        Ok(())
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

impl Slot {
    fn contents(self) -> SlotContents {
        match self {
            Vacant => SlotContents::Empty,
            Occupied(snack, _) => SlotContents::Snack(snack),
        }
    }
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

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum SlotContents {
    Empty,
    Snack(Snack),
}

impl<'de> Deserialize<'de> for SlotContents {
    fn deserialize<D>(deserializer: D) -> Result<SlotContents, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = <&str>::deserialize(deserializer)?;
        if s == "E" {
            Ok(SlotContents::Empty)
        } else {
            match Snack::from_str(s) {
                Ok(snack) => Ok(SlotContents::Snack(snack)),
                Err(err) => Err(D::Error::custom(err)),
            }
        }
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

impl Snack {
    fn name(self, time: DateTime) -> &'static str {
        use Snack::*;

        match self {
            IdolHits => "Sunflower Seeds",
            IdolHomers => "Hot Dog",
            IdolStrikeouts => "Chips",
            IdolShutouts => "Burger",
            TeamWin => "Popcorn",
            MaxBet => "Snake Oil",
            TeamLoss => "Stale Popcorn",
            TeamSlush => "Slushie",
            BlackHole => "Wet Pretzel",
            IdolSteal => "Pickles",
            IdolPitcherWin => "Hot Fries",
            IdolPitcherLoss => "Cold Fries",
            IdolHomerAllowed => "Meatball",
            TeamShamed => "Lemonade",
            TeamShaming => "Taffy",
            Breakfast => "Breakfast",
            Sun2 => "Doughnut",
            Incineration => {
                if time >= datetime!(2021-07-25 17:50:00 UTC) {
                    "Melted Sundae"
                } else {
                    "Sundae"
                }
            }
            ConsumerAttacks => "Chum",
            Votes => "Votes",
            Flutes => "Flute",
            StadiumAccess => "Pizza",
            WillsAccess => "Cheese Board",
            ForbiddenKnowledgeAccess => "Apple",
            Beg => "Bread Crumbs",
            Peanuts => "Peanuts",
            TarotReroll => "Tarot Spread",
            RedHerring => "Red Herring",
        }
    }

    fn min(self) -> i64 {
        use Snack::*;

        match self {
            MaxBet | TeamWin | IdolHits | IdolHomers | IdolStrikeouts | IdolShutouts | TeamLoss
            | IdolSteal | BlackHole | TeamSlush | IdolHomerAllowed | Breakfast | Sun2
            | IdolPitcherWin | IdolPitcherLoss | TeamShamed | TeamShaming | Incineration
            | ConsumerAttacks => 0,
            _ => 1,
        }
    }
}

serde_plain::derive_display_from_serialize!(Snack);
serde_plain::derive_fromstr_from_deserialize!(Snack);

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[cfg(test)]
mod tests {
    use super::{SlotContents, Snack, SnackPack};
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
        snacks.set(Snack::Votes, 101);
        assert_eq!(snacks.get(Snack::Votes), Some(101));
        assert_eq!(snacks.get(Snack::Peanuts), None);
        snacks.set(Snack::Peanuts, 1000);
        assert_eq!(snacks.get(Snack::Peanuts), Some(1000));
        assert_eq!(snacks.to_string(), "Votes:101,Peanuts:1000,E,E,E,E,E,E");

        snacks
            .reorder(&[
                SlotContents::Empty,
                SlotContents::Snack(Snack::Votes),
                SlotContents::Empty,
                SlotContents::Snack(Snack::Peanuts),
                SlotContents::Empty,
                SlotContents::Empty,
                SlotContents::Empty,
                SlotContents::Empty,
            ])
            .unwrap();
        assert_eq!(snacks.to_string(), "E,Votes:101,E,Peanuts:1000,E,E,E,E");

        snacks.remove(Snack::Votes);
        assert_eq!(snacks.get(Snack::Votes), None);
        assert_eq!(snacks.to_string(), "E,E,E,Peanuts:1000,E,E,E,E");

        assert_eq!(SlotContents::Empty, serde_json::from_str("\"E\"").unwrap());
        assert_eq!(
            SlotContents::Snack(Snack::Peanuts),
            serde_json::from_str("\"Peanuts\"").unwrap()
        );
        assert!(serde_json::from_str::<SlotContents>("\"fhqwhgads\"").is_err());
    }
}
