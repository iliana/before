/* eslint-disable no-param-reassign */

module.exports = () => ({
  postcssPlugin: "squelch-nesting-warning",
  OnceExit(css, { result }) {
    result.messages = result.messages.filter(
      (message) => !(message.type === "warning" && message.text.startsWith("Nested @tailwind rules"))
    );
  },
});
module.exports.postcss = true;
