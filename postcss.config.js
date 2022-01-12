module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
