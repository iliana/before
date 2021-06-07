use crate::chronicler::{Order, RequestBuilder, Stream, StreamValue, Version, Versions};
use crate::time::{Offset, OffsetTime};
use anyhow::Result;
use chrono::Utc;
use rocket::get;
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::{time::sleep, try_join};
use serde_json::value::RawValue;
use std::time::Duration;

type PastPage = Versions<Stream>;
type Page = Versions<Box<RawValue>>;

fn start_event(before: &PastPage) -> Event {
    Event::json(&Stream {
        value: StreamValue {
            games: before
                .items
                .iter()
                .find_map(|v| v.data.value.games.as_ref().cloned()),
            leagues: before
                .items
                .iter()
                .find_map(|v| v.data.value.leagues.as_ref().cloned()),
            temporal: before
                .items
                .iter()
                .find_map(|v| v.data.value.temporal.as_ref().cloned()),
            fights: before
                .items
                .iter()
                .find_map(|v| v.data.value.fights.as_ref().cloned()),
        },
    })
}

async fn next_event(version: &Version<Box<RawValue>>, offset: Offset) -> Event {
    let duration = (version.valid_from - (Utc::now() - offset.0))
        .to_std()
        .unwrap_or_else(|_| Duration::from_nanos(0));
    sleep(duration).await;
    Event::json(&version.data)
}

async fn next_page(page: &Page) -> Option<Page> {
    if page.items.is_empty() {
        sleep(Duration::from_secs(45)).await;
    }
    let next_page = page.next_page.as_ref()?;
    match RequestBuilder::new("v2/versions")
        .ty("Stream")
        .page(next_page)
        .count(50)
        .order(Order::Ascending)
        .json()
        .await
    {
        Ok(p) => Some(p),
        Err(err) => {
            log::error!(
                "{:?}",
                err.context("failed to fetch next page of v2/versions")
            );
            None
        }
    }
}

async fn stream_data_inner(time: OffsetTime, offset: Offset) -> Result<EventStream![]> {
    // A given `Stream` version does not necessarily have all the top-level fields present, but the
    // frontend needs all fields present in the first event. While we fetch the next 50 events, we
    // also fetch the previous 25, allowing us to find the most recent definition of each field and
    // send it as the first event to the stream.
    //
    // `EventStream` cannot handle errors, so we start by making the two requests we need and
    // propagating their errors before the stream starts. If future requests fail, end the stream.
    let (before, mut page): (PastPage, Page) = try_join!(
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .before(time.0)
            .count(25)
            .order(Order::Descending)
            .json(),
        RequestBuilder::new("v2/versions")
            .ty("Stream")
            .after(time.0)
            .count(50)
            .order(Order::Ascending)
            .json(),
    )?;
    Ok(EventStream! {
        yield start_event(&before);
        loop {
            for version in &page.items {
                yield next_event(version, offset).await;
            }
            page = match next_page(&page).await {
                Some(page) => page,
                None => break,
            }
        }
    })
}

#[get("/events/streamData")]
pub async fn stream_data(time: OffsetTime, offset: Offset) -> crate::Result<EventStream![]> {
    stream_data_inner(time, offset)
        .await
        .map_err(rocket::response::Debug)
}
