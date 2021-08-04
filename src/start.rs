use crate::Result;
use askama::Template;
use chrono::{DateTime, Utc};
use rocket::get;
use rocket::response::content::Html;
use serde::Deserialize;

const JUMP_BASE: &str = "/_before/jump?redirect=%2F";

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
    events: Option<Vec<Event>>,
}

#[derive(Deserialize, Default)]
struct Season {
    number: i64,
    title: String,
    extra_title: Option<ExtraTitle>,
    color: String,
    days: String,
    events: Vec<Event>,
}

impl Season {
    fn jump(&self) -> String {
        format!("{}&season={}&day=1", JUMP_BASE, self.number)
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
    time: Option<DateTime<Utc>>,
    tournament: Option<i64>,
    day: Option<i64>,
}

impl Event {
    fn jump(&self) -> String {
        self.season_jump(&Season::default())
    }

    fn season_jump(&self, season: &Season) -> String {
        if let Some(time) = self.time {
            format!("{}&time={}", JUMP_BASE, time.to_rfc3339())
        } else if let Some(day) = self.day {
            if let Some(tournament) = self.tournament {
                format!(
                    "{base}&tournament={tournament}&day={day}",
                    base = JUMP_BASE,
                    tournament = tournament,
                    day = day,
                )
            } else {
                format!(
                    "{base}&season={season}&day={day}",
                    base = JUMP_BASE,
                    season = season.number,
                    day = day,
                )
            }
        } else {
            String::new()
        }
    }
}

#[get("/_before/start", rank = 1)]
pub fn start() -> Result<Html<String>> {
    let data: StartData =
        toml::from_str(include_str!("../data/start.toml")).map_err(anyhow::Error::from)?;
    Ok(Html(data.render().map_err(anyhow::Error::from)?))
}
