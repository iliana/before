use crate::chronicler::{Order, RequestBuilder, Version};
use crate::time::DateTime;
use crate::Config;
use anyhow::Result;
use serde::Deserialize;
use serde_json::value::RawValue;
use std::collections::HashMap;

impl Config {
    async fn fetch_inner<T>(
        &self,
        ty: &'static str,
        ids: Option<String>,
        time: DateTime,
    ) -> Result<impl Iterator<Item = Version<T>>>
    where
        for<'de> T: Deserialize<'de>,
    {
        let mut builder = RequestBuilder::v2("entities").ty(ty).at(time);
        if let Some(ids) = ids {
            builder = builder.id(ids);
        }

        Ok(builder.json(self).await?.items.into_iter())
    }

    pub(crate) async fn fetch<T>(
        &self,
        ty: &'static str,
        ids: Option<String>,
        time: DateTime,
    ) -> Result<impl Iterator<Item = T>>
    where
        for<'de> T: Deserialize<'de>,
    {
        Ok(self
            .fetch_inner(ty, ids, time)
            .await?
            .map(|version| version.data))
    }

    pub(crate) async fn fetch_map<T>(
        &self,
        ty: &'static str,
        ids: Option<String>,
        time: DateTime,
    ) -> Result<HashMap<String, T>>
    where
        for<'de> T: Deserialize<'de>,
    {
        Ok(self
            .fetch_inner(ty, ids, time)
            .await?
            .map(|version| (version.entity_id, version.data))
            .collect())
    }

    pub(crate) async fn fetch_game(
        &self,
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
            RequestBuilder::v1("games/updates")
                .game(id)
                .order(Order::Desc)
                .before(time)
                .count(1)
                .json(self)
                .await?
                .data
                .into_iter()
                .next()
                .map(|item: Game| item.data)
        })
    }
}
