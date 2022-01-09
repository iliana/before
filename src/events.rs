use crate::offset::{Offset, OffsetTime};
use crate::stream::{self, Item};
use crate::time::DateTime;
use crate::{Config, Result};
use rocket::futures::StreamExt;
use rocket::response::stream::{Event, EventStream};
use rocket::{get, routes, Route, Shutdown, State};
use serde::Serialize;

#[get("/events/streamData")]
pub(crate) async fn stream_data(
    config: &State<Config>,
    time: OffsetTime,
    offset: Offset,
    shutdown: Shutdown,
) -> Result<EventStream![]> {
    let mut stream = Box::pin(stream::start(config, time, offset, shutdown.clone()).await?);
    Ok(EventStream! {
        while let Some(item) = stream.next().await {
            yield Event::json(&item);
        }
    })
}

// For part of Season 4, the frontend used separate endpoints for the different components of the
// data stream. It also relied on the presence of a `lastUpdateTime` field which we just set to the
// equivalent of `Date.now()`.
#[allow(clippy::semicolon_if_nothing_returned)] // false positive
pub(crate) fn extra_season_4_routes() -> Vec<Route> {
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
                    Box::pin(stream::start(config, time, offset, shutdown.clone()).await?);
                Ok(EventStream! {
                    while let Some(item) = stream.next().await {
                        match item {
                            Item::Start(v) => yield with_last_update(&v.$x),
                            Item::Update(v) => {
                                if let Some(v) = &v.data.value.$x {
                                    yield with_last_update(v);
                                }
                            }
                        }
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

fn with_last_update<T: Serialize>(data: &T) -> Event {
    Event::data(
        serde_json::to_string(data)
            .map(|s| {
                format!(
                    "{{\"value\":{},\"lastUpdateTime\":{}}}}}",
                    &s[0..s.len() - 1],
                    DateTime::now().unix_timestamp_millis()
                )
            })
            .unwrap_or_default(),
    )
}
