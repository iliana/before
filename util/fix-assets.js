const glob = require("glob");
const { JSDOM } = require("jsdom");
const { writeFileSync } = require("fs");

const fragments = {};

["nav"].forEach((fragment) => {
  const file = `out/fragment/${fragment}.html`;
  JSDOM.fromFile(file).then((dom) => {
    if (fragment === "nav") {
      fragments["stylesheet"] = dom.window.document.querySelector('link[rel="stylesheet"]');
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
    dom.window.document.head.append(fragments["stylesheet"]);
    dom.window.document.body.prepend(fragments["nav"]);
    dom.window.document.body.append(fragments["client.js"]);
    writeFileSync(file, dom.serialize(), { encoding: "utf8" });
  });
});
