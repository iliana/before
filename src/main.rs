use rocket::tokio;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    before::build(&rocket::Config::figment())
        .await?
        .launch()
        .await?;
    Ok(())
}
