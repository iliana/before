module.exports = {
  plugins: {
    "postcss-each": {},
    "postcss-nested": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
