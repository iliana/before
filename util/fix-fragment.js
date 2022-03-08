const { JSDOM } = require("jsdom");
const { writeFileSync } = require("fs");

process.argv.slice(2).forEach((file) => {
  JSDOM.fromFile(file).then((dom) => {
    const root = dom.window.document.getElementById("__next");
    if (root) {
      writeFileSync(file, root.innerHTML, { encoding: "utf8" });
    }
  });
});
