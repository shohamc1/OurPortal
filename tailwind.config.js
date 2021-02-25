module.exports = {
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Arial"],
      },
      width: {
        "1/7": "14.2857143%",
      },
      colors: {
        gray: {
          50: "#F5F5F5",
          100: "#F5F6F8",
          300: "#ECECEC",
          600: "#C4C4C4",
          700: "#D9DBE9",
        },
        purple: {
          700: "#2A00A2",
          500: "#5F2EEA",
        },
        pastel: {
          mint: "#ABFFE8",
          red: "#F19DA2",
          yellow: "#FCDCA1",
          blue: "#ACF0FF",
          orange: "#FFDFBA",
        },
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "25px",
        button: "40px",
      },
      minWidth: {
        72: "18rem",
        80: "20rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
