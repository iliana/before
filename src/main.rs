use rocket::tokio;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    before::build()?.launch().await?;
    Ok(())
}
