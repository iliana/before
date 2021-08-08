use crate::Result;
use askama::Template;
use rocket::get;
use rocket::response::content::Html;
use serde::Deserialize;
use std::collections::BTreeMap;
use toml::Value;

const JUMP_BASE: &str = "/_before/jump";

#[derive(Deserialize, Template)]
#[template(path = "start.html")]
struct StartData {
    eras: Vec<Era>,
}

#[derive(Deserialize)]
struct Era {
    title: String,
    color: String,
    seasons: Vec<Season>,
    days: Option<String>,
    #[serde(default)]
    events: Vec<Event>,
}

#[derive(Deserialize, Default)]
struct Season {
    number: i64,
    title: String,
    extra_title: Option<ExtraTitle>,
    color: String,
    days: String,
    #[serde(default)]
    events: Vec<Event>,
}

impl Season {
    fn jump(&self) -> String {
        let mut args = BTreeMap::new();
        args.insert(
            "redirect",
            if self.number <= 11 { "/" } else { "/league" }.to_string(),
        );
        args.insert("season", self.number.to_string());
        args.insert("day", 1.to_string());
        format!(
            "{}?{}",
            JUMP_BASE,
            serde_urlencoded::to_string(&args).unwrap()
        )
    }
}

#[derive(Deserialize)]
struct ExtraTitle {
    title: String,
    color: String,
}

#[derive(Deserialize)]
struct Event {
    title: String,
    being: Option<Being>,
    #[serde(flatten)]
    jump_args: BTreeMap<String, Value>,
}

impl Event {
    fn class(&self) -> String {
        match self.being.as_ref() {
            Some(being) => format!("bigdeal bigdeal-{}", *being as i8),
            None => String::new(),
        }
    }

    fn jump(&self) -> String {
        let mut args = self.jump_args.clone();
        args.entry("redirect".to_string())
            .or_insert_with(|| Value::from("/league"));
        format!(
            "{}?{}",
            JUMP_BASE,
            serde_urlencoded::to_string(&args).unwrap()
        )
    }

    fn season_jump(&self, season: &Season) -> String {
        let mut args = self.jump_args.clone();
        args.entry("redirect".to_string())
            .or_insert_with(|| Value::from(if season.number <= 11 { "/" } else { "/league" }));
        args.entry("season".to_string())
            .or_insert_with(|| Value::from(season.number));
        format!(
            "{}?{}",
            JUMP_BASE,
            serde_urlencoded::to_string(&args).unwrap()
        )
    }
}

#[derive(Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
enum Being {
    Alert = -1,
    Peanut = 0,
    Monitor = 1,
    Coin = 2,
    Reader = 3,
    Parker = 4,
    Lootcrates = 5,
    Namerifeht = 6,
}

#[cfg(debug_assertions)] // debug mode
async fn load_start() -> anyhow::Result<StartData> {
    Ok(toml::from_str(
        &rocket::tokio::fs::read_to_string(
            std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
                .join("data")
                .join("start.toml"),
        )
        .await?,
    )?)
}

#[cfg(not(debug_assertions))] // release mode
async fn load_start() -> anyhow::Result<&'static StartData> {
    lazy_static::lazy_static! {
        static ref DATA: StartData = toml::from_str(include_str!("../data/start.toml")).unwrap();
    }

    Ok(&DATA)
}

#[get("/_before/start", rank = 1)]
pub async fn start() -> Result<Html<String>> {
    Ok(Html(
        load_start().await?.render().map_err(anyhow::Error::from)?,
    ))
}
