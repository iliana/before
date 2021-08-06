use crate::chronicler::{Order, RequestBuilder, Stream, Version, Versions};
use crate::time::{Offset, OffsetTime};
use crate::Result;
use chrono::Utc;
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::{select, time::sleep, try_join};
use rocket::{get, Shutdown};
use serde_json::json;
use std::collections::hash_map::DefaultHasher;
use std::collections::HashSet;
use std::hash::{Hash, Hasher};

async fn next_event(version: Version<Stream>, offset: Offset) -> Event {
    let duration = (version.valid_from - (Utc::now() - offset.0))
        .to_std()
        .unwrap_or_else(|_| std::time::Duration::from_nanos(0));
    sleep(duration).await;
    Event::json(&version.data)
}

#[get("/events/streamData")]
pub async fn stream_data(
    time: OffsetTime,
    offset: Offset,
    mut shutdown: Shutdown,
) -> Result<EventStream![]> {
    // A given `Stream` version does not necessarily have all the top-level fields present, but the
    // frontend needs all fields present in the first event to be fully functional. We fetch the
    // next and previous 15 events, so that we can construct a "first" event to send immediately.
    //
    // There is no need to fetch further than a minute out, because the frontend is hardcoded to
    // close and reopen the stream every 40 seconds...
    //
    // `EventStream` cannot handle errors, so we start by making the two requests we need and
    // propagating their errors before the stream starts.
    let (past, future): (Versions<Stream>, Versions<Stream>) = try_join!(
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .before(time.0)
            .count(15)
            .order(Order::Desc)
            .json(),
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .after(time.0)
            .count(15)
            .order(Order::Asc)
            .json(),
    )?;
    let mut events = past.items;
    events.reverse();
    events.extend(future.items);

    // Multiple data sources perceive events at different times, even with accurate clocks, due to
    // the nature of blaseball.com's event stream. We can mostly mitigate this effect by deduping
    // the individual components of the stream.
    {
        let mut seen = HashSet::new();
        for event in &mut events {
            macro_rules! dedup {
                ($x:ident) => {{
                    event.data.value.$x = if let Some(value) = event.data.value.$x.take() {
                        let mut hasher = DefaultHasher::new();
                        value.get().hash(&mut hasher);
                        let key = (stringify!($x), hasher.finish());
                        if seen.contains(&key) {
                            None
                        } else {
                            seen.insert(key);
                            Some(value)
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

    let (past, future): (Vec<Version<Stream>>, Vec<Version<Stream>>) = events
        .into_iter()
        .filter(|event| !event.data.is_empty())
        .partition(|event| event.valid_from <= time.0);
    let first_event = json!({
        "value": {
            "games": past
                .iter()
                .rev()
                .find_map(|v| v.data.value.games.as_ref()),
            "leagues": past
                .iter()
                .rev()
                .find_map(|v| v.data.value.leagues.as_ref()),
            "temporal": past
                .iter()
                .rev()
                .find_map(|v| v.data.value.temporal.as_ref()),
            "fights": past
                .iter()
                .rev()
                .find_map(|v| v.data.value.fights.as_ref()),
        }
    });

    Ok(EventStream! {
        yield Event::json(&first_event);
        for version in future {
            select! {
                event = next_event(version, offset) => yield event,
                _ = &mut shutdown => break,
            };
        }
    })
}
