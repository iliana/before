use crate::chronicler::{Order, RequestBuilder, Stream, Version, Versions};
use crate::time::{Offset, OffsetTime};
use crate::Result;
use chrono::Utc;
use rocket::get;
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::{time::sleep, try_join};
use serde_json::{json, value::RawValue};
use std::time::Duration;

type PastPage = Versions<Stream>;
type Page = Versions<Box<RawValue>>;

fn start_event(before: &PastPage) -> Event {
    Event::json(&json!({
        "value": {
            "games": before
                .items
                .iter()
                .find_map(|v| v.data.value.games.as_ref()),
            "leagues": before
                .items
                .iter()
                .find_map(|v| v.data.value.leagues.as_ref()),
            "temporal": before
                .items
                .iter()
                .find_map(|v| v.data.value.temporal.as_ref()),
            "fights": before
                .items
                .iter()
                .find_map(|v| v.data.value.fights.as_ref()),
        }
    }))
}

async fn next_event(version: Version<Box<RawValue>>, offset: Offset) -> Event {
    let duration = (version.valid_from - (Utc::now() - offset.0))
        .to_std()
        .unwrap_or_else(|_| Duration::from_nanos(0));
    sleep(duration).await;
    Event::json(&version.data)
}

#[get("/events/streamData")]
pub async fn stream_data(time: OffsetTime, offset: Offset) -> Result<EventStream![]> {
    // A given `Stream` version does not necessarily have all the top-level fields present, but the
    // frontend needs all fields present in the first event. While we fetch the next 15 events, we
    // also fetch the previous 15, allowing us to find the most recent definition of each field and
    // send it as the first event to the stream.
    //
    // There is no need to continue fetching additional pages because frontend is hardcoded to
    // close and reopen the stream every 40 seconds... :(
    //
    // `EventStream` cannot handle errors, so we start by making the two requests we need and
    // propagating their errors before the stream starts.
    let (before, after): (PastPage, Page) = try_join!(
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .before(time.0)
            .count(15)
            .order(Order::Descending)
            .json(),
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .after(time.0)
            .count(15)
            .order(Order::Ascending)
            .json(),
    )
    .map_err(rocket::response::Debug)?;
    Ok(EventStream! {
        yield start_event(&before);
        for version in after.items {
            yield next_event(version, offset).await;
        }
    })
}
