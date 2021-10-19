use crate::api::ApiResult;
use crate::choose;
use crate::cookies::AsCookie;
use crate::cookies::CookieJarExt;
use rocket::http::CookieJar;
use rocket::post;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use std::fmt::{self, Display};
use std::str::FromStr;

#[derive(Debug, Serialize)]
#[serde(transparent)]
pub(crate) struct FavoriteTeam(Option<String>);

impl FavoriteTeam {
    pub(crate) fn new(s: String) -> FavoriteTeam {
        FavoriteTeam(Some(s))
    }

    pub(crate) fn random() -> FavoriteTeam {
        FavoriteTeam(Some(
            choose(&[
                // All 20 original Season 1 teams, no Breach/Lift
                "105bc3ff-1320-4e37-8ef0-8d595cb95dd0", // Garages
                "23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7", // Pies
                "36569151-a2fb-43c1-9df7-2df512424c82", // Millennials
                "3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e", // Flowers
                "57ec08cc-0411-4643-b304-0e80dbc15ac7", // Wild Wings
                "747b8e4a-7e50-4638-a973-ea7950a3e739", // Tigers
                "7966eb04-efcc-499b-8f03-d13916330531", // Magic
                "878c1bf6-0d21-4659-bfee-916c8314d69c", // Tacos
                "8d87c468-699a-47a8-b40d-cfb73a5660ad", // Crabs
                "979aee4a-6d80-4863-bf1c-ee1a78e06024", // Fridays
                "9debc64f-74b7-4ae1-a4d6-fce0144b6ea5", // Spies
                "a37f9158-7f82-46bc-908c-c9e2dda7c33b", // Jazz Hands
                "adc5b394-8f76-416d-9ce9-813706877b84", // The Breath Mints.
                "b024e975-1c4a-4575-8936-a3754a08806a", // Steaks
                "b63be8c2-576a-4d6e-8daf-814f8bcea96f", // Dale
                "b72f3061-f573-40d7-832a-5ad475bd7909", // Lovers
                "bfd38797-8404-4b38-8b82-341da28b1f83", // Shoe Thieves
                "ca3f1c8c-c025-4d8e-8eef-5be6accbeb16", // Firefighters
                "eb67ae5e-c4bf-46ca-bbbc-425cd34182ff", // Moist Talkers
                "f02aeae2-5e6a-4098-9842-02d2273f25c7", // Sunbeams
            ])
            .to_owned(),
        ))
    }
}

impl Display for FavoriteTeam {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(team) = &self.0 {
            write!(f, "{}", team)?;
        }
        Ok(())
    }
}

impl FromStr for FavoriteTeam {
    type Err = Infallible;

    fn from_str(s: &str) -> Result<FavoriteTeam, Infallible> {
        Ok(FavoriteTeam(if s.is_empty() {
            None
        } else {
            Some(s.to_owned())
        }))
    }
}

impl AsCookie for FavoriteTeam {
    const NAME: &'static str = "favorite_team";
}

#[post("/api/buyUpdateFavoriteTeam")]
pub(crate) fn buy_flute(cookies: &CookieJar<'_>) -> ApiResult<&'static str> {
    cookies.store(&FavoriteTeam(None));
    ApiResult::Ok("Reload this page to choose a new team.")
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct FavoriteTeamUpdate {
    #[serde(alias = "newTeamId")]
    pub(crate) team_id: String,
}

#[post("/api/updateFavoriteTeam", data = "<new_favorite>")]
pub(crate) fn update_favorite_team(
    cookies: &CookieJar<'_>,
    new_favorite: Json<FavoriteTeamUpdate>,
) -> ApiResult<&'static str> {
    cookies.store(&FavoriteTeam(Some(new_favorite.into_inner().team_id)));
    ApiResult::Ok("You now remember the Before of a new team.")
}
