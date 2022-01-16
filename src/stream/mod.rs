mod games;
mod leagues;
mod postseason;

use crate::chronicler::{Order, RequestBuilder, Version, Versions};
use crate::config::Config;
use crate::offset::{Offset, OffsetTime};
use crate::stream::{games::Games, leagues::Leagues};
use crate::time::{DateTime, Duration};
use anyhow::Result;
use itertools::Itertools;
use rand::{thread_rng, Rng};
use rocket::futures::Stream;
use rocket::response::stream::stream;
use rocket::Shutdown;
use serde::ser::{SerializeStruct, Serializer};
use serde::{Deserialize, Serialize};
use serde_json::{json, value::RawValue};
use std::collections::{hash_map::DefaultHasher, BTreeMap, HashSet};
use std::hash::{Hash, Hasher};
use std::sync::Arc;
use std::time::Duration as StdDuration;
use tokio::{select, time::sleep, try_join};

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct StreamEvent {
    pub(crate) value: StreamValue,
}

impl StreamEvent {
    pub(crate) fn is_empty(&self) -> bool {
        self.value.games.is_none()
            && self.value.leagues.is_none()
            && self.value.temporal.is_none()
            && self.value.fights.is_none()
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub(crate) struct StreamValue {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) games: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) leagues: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) temporal: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) fights: Option<Box<RawValue>>,
}

pub(crate) type StreamCacheValue = (First, Vec<Arc<Version<StreamEvent>>>);

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

lazy_static::lazy_static! {
    static ref INJECT: BTreeMap<DateTime, StreamValue> =
        serde_json::from_str(include_str!("../../data/inject.json")).unwrap();
}

#[cfg(test)]
#[test]
fn check_inject() {
    assert!(!INJECT.is_empty());
}

async fn start_cold(config: &Config, cache_time: DateTime) -> Result<StreamCacheValue> {
    // A given `StreamEvent` version does not necessarily have all the top-level fields present,
    // but the frontend needs all fields present in the first event to be fully functional. We
    // fetch the previous 25 events, so that we can construct a "first" event to send immediately.
    //
    // We fetch the next 35 events. There is no need to fetch further than a minute (plus the 15
    // second cache bucket window) out, because the frontend (in nearly all season) is hardcoded to
    // close and reopen the stream every 40 seconds... but in particularly contrived cases we might
    // get updates more often than the usual 4 second interval.
    let (past, future): (Versions<StreamEvent>, Versions<StreamEvent>) = try_join!(
        RequestBuilder::v2("versions")
            .ty("Stream")
            .before(cache_time)
            .count(25)
            .order(Order::Desc)
            .json(config),
        RequestBuilder::v2("versions")
            .ty("Stream")
            .after(cache_time)
            .count(35)
            .order(Order::Asc)
            .json(config),
    )?;
    let mut events = past.items;
    events.extend(future.items);

    // Inject events into the stream if defined in data/inject.json. Note that injected events are
    // also checked when rebuilding the temporal object if missing
    if let Some((min, mut max)) = events.iter().map(|v| v.valid_from).minmax().into_option() {
        max += Duration::minutes(1);
        events.extend(INJECT.range(min..=max).map(|(k, v)| Version {
            valid_from: *k,
            entity_id: String::new(),
            data: StreamEvent { value: v.clone() },
        }));
    }

    events.sort_by_key(|v| v.valid_from);

    // Multiple data sources perceive events at different times, even with accurate clocks, due to
    // the nature of blaseball.com's event stream. We can mostly mitigate this effect by deduping
    // the individual components of the stream.
    {
        let mut seen = HashSet::new();
        for event in &mut events {
            macro_rules! dedup {
                ($x:ident) => {
                    event.data.value.$x = if let Some(value) = event.data.value.$x.take() {
                        // Sometimes we perceived empty top-level objects (other than fights)?
                        // This most notably happened after Tillman swapped with Jaylen in Season
                        // 10 (at 2020-10-16T20:06:42.130679Z). These crash frontend, so yank them
                        // out of the stream with the worst hack you've ever seen
                        if stringify!($x) != "fights" && value.get() == "{}" {
                            None
                        }
                        // For being messages, we can sometimes end up in a situation where we
                        // perceive the message being set while epsilon is false, then epsilon is
                        // set true, then set false again to hide. The last message where epsilon
                        // is false will be deduped. As a workaround, don't dedupe any message
                        // where epsilon is false.
                        else if stringify!($x) == "temporal"
                            && read_epsilon(value.get()) == Some(false)
                        {
                            Some(value)
                        } else {
                            let mut hasher = DefaultHasher::new();
                            value.get().hash(&mut hasher);
                            let key = (stringify!($x), hasher.finish());
                            if seen.contains(&key) {
                                None
                            } else {
                                seen.insert(key);
                                Some(value)
                            }
                        }
                    } else {
                        None
                    }
                };
            }

            dedup!(games);
            dedup!(leagues);
            dedup!(temporal);
            dedup!(fights);
        }
    }

    let (mut past, future): (Vec<Version<StreamEvent>>, Vec<Version<StreamEvent>>) = events
        .into_iter()
        .filter(|event| !event.data.is_empty())
        .partition(|event| event.valid_from <= cache_time);
    let first = First {
        games: Arc::new(Games::first(config, &mut past, cache_time).await?),
        leagues: Arc::new(Leagues::first(config, &mut past, cache_time).await?),
        temporal: Arc::from(first_temporal(config, &mut past, cache_time).await?),
        fights: first_fights(&mut past).map(Arc::from),
    };

    let value = (first, future.into_iter().map(Arc::new).collect());
    if let Some(cache) = &config.stream_cache {
        let mut guard = cache.lock().await;
        if !guard.contains(&cache_time) {
            guard.put(cache_time, value.clone());
        }
    }
    Ok(value)
}

pub(crate) async fn start(
    config: &Config,
    time: OffsetTime,
    offset: Offset,
    mut shutdown: Shutdown,
) -> Result<impl Stream<Item = Item> + Send + Sync> {
    let cache_time = time.0.trunc(Duration::seconds(15))?;
    let cached = if let Some(cache) = &config.stream_cache {
        cache.lock().await.get(&cache_time).cloned()
    } else {
        None
    };

    let (first_orig, events) = match cached {
        Some(x) => x,
        None => start_cold(config, cache_time).await?,
    };

    let (past, future): (Vec<_>, Vec<_>) = events
        .into_iter()
        .partition(|event| event.valid_from <= time.0);
    let first = First {
        games: past
            .iter()
            .rev()
            .find_map(|v| v.data.value.games.as_ref().cloned())
            .map_or_else(|| first_orig.games.clone(), |v| Arc::new(Games::Value(v))),
        leagues: past
            .iter()
            .rev()
            .find_map(|v| v.data.value.leagues.as_ref().cloned())
            .map_or_else(
                || first_orig.leagues.clone(),
                |v| Arc::new(Leagues::Value(v)),
            ),
        temporal: past
            .iter()
            .rev()
            .find_map(|v| v.data.value.temporal.as_ref().cloned())
            .map_or_else(|| first_orig.temporal.clone(), Arc::from),
        fights: past
            .iter()
            .rev()
            .find_map(|v| v.data.value.fights.as_ref().cloned())
            .map(Arc::from)
            .or_else(|| first_orig.fights.clone()),
    };

    Ok(stream! {
        yield Item::Start(first);
        for version in future {
            let duration = StdDuration::try_from(version.valid_from - (DateTime::now() - offset.0))
                .unwrap_or_else(|_| StdDuration::from_nanos(0));
            select! {
                _ = sleep(duration) => {},
                _ = &mut shutdown => {},
            }
            yield Item::Update(version);
        }
    })
}

fn read_epsilon(value: &str) -> Option<bool> {
    #[derive(Deserialize)]
    struct Temporal {
        doc: TemporalInner,
    }

    #[derive(Deserialize)]
    struct TemporalInner {
        epsilon: bool,
    }

    Some(serde_json::from_str::<Temporal>(value).ok()?.doc.epsilon)
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

pub(crate) enum Item {
    Start(First),
    Update(Arc<Version<StreamEvent>>),
}

impl Serialize for Item {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            Item::Start(x) => {
                let mut wrapper = serializer.serialize_struct("StreamEvent", 1)?;
                wrapper.serialize_field("value", x)?;
                wrapper.end()
            }
            Item::Update(x) => x.data.serialize(serializer),
        }
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Clone, Serialize)]
pub(crate) struct First {
    pub(crate) games: Arc<Games>,
    pub(crate) leagues: Arc<Leagues>,
    pub(crate) temporal: Arc<RawValue>,
    pub(crate) fights: Option<Arc<RawValue>>,
}

async fn first_temporal(
    config: &Config,
    past: &mut [Version<StreamEvent>],
    time: DateTime,
) -> Result<Box<RawValue>> {
    Ok(
        if let Some(version) = past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.temporal.take())
        {
            version
        } else if let Some(version) = RequestBuilder::v2("entities")
            .ty("Temporal")
            .at(time)
            .json(config)
            .await?
            .items
            .into_iter()
            .next()
        {
            match INJECT
                .range(version.valid_from..=time)
                .filter_map(|(_, v)| v.temporal.clone())
                .rev()
                .next()
            {
                Some(inject) => inject,
                None => version.data,
            }
        } else if let Some(inject) = INJECT
            .range(..=time)
            .filter_map(|(_, v)| v.temporal.clone())
            .rev()
            .next()
        {
            inject
        } else {
            serde_json::from_value(json!({
                "doc": {
                    "id": "whatistime",
                    "alpha": thread_rng().gen_range(1..15),
                    "beta": 1,
                    "gamma": 500_000_000,
                    "delta": true,
                    "epsilon": false,
                    "zeta": "",
                }
            }))?
        },
    )
}

fn first_fights(past: &mut [Version<StreamEvent>]) -> Option<Box<RawValue>> {
    // if there weren't any fights defined in the last 25 events it probably means there's not a
    // boss fight right now
    past.iter_mut()
        .rev()
        .find_map(|v| v.data.value.fights.take())
}
