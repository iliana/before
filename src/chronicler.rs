use crate::time::{datetime, DateTime};
use crate::Config;
use anyhow::Result;
use derive_builder::Builder;
use rocket::futures::stream::Stream as StreamTrait;
use rocket::response::stream::stream;
use serde::{Deserialize, Serialize};
use serde_json::value::RawValue;
use std::marker::PhantomData;

pub(crate) fn fix_id(v: Box<RawValue>, time: DateTime) -> anyhow::Result<Box<RawValue>> {
    const ID_EPOCH: DateTime = datetime!(2020-08-23 23:23:00 UTC);

    Ok(if time < ID_EPOCH && v.get().contains(r#""id":"#) {
        RawValue::from_string(v.get().replace(r#""id":"#, r#""_id":"#))?
    } else if time >= ID_EPOCH && v.get().contains(r#""_id":"#) {
        RawValue::from_string(v.get().replace(r#""_id":"#, r#""id":"#))?
    } else {
        v
    })
}

pub(crate) fn default_tournament() -> i64 {
    -1
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

pub(crate) trait ApiVersion: Clone {
    type Format;
    const VERSION: &'static str;
}

#[derive(Debug, Copy)]
pub(crate) struct V1<T>(PhantomData<T>);

impl<T> Clone for V1<T> {
    fn clone(&self) -> V1<T> {
        V1(PhantomData)
    }
}

impl<T> ApiVersion for V1<T> {
    type Format = Data<T>;
    const VERSION: &'static str = "v1";
}

#[derive(Debug, Copy)]
pub(crate) struct V2<T>(PhantomData<T>);

impl<T> Clone for V2<T> {
    fn clone(&self) -> V2<T> {
        V2(PhantomData)
    }
}

impl<T> ApiVersion for V2<T> {
    type Format = Versions<T>;
    const VERSION: &'static str = "v2";
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Default, Serialize, Builder)]
#[builder(derive(Clone), pattern = "owned")]
pub(crate) struct Request<V> {
    #[builder(default, setter(skip))]
    #[serde(skip)]
    spooky: PhantomData<V>,
    #[serde(skip)]
    route: &'static str,

    #[builder(default, setter(strip_option))]
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

impl<V: ApiVersion> RequestBuilder<V> {
    pub(crate) async fn json(self, config: &Config) -> Result<V::Format>
    where
        for<'de> V::Format: Deserialize<'de>,
    {
        let request = self.build()?;
        let url = format!(
            "{}{}/{}?{}",
            config.chronicler_base_url,
            V::VERSION,
            &request.route,
            serde_urlencoded::to_string(&request)?
        );
        log::debug!("chronicler request: {}", url);
        Ok(config.client.get(url).send().await?.json().await?)
    }
}

impl<T> RequestBuilder<V1<T>> {
    pub(crate) fn v1(route: &'static str) -> RequestBuilder<V1<T>> {
        RequestBuilder::default().route(route)
    }
}

impl<T> RequestBuilder<V2<T>> {
    pub(crate) fn v2(route: &'static str) -> RequestBuilder<V2<T>> {
        RequestBuilder::default().route(route).count(1000)
    }

    pub(crate) fn paged_json<'a>(
        self,
        config: &'a Config,
    ) -> impl StreamTrait<Item = Result<Version<T>>> + 'a
    where
        for<'de> T: Deserialize<'de> + 'a,
    {
        stream! {
            let response = self.clone().json(config).await?;
            for item in response.items {
                yield Ok(item);
            }
            let mut next_page = response.next_page;

            while let Some(page) = next_page {
                let response = self.clone().page(page).json(config).await?;
                for item in response.items {
                    yield Ok(item);
                }
                next_page = response.next_page;
            }
        }
    }
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

#[derive(Debug, Clone, Copy, Serialize)]
#[serde(rename_all = "lowercase")]
pub(crate) enum Order {
    Asc,
    Desc,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Data<T> {
    pub(crate) data: Vec<T>,
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
