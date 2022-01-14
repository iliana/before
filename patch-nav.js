/* patches src/nav.html for use on meta pages (index, credits, etc):
 * 1. sets the details element open
 * 2. removes the relative jump buttons
 */

const { JSDOM } = require("jsdom");
const { stdout } = require("process");

JSDOM.fromFile("src/nav.html").then((dom) => {
  const document = dom.window.document;
  document.querySelector("details").open = true;
  document.querySelectorAll(".tw-before-skip").forEach((el) => el.remove());
  stdout.write(document.body.innerHTML);
});
