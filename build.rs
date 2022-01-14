use anyhow::Result;
use cmd_lib::run_cmd;
use std::env;
use std::fs;

fn main() -> Result<()> {
    cmd_lib::set_pipefail(true);

    println!("cargo:rerun-if-env-changed=SKIP_ASSET_BUILD");
    if env::var_os("SKIP_ASSET_BUILD").is_none() {
        println!("cargo:rerun-if-changed=package-lock.json");
        println!("cargo:rerun-if-changed=postcss.config.js");
        println!("cargo:rerun-if-changed=src/");
        println!("cargo:rerun-if-changed=static/fragments/");
        println!("cargo:rerun-if-changed=tailwind.config.js");
        println!("cargo:rerun-if-changed=templates/");

        if env::var("PROFILE")? == "release" {
            env::set_var("NODE_ENV", "production");
        }

        fs::create_dir_all("static/assets")?;
        run_cmd!(npx postcss "src/styles.css" -o "static/assets/styles.css")?;
        fs::copy("src/nav.html", "static/assets/nav.html")?;
        run_cmd!(node "./patch-nav.js" > "static/assets/nav-meta.html")?;
    }

    Ok(())
}
