use anyhow::Result;
use cmd_lib::run_cmd;
use std::env;
use std::fs;
use std::path::Path;

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

        fs::remove_dir_all("out/_next/data")?;
        fs::remove_dir_all("out/_next/static/chunks")?;
        fs::remove_file("out/404.html")?;

        for entry in fs::read_dir("out/_next")? {
            let name = entry?.file_name();
            if name != "static" {
                fs::remove_dir_all(Path::new("out/_next").join(&name))?;
                fs::remove_dir_all(Path::new("out/_next/static").join(&name))?;
                break;
            }
        }
    }

    Ok(())
}
