fn main() {
    println!("cargo:rerun-if-changed=package-lock.json");
    println!("cargo:rerun-if-changed=postcss.config.js");
    println!("cargo:rerun-if-changed=src/");
    println!("cargo:rerun-if-changed=tailwind.config.js");
    println!("cargo:rerun-if-changed=templates/");

    if !std::process::Command::new("npx")
        .env(
            "NODE_ENV",
            if std::env::var("PROFILE").unwrap() == "release" {
                "production"
            } else {
                ""
            },
        )
        .arg("postcss")
        .arg("src/styles.css")
        .arg("-o")
        .arg("static/styles.css")
        .status()
        .unwrap()
        .success()
    {
        println!("cargo:warning=failed to run postcss");
    }
}
