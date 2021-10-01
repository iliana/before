//! In the Bigger Machines Era (seasons 1-3), the game used socket.io. We've patched the frontend
//! code to only use polling, and these functions implement the protocol.

use crate::config::Config;
use crate::offset::{Offset, OffsetTime};
use crate::stream::{self, Item};
use crate::Result;
use rand::{thread_rng, Rng};
use rocket::futures::{Stream, StreamExt};
use rocket::tokio::{select, sync::Mutex, time::sleep};
use rocket::{get, post, Shutdown, State};
use serde::Serialize;
use serde_json::json;
use std::borrow::Borrow;
use std::collections::{HashMap, VecDeque};
use std::hash::Hash;
use std::pin::Pin;
use std::time::{Duration as StdDuration, Instant};

#[get("/socket.io?<sid>")]
pub(crate) async fn socket_io(
    config: &State<Config>,
    sid: Option<u64>,
    time: OffsetTime,
    offset: Offset,
    shutdown: Shutdown,
) -> Result<String> {
    if let Some(sid) = sid {
        let mut guard = SESSIONS.lock().await;
        let value = guard.remove(&sid);
        drop(guard);

        if let Some(mut session) = value {
            let message = if let Some(next) = session.serialized.pop_front() {
                next
            } else {
                match select! {
                    v = session.stream.next() => Some(v),
                    _ = sleep(StdDuration::from_secs(15)) => None,
                } {
                    Some(Some(v)) => {
                        session.serialized.extend(v.into_eio()?);
                        match session.serialized.pop_front() {
                            Some(v) => v,
                            None => eio_payload(&())?,
                        }
                    }
                    Some(None) => {
                        session.stream =
                            Box::pin(stream::start(config, time, offset, shutdown).await?);
                        eio_payload(&())?
                    }
                    None => eio_payload(&())?,
                }
            };

            SESSIONS.lock().await.insert(sid, session);
            return Ok(message);
        }
    }

    let new_sid: u64 = thread_rng().gen();
    SESSIONS.lock().await.insert(
        new_sid,
        Session {
            serialized: VecDeque::new(),
            stream: Box::pin(stream::start(config, time, offset, shutdown).await?),
        },
    );
    let payload = format!(
        "0{}",
        json!({
            "sid": new_sid.to_string(),
            "upgrades": [],
            "pingInterval": 25000,
            "pingTimeout": 5000,
        })
    );
    Ok(format!(
        "{}:{}2:40",
        payload.encode_utf16().count(),
        payload
    ))
}

#[post("/socket.io?<sid>", data = "<data>")]
pub(crate) async fn socket_io_post(sid: Option<u64>, data: &[u8]) -> &'static str {
    if data == b"1:1" {
        if let Some(sid) = sid {
            SESSIONS.lock().await.remove(&sid);
        }
    }
    "ok"
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

impl Item {
    fn into_eio(self) -> anyhow::Result<Vec<String>> {
        match self {
            Item::Start(first) => Ok(vec![
                eio_payload(&("gameDataUpdate", &first.games))?,
                eio_payload(&("leagueDataUpdate", &first.leagues))?,
                eio_payload(&("temporalDataUpdate", &first.temporal))?,
            ]),
            Item::Update(value) => vec![
                ("gameDataUpdate", &value.data.value.games),
                ("leagueDataUpdate", &value.data.value.leagues),
                ("temporalDataUpdate", &value.data.value.temporal),
            ]
            .into_iter()
            .filter_map(|(k, v)| v.as_ref().map(|v| eio_payload(&(k, v))))
            .collect(),
        }
    }
}

fn eio_payload<T: Serialize>(value: &T) -> anyhow::Result<String> {
    let payload = format!("42{}", serde_json::to_string(&value)?);
    Ok(format!("{}:{}", payload.encode_utf16().count(), payload))
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

lazy_static::lazy_static! {
    static ref SESSIONS: Mutex<TimedCache<u64, Session>> = Mutex::new(TimedCache::new());
}

struct Session {
    serialized: VecDeque<String>,
    stream: Pin<Box<dyn Stream<Item = Item> + Send + Sync>>,
}

pub(crate) async fn remove_expired_sessions() {
    SESSIONS
        .lock()
        .await
        .remove_expired(StdDuration::from_secs(15 * 60));
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Default)]
struct TimedCache<K, V> {
    inner: HashMap<K, (Instant, V)>,
}

impl<K: Eq + Hash, V> TimedCache<K, V> {
    fn new() -> Self {
        TimedCache {
            inner: HashMap::new(),
        }
    }

    fn insert(&mut self, key: K, value: V) -> Option<V> {
        self.inner.insert(key, (Instant::now(), value)).map(|v| v.1)
    }

    fn remove<Q>(&mut self, key: &Q) -> Option<V>
    where
        K: Borrow<Q>,
        Q: Hash + Eq,
    {
        self.inner.remove(key).map(|v| v.1)
    }

    fn remove_expired(&mut self, deadline: StdDuration) {
        let now = Instant::now();
        self.inner.retain(|_, (time, _)| now - *time <= deadline);
    }
}
