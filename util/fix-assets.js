/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const glob = require("glob");
const webpack = require("webpack");
const { JSDOM } = require("jsdom");
const { writeFileSync } = require("fs");

// compile client.js
webpack(
  {
    mode: "production",
    entry: "./lib/client",
    output: {
      path: `${__dirname}/../out`,
      filename: "client.js",
    },
  },
  (err, stats) => {
    if (err) {
      process.exitCode = 1;
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      process.exitCode = 1;
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  }
);

const fragments = {};
["nav"].forEach((fragment) => {
  const file = `out/fragment/${fragment}.html`;
  JSDOM.fromFile(file).then((dom) => {
    if (fragment === "nav") {
      fragments.stylesheet = dom.window.document.querySelector('link[rel="stylesheet"]');
      fragments["client.js"] = dom.window.document.createElement("script");
      fragments["client.js"].setAttribute("src", "/_before/client.js");
    }

    const root = dom.window.document.getElementById("__next");
    if (root) {
      fragments[fragment] = root;
      writeFileSync(file, root.innerHTML, { encoding: "utf8" });
    }
  });
});

glob.sync("out/offsite/**/*.html").forEach((file) => {
  JSDOM.fromFile(file).then((dom) => {
    dom.window.document.head.append(fragments.stylesheet);
    dom.window.document.body.prepend(fragments.nav);
    dom.window.document.body.append(fragments["client.js"]);
    writeFileSync(file, dom.serialize(), { encoding: "utf8" });
  });
});
