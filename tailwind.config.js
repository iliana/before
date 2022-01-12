const colors = require("tailwindcss/colors");

module.exports = {
  important: ".tw-before-scope",
  prefix: "tw-",
  content: ["./templates/*.{html,js,svg}", "./src/**/*.rs"],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "1.75rem",
      },
    },
    fontFamily: {
      serif: ["Lora Before", "serif"],
      "client-serif": ["Lora", "Courier New", "monospace", "serif"],
      sans: ["Open Sans", "Helvetica Neue", "sans-serif"],
    },
    screens: {
      lg: "1080px",
    },
  },
};
