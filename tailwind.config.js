module.exports = {
  purge: [],
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
          1: "#FEFEFE",
          100: "#F5F6F8",
        },
        purple: {
          700: "#2A00A2",
          500: "#5F2EEA",
        },
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "25px",
        button: "40px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
