use crate::time::DateTime;
use crate::Config;
use anyhow::Result;
use derive_builder::Builder;
use reqwest::Response;
use rocket::futures::stream::Stream as StreamTrait;
use rocket::response::stream::stream;
use serde::{Deserialize, Serialize};
use serde_json::value::{RawValue, Value};
use std::collections::HashMap;

#[derive(Debug, Default, Serialize, Builder)]
#[builder(derive(Clone), pattern = "owned")]
pub(crate) struct Request {
    #[builder(setter(into))]
    #[serde(skip)]
    route: String,
    #[builder(default, setter(into, strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    page: Option<String>,
    #[builder(default, setter(strip_option))]
    #[serde(rename = "type", skip_serializing_if = "Option::is_none")]
    ty: Option<&'static str>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    count: Option<usize>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    order: Option<Order>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    id: Option<String>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    at: Option<DateTime>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    after: Option<DateTime>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    before: Option<DateTime>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    started: Option<bool>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    season: Option<i64>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    day: Option<i64>,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    game: Option<String>,
}

impl RequestBuilder {
    pub(crate) fn new<I: Into<String>>(route: I) -> RequestBuilder {
        RequestBuilder::default().route(route)
    }

    pub(crate) async fn send(self, config: &Config) -> Result<Response> {
        let request = self.build()?;
        let url = format!(
            "{}{}?{}",
            config.chronicler_base_url,
            &request.route,
            serde_urlencoded::to_string(&request)?
        );
        log::debug!("chronicler request: {}", url);
        Ok(config.client.get(url).send().await?)
    }

    pub(crate) async fn json<T>(self, config: &Config) -> Result<T>
    where
        for<'de> T: Deserialize<'de>,
    {
        Ok(self.send(config).await?.json().await?)
    }

    pub(crate) fn paged_json<'a, T: 'a>(
        self,
        config: &'a Config,
    ) -> impl StreamTrait<Item = Result<Version<T>>> + 'a
    where
        for<'de> T: Deserialize<'de>,
    {
        stream! {
            let response = self.clone().json::<Versions<T>>(config).await?;
            for item in response.items {
                yield Ok(item);
            }
            let mut next_page = response.next_page;

            while let Some(page) = next_page {
                let response = self.clone().page(page).json::<Versions<T>>(config).await?;
                for item in response.items {
                    yield Ok(item);
                }
                next_page = response.next_page;
            }
        }
    }
}

#[derive(Debug, Copy, Clone, Serialize)]
#[serde(rename_all = "lowercase")]
pub(crate) enum Order {
    Asc,
    Desc,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Data<T> {
    pub(crate) next_page: Option<String>,
    pub(crate) data: Vec<T>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SiteUpdate {
    pub(crate) timestamp: DateTime,
    pub(crate) path: String,
    pub(crate) hash: String,
    pub(crate) download_url: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Versions<T> {
    pub(crate) next_page: Option<String>,
    pub(crate) items: Vec<Version<T>>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Version<T> {
    pub(crate) valid_from: DateTime,
    pub(crate) entity_id: String,
    pub(crate) data: T,
}

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

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct PlayerNameId {
    pub(crate) id: String,
    pub(crate) name: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub(crate) struct OffseasonRecap {
    pub(crate) season: i64,
    // can't use RawValue here due to https://github.com/serde-rs/json/issues/599
    #[serde(flatten)]
    everything_else: HashMap<String, Value>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ChroniclerGame {
    pub(crate) game_id: String,
    pub(crate) start_time: DateTime,
    pub(crate) data: GameDay,
}

// This is (ab)used by crate::old_time::DayMap::update, don't add fields to this :)
#[derive(Debug, PartialEq, Eq, Hash, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct GameDay {
    pub(crate) season: i64,
    #[serde(default = "default_tournament")]
    pub(crate) tournament: i64,
    pub(crate) day: i64,
}

pub(crate) fn default_tournament() -> i64 {
    -1
}

pub(crate) async fn fetch_game(
    config: &Config,
    id: String,
    time: DateTime,
) -> Result<Option<Box<RawValue>>> {
    #[derive(Deserialize)]
    struct Game {
        data: Box<RawValue>,
    }

    Ok(if id.is_empty() {
        None
    } else {
        RequestBuilder::new("v1/games/updates")
            .game(id)
            .order(Order::Desc)
            .before(time)
            .count(1)
            .json::<Data<Game>>(config)
            .await?
            .data
            .into_iter()
            .next()
            .map(|item| item.data)
    })
}
