// /////////////////////////////////////// //
//                                         //
//   ABANDON ALL HOPE, YE WHO ENTER HERE   //
//                                         //
// /////////////////////////////////////// //

use crate::chronicler::{
    fetch_game, ChroniclerGame, Data, Order, RequestBuilder, Stream, StreamValue, Version, Versions,
};
use crate::database::{fetch, fix_id};
use crate::postseason::{postseason, Postseason};
use crate::time::{Offset, OffsetTime};
use crate::{Config, Result};
use chrono::{DateTime, Duration, DurationRound, Utc};
use either::{Either, Left, Right};
use itertools::Itertools;
use rand::{thread_rng, Rng};
use rocket::futures::{future::try_join_all, FutureExt, Stream as StreamTrait, StreamExt};
use rocket::response::stream::{stream, Event, EventStream};
use rocket::tokio::sync::Mutex;
use rocket::tokio::{select, time::sleep, try_join};
use rocket::{get, post, routes, Route, Shutdown, State};
use serde::{Deserialize, Serialize, Serializer};
use serde_json::{json, value::RawValue, Value};
use std::borrow::Borrow;
use std::collections::hash_map::DefaultHasher;
use std::collections::{BTreeMap, HashMap, HashSet, VecDeque};
use std::hash::{Hash, Hasher};
use std::pin::Pin;
use std::sync::Arc;
use std::time::{Duration as StdDuration, Instant};

lazy_static::lazy_static! {
    static ref INJECT: BTreeMap<DateTime<Utc>, StreamValue> =
        serde_json::from_str(include_str!("../data/inject.json")).unwrap();
}

pub(crate) type StreamCacheValue = (First, Vec<Arc<Version<Stream>>>);

async fn build_stream(
    config: &Config,
    time: OffsetTime,
    offset: Offset,
    mut shutdown: Shutdown,
) -> anyhow::Result<impl StreamTrait<Item = MetaStream> + Send + Sync> {
    #[derive(Deserialize)]
    struct Temporal {
        doc: TemporalInner,
    }

    #[derive(Deserialize)]
    struct TemporalInner {
        epsilon: bool,
    }

    let cache_time = time.0.duration_trunc(Duration::seconds(30))?;
    let cached = if let Some(cache) = &config.stream_cache {
        cache.lock().await.get(&cache_time).cloned()
    } else {
        None
    };

    let (first_orig, events) = if let Some(x) = cached {
        x
    } else {
        // A given `Stream` version does not necessarily have all the top-level fields present, but
        // the frontend needs all fields present in the first event to be fully functional. We
        // fetch the next and previous 25 events, so that we can construct a "first" event to send
        // immediately.
        //
        // There is no need to fetch further than a minute out, because the frontend is hardcoded
        // to close and reopen the stream every 40 seconds...
        //
        // `EventStream` cannot handle errors, so we start by making the two requests we need and
        // propagating their errors before the stream starts.
        let (past, future): (Versions<Stream>, Versions<Stream>) = try_join!(
            RequestBuilder::new("v2/versions")
                .ty("Stream")
                .before(cache_time)
                .count(25)
                .order(Order::Desc)
                .json(config),
            RequestBuilder::new("v2/versions")
                .ty("Stream")
                .after(cache_time)
                .count(25)
                .order(Order::Asc)
                .json(config),
        )?;
        let mut events = past.items;
        events.extend(future.items);

        // Inject events into the stream if defined in data/inject.json. Note that injected events
        // are also checked when rebuilding the temporal object if missing
        if let Some((min, mut max)) = events.iter().map(|v| v.valid_from).minmax().into_option() {
            max = max + Duration::minutes(1);
            events.extend(INJECT.range(min..=max).map(|(k, v)| Version {
                valid_from: *k,
                entity_id: String::new(),
                data: Stream { value: v.clone() },
            }));
        }

        events.sort_by_key(|v| v.valid_from);

        // Multiple data sources perceive events at different times, even with accurate clocks, due
        // to the nature of blaseball.com's event stream. We can mostly mitigate this effect by
        // deduping the individual components of the stream.
        {
            let mut seen = HashSet::new();
            for event in &mut events {
                macro_rules! dedup {
                    ($x:ident) => {{
                        event.data.value.$x = if let Some(value) = event.data.value.$x.take() {
                            let epsilon = if stringify!($x) == "temporal" {
                                serde_json::from_str::<Temporal>(value.get())
                                    .ok()
                                    .map(|t| t.doc.epsilon)
                            } else {
                                None
                            };

                            // Sometimes we perceived empty top-level objects (other than fights)?
                            // This most notably happened after Tillman swapped with Jaylen in
                            // Season 10 (at 2020-10-16T20:06:42.130679Z). These crash frontend, so
                            // yank them out of the stream with the worst hack you've ever seen
                            if stringify!($x) != "fights" && value.get() == "{}" {
                                None
                            }
                            // For "please wait..." messages, we can sometimes end up in a
                            // situation where we perceive the message being set while epsilon is
                            // false, then epsilon is set true, then set false again to hide. The
                            // last message where epsilon is false will be deduped. As a
                            // workaround, don't dedupe any message where epsilon is false.
                            else if epsilon == Some(false) {
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
                        };
                    }};
                }

                dedup!(games);
                dedup!(leagues);
                dedup!(temporal);
                dedup!(fights);
            }
        }

        let (mut past, future): (Vec<Version<Stream>>, Vec<Version<Stream>>) = events
            .into_iter()
            .filter(|event| !event.data.is_empty())
            .partition(|event| event.valid_from <= cache_time);
        let first = First {
            games: Arc::new(first_games(config, &mut past, cache_time).await?),
            leagues: Arc::new(first_leagues(config, &mut past, cache_time).await?),
            temporal: Arc::from(first_temporal(config, &mut past, cache_time).await?),
            fights: Arc::new(first_fights(&mut past)),
        };

        let value = (first, future.into_iter().map(Arc::new).collect());
        if let Some(cache) = &config.stream_cache {
            let mut guard = cache.lock().await;
            if !guard.contains(&cache_time) {
                guard.put(cache_time, value.clone());
            }
            drop(guard)
        }
        value
    };

    let (past, future): (Vec<_>, Vec<_>) = events
        .into_iter()
        .partition(|event| event.valid_from <= time.0);
    let first = ValueWrapper {
        value: First {
            games: past
                .iter()
                .rev()
                .find_map(|v| v.data.value.games.as_ref().cloned())
                .map(|v| Arc::new(Games { value: Left(v) }))
                .unwrap_or_else(|| first_orig.games.clone()),
            leagues: past
                .iter()
                .rev()
                .find_map(|v| v.data.value.leagues.as_ref().cloned())
                .map(|v| Arc::new(Leagues { value: Left(v) }))
                .unwrap_or_else(|| first_orig.leagues.clone()),
            temporal: past
                .iter()
                .rev()
                .find_map(|v| v.data.value.temporal.as_ref().cloned())
                .map(Arc::from)
                .unwrap_or_else(|| first_orig.temporal.clone()),
            fights: past
                .iter()
                .rev()
                .find_map(|v| v.data.value.fights.as_ref().cloned())
                .map(|v| Arc::new(Fights { value: Left(v) }))
                .unwrap_or_else(|| first_orig.fights.clone()),
        },
    };

    Ok(stream! {
        yield MetaStream::First(first);
        for version in future {
            let duration = (version.valid_from - (Utc::now() - offset.0))
                .to_std()
                .unwrap_or_else(|_| StdDuration::from_nanos(0));
            select! {
                _ = sleep(duration) => {},
                _ = &mut shutdown => {},
            }
            yield MetaStream::Firsnt(version);
        }
    })
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[get("/events/streamData")]
pub(crate) async fn stream_data(
    config: &State<Config>,
    time: OffsetTime,
    offset: Offset,
    shutdown: Shutdown,
) -> Result<EventStream![]> {
    let mut stream = Box::pin(build_stream(config, time, offset, shutdown.clone()).await?);
    Ok(EventStream! {
        while let Some(item) = stream.next().await {
            yield Event::json(&item);
        }
        // We can potentially run out of elements if they're all duplicates. Sleep it off so the
        // client doesn't reconnect.
        select! {
            _ = sleep(StdDuration::from_secs(40)) => {},
            _ = shutdown => {},
        }
    })
}

// i am being punished for my hubris
enum MetaStream {
    First(ValueWrapper<First>),
    Firsnt(Arc<Version<Stream>>),
}

impl Serialize for MetaStream {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            MetaStream::First(x) => x.serialize(serializer),
            MetaStream::Firsnt(x) => x.data.serialize(serializer),
        }
    }
}

// For part of Season 4, the frontend used separate endpoints for the different components of the
// data stream. It also relied on the presence of a `lastUpdateTime` field which we just set to the
// equivalent of `Date.now()`.
pub(crate) fn extra_season_4_routes() -> Vec<Route> {
    fn add_last_update_time<T: Serialize>(data: &T) -> Value {
        let mut value = serde_json::to_value(data).unwrap();
        if let Some(object) = value.as_object_mut() {
            object.insert(
                "lastUpdateTime".to_string(),
                Utc::now().timestamp_millis().into(),
            );
        }
        value
    }

    macro_rules! implnt {
        ($x:ident, $uri:expr) => {{
            #[get($uri)]
            pub(crate) async fn stream_individual(
                config: &State<Config>,
                time: OffsetTime,
                offset: Offset,
                shutdown: Shutdown,
            ) -> Result<EventStream![]> {
                let mut stream =
                    Box::pin(build_stream(config, time, offset, shutdown.clone()).await?);
                Ok(EventStream! {
                    while let Some(item) = stream.next().await {
                        match item {
                            MetaStream::First(v) => yield Event::json(&ValueWrapper {
                                value: add_last_update_time(&v.value.$x),
                            }),
                            MetaStream::Firsnt(v) => {
                                if let Some(v) = &v.data.value.$x {
                                    yield Event::json(&ValueWrapper {
                                        value: add_last_update_time(v),
                                    });
                                }
                            }
                        }
                    }
                    // We can potentially run out of elements if they're all duplicates. Sleep it
                    // off so the client doesn't reconnect.
                    select! {
                        _ = sleep(StdDuration::from_secs(40)) => {},
                        _ = shutdown => {},
                    }
                })
            }

            routes![stream_individual]
        }};
    }

    vec![
        implnt!(games, "/events/streamGameData"),
        implnt!(leagues, "/events/streamLeagueData"),
        implnt!(temporal, "/events/streamTemporalData"),
    ]
    .concat()
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

// In the Bigger Machines Era (seasons 1-3), the game used socket.io. We've patched the frontend
// code to only use polling, and these functions implement the protocol.

// Look on my Types, ye Mighty, and despair!
type Ozymandias = (
    VecDeque<String>,
    Pin<Box<dyn StreamTrait<Item = MetaStream> + Send + Sync>>,
);

lazy_static::lazy_static! {
    static ref SESSIONS: Mutex<TimedCache<u64, Ozymandias>> = Mutex::new(TimedCache::new());
}

pub(crate) async fn remove_expired_sessions() {
    SESSIONS
        .lock()
        .await
        .remove_expired(StdDuration::from_secs(15 * 60));
}

fn eio_payload<T: Serialize>(value: &T) -> anyhow::Result<String> {
    let payload = format!("42{}", serde_json::to_string(&value)?);
    Ok(format!("{}:{}", payload.encode_utf16().count(), payload))
}

impl MetaStream {
    fn into_eio(self) -> anyhow::Result<Vec<String>> {
        match self {
            MetaStream::First(v) => Ok(vec![
                eio_payload(&("gameDataUpdate", &v.value.games))?,
                eio_payload(&("leagueDataUpdate", &v.value.leagues))?,
                eio_payload(&("temporalDataUpdate", &v.value.temporal))?,
            ]),
            MetaStream::Firsnt(v) => vec![
                ("gameDataUpdate", &v.data.value.games),
                ("leagueDataUpdate", &v.data.value.leagues),
                ("temporalDataUpdate", &v.data.value.temporal),
            ]
            .into_iter()
            .filter_map(|(k, v)| v.as_ref().map(|v| eio_payload(&(k, v))))
            .collect(),
        }
    }
}

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

        if let Some((mut to_send, mut stream)) = value {
            let message = if let Some(send_me) = to_send.pop_front() {
                send_me
            } else {
                match select! {
                    v = stream.next() => Some(v),
                    _ = sleep(StdDuration::from_secs(15)) => None,
                } {
                    Some(Some(v)) => {
                        to_send.extend(v.into_eio()?);
                        match to_send.pop_front() {
                            Some(v) => v,
                            None => eio_payload(&())?,
                        }
                    }
                    Some(None) => {
                        stream = Box::pin(build_stream(config, time, offset, shutdown).await?);
                        eio_payload(&())?
                    }
                    None => eio_payload(&())?,
                }
            };

            SESSIONS.lock().await.insert(sid, (to_send, stream));
            return Ok(message);
        }
    }

    let new_sid: u64 = thread_rng().gen();
    SESSIONS.lock().await.insert(
        new_sid,
        (
            VecDeque::new(),
            Box::pin(build_stream(config, time, offset, shutdown).await?),
        ),
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

#[derive(Debug, Clone)]
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

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Serialize)]
struct ValueWrapper<T> {
    value: T,
}

#[derive(Debug, Clone, Serialize)]
pub(crate) struct First {
    games: Arc<Games>,
    leagues: Arc<Leagues>,
    temporal: Arc<RawValue>,
    fights: Arc<Fights>,
}

#[derive(Debug, Serialize)]
#[serde(transparent)]
struct Games {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, GamesInner>,
}

#[derive(Debug, Default, Serialize)]
#[serde(rename_all = "camelCase")]
struct GamesInner {
    schedule: Vec<Box<RawValue>>,
    tomorrow_schedule: Vec<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    sim: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    season: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    standings: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    postseason: Option<Postseason>,
    #[serde(skip_serializing_if = "Option::is_none")]
    postseasons: Option<Vec<Postseason>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    tournament: Option<Box<RawValue>>,
}

async fn first_games(
    config: &Config,
    past: &mut [Version<Stream>],
    time: DateTime<Utc>,
) -> anyhow::Result<Games> {
    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct Sim {
        season: i64,
        #[serde(default = "crate::chronicler::default_tournament")]
        tournament: i64,
        day: i64,
        season_id: String,
        #[serde(with = "either::serde_untagged")]
        playoffs: Either<String, Vec<String>>,
        #[serde(default = "crate::chronicler::default_tournament")]
        play_off_round: i64,
        #[serde(default = "crate::chronicler::default_tournament")]
        tournament_round: i64,
    }

    #[derive(Deserialize)]
    struct Season {
        standings: String,
    }

    #[derive(Deserialize)]
    struct Tournament {
        index: i64,
        playoffs: String,
    }

    async fn fetch_game_ids(
        config: &Config,
        season: i64,
        tournament: i64,
        day: i64,
    ) -> anyhow::Result<Vec<String>> {
        Ok(RequestBuilder::new("v1/games")
            .season(if tournament == -1 { season } else { -1 })
            .day(day)
            .json::<Data<ChroniclerGame>>(config)
            .await?
            .data
            .into_iter()
            .filter_map(|game| {
                if tournament == -1 {
                    Some(game.game_id)
                } else {
                    (game.data.tournament == tournament).then(|| game.game_id)
                }
            })
            .collect())
    }

    Ok(Games {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.games.take())
        {
            Some(v) => Left(v),
            None => {
                let mut games = GamesInner {
                    sim: fetch(config, "Sim", None, time).await?.next(),
                    ..Default::default()
                };
                let mut tournament_playoffs = None;

                if let Some(ref sim) = games.sim {
                    let sim: Sim = serde_json::from_str(sim.get())?;

                    if !config.chronplete {
                        let (today_ids, tomorrow_ids) = try_join!(
                            fetch_game_ids(config, sim.season, sim.tournament, sim.day),
                            fetch_game_ids(config, sim.season, sim.tournament, sim.day + 1),
                        )?;
                        let (today, tomorrow): (Vec<_>, Vec<_>) =
                            try_join_all(today_ids.iter().chain(&tomorrow_ids).map(|id| {
                                fetch_game(config, id.clone(), time)
                                    .map(move |game| game.map(|game| (id, game)))
                            }))
                            .await?
                            .into_iter()
                            .filter_map(|(id, game)| game.map(|game| (id, game)))
                            .partition(|(id, _)| today_ids.contains(id));
                        games.schedule = today.into_iter().map(|(_, game)| game).collect();
                        games.tomorrow_schedule =
                            tomorrow.into_iter().map(|(_, game)| game).collect();
                    }

                    if sim.tournament != -1 {
                        games.tournament =
                            fetch(config, "Tournament", None, time)
                                .await?
                                .find(|tournament| {
                                    if let Ok(tournament) =
                                        serde_json::from_str::<Tournament>(tournament.get())
                                    {
                                        if tournament.index == sim.tournament {
                                            tournament_playoffs = Some(tournament.playoffs);
                                            true
                                        } else {
                                            false
                                        }
                                    } else {
                                        false
                                    }
                                })
                    }

                    if let Some(playoffs) = tournament_playoffs {
                        games.postseason =
                            postseason(config, playoffs, sim.season, sim.tournament_round, time)
                                .await?;
                    } else {
                        match sim.playoffs {
                            Left(id) => {
                                games.postseason =
                                    postseason(config, id, sim.season, sim.play_off_round, time)
                                        .await?;
                            }
                            Right(ref ids) => {
                                games.postseasons = Some(
                                    try_join_all(ids.iter().map(|id| {
                                        postseason(
                                            config,
                                            id.to_string(),
                                            sim.season,
                                            sim.play_off_round,
                                            time,
                                        )
                                    }))
                                    .await?
                                    .into_iter()
                                    .flatten()
                                    .collect(),
                                );
                            }
                        }
                    }

                    games.season = fetch(config, "Season", Some(sim.season_id), time)
                        .await?
                        .next();
                }

                if let Some(ref season) = games.season {
                    let season: Season = serde_json::from_str(season.get())?;

                    games.standings = fetch(config, "Standings", Some(season.standings), time)
                        .await?
                        .next();
                }

                Right(games)
            }
        },
    })
}

#[derive(Debug, Serialize)]
#[serde(transparent)]
struct Leagues {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, LeaguesInner>,
}

#[derive(Debug, Serialize)]
struct LeaguesInner {
    leagues: Vec<Box<RawValue>>,
    stadiums: Vec<Box<RawValue>>,
    subleagues: Vec<Box<RawValue>>,
    divisions: Vec<Box<RawValue>>,
    teams: Vec<Box<RawValue>>,
    tiebreakers: Vec<Box<RawValue>>,
    stats: LeaguesStats,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct LeaguesStats {
    #[serde(skip_serializing_if = "Option::is_none")]
    community_chest: Option<Box<RawValue>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    sunsun: Option<Box<RawValue>>,
}

async fn first_leagues(
    config: &Config,
    past: &mut [Version<Stream>],
    time: DateTime<Utc>,
) -> anyhow::Result<Leagues> {
    lazy_static::lazy_static! {
        static ref LEAGUES_START: DateTime<Utc> = "2020-09-03T21:40:38.266Z".parse().unwrap();
        static ref TIEBREAKERS_START: DateTime<Utc> = "2020-09-10T17:51:30.577Z".parse().unwrap();
    }

    Ok(Leagues {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.leagues.take())
        {
            Some(v) => Left(v),
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
                    fetch(config, "League", None, std::cmp::max(time, *LEAGUES_START)),
                    fetch(config, "Stadium", None, time),
                    fetch(
                        config,
                        "Subleague",
                        None,
                        std::cmp::max(time, *LEAGUES_START)
                    ),
                    fetch(
                        config,
                        "Division",
                        None,
                        std::cmp::max(time, *LEAGUES_START)
                    ),
                    fetch(config, "Team", None, time),
                    fetch(
                        config,
                        "Tiebreakers",
                        None,
                        std::cmp::max(time, *TIEBREAKERS_START)
                    ),
                    fetch(config, "CommunityChestProgress", None, time),
                    fetch(config, "SunSun", None, time),
                )?;
                Right(LeaguesInner {
                    leagues: leagues
                        .map(|v| fix_id(v, time))
                        .collect::<anyhow::Result<_>>()?,
                    stadiums: stadiums.collect(),
                    subleagues: subleagues
                        .map(|v| fix_id(v, time))
                        .collect::<anyhow::Result<_>>()?,
                    divisions: divisions
                        .map(|v| fix_id(v, time))
                        .collect::<anyhow::Result<_>>()?,
                    teams: teams
                        .map(|v| fix_id(v, time))
                        .collect::<anyhow::Result<_>>()?,
                    tiebreakers: tiebreakers.collect(),
                    stats: LeaguesStats {
                        community_chest: community_chest.next(),
                        sunsun: sunsun.next(),
                    },
                })
            }
        },
    })
}

async fn first_temporal(
    config: &Config,
    past: &mut [Version<Stream>],
    time: DateTime<Utc>,
) -> anyhow::Result<Box<RawValue>> {
    lazy_static::lazy_static! {
        static ref UNCERTAINTY: DateTime<Utc> = "2020-08-03T22:11:18.931Z".parse().unwrap();
        static ref GET_YOUR_PEANUTS: DateTime<Utc> = "2020-08-08T21:36:03.844Z".parse().unwrap();
        static ref CHRONICLER_TEMPORAL_START: DateTime<Utc> =
            "2020-09-03T21:40:38.266Z".parse().unwrap();
    }

    Ok(
        if let Some(version) = past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.temporal.take())
        {
            version
        } else if let Some(version) = RequestBuilder::new("v2/entities")
            .ty("Temporal")
            .at(time)
            .json::<Versions<Box<RawValue>>>(config)
            .await?
            .items
            .into_iter()
            .next()
        {
            if let Some(inject) = INJECT
                .range(version.valid_from..=time)
                .filter_map(|(_, v)| v.temporal.clone())
                .rev()
                .next()
            {
                inject
            } else {
                version.data
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
                    "gamma": 500000000,
                    "delta": true,
                    "epsilon": false,
                    "zeta": "",
                }
            }))?
        },
    )
}

#[derive(Debug, Serialize)]
#[serde(transparent)]
struct Fights {
    #[serde(with = "either::serde_untagged")]
    value: Either<Box<RawValue>, HashMap<String, Value>>,
}

fn first_fights(past: &mut [Version<Stream>]) -> Fights {
    // if there weren't any fights defined in the last 25 events it probably means there's not a
    // boss fight right now
    Fights {
        value: match past
            .iter_mut()
            .rev()
            .find_map(|v| v.data.value.fights.take())
        {
            Some(v) => Left(v),
            None => Right(HashMap::new()),
        },
    }
}
