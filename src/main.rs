use rocket::tokio;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    before::build(&rocket::Config::figment())?.launch().await?;
    Ok(())
}
