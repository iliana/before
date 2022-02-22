use anyhow::Result;
use cmd_lib::run_cmd;
use std::env;
use std::fs;

fn main() -> Result<()> {
    cmd_lib::set_pipefail(true);

    println!("cargo:rerun-if-env-changed=SKIP_ASSET_BUILD");
    if env::var_os("SKIP_ASSET_BUILD").is_none() {
        println!("cargo:rerun-if-changed=components/");
        println!("cargo:rerun-if-changed=next.config.js");
        println!("cargo:rerun-if-changed=package-lock.json");
        println!("cargo:rerun-if-changed=pages/");
        println!("cargo:rerun-if-changed=postcss.config.js");
        println!("cargo:rerun-if-changed=public/");
        println!("cargo:rerun-if-changed=src/");
        println!("cargo:rerun-if-changed=tailwind.config.js");

        run_cmd!(npx next build --no-lint)?;
        run_cmd!(npx next export)?;
        run_cmd!(node fix-fragment.js out/fragment/nav.html)?;

        fs::remove_file("out/404.html")?;
    }

    Ok(())
}
