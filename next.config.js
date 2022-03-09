const withPreact = require("next-plugin-preact");

module.exports = withPreact({
  basePath: "/_before",
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve("@svgr/webpack"),
    });
    config.optimization.splitChunks.minSize = 6000; // specifically hit dayjs
    return config;
  },
});
