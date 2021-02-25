require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "OurPortal",
    siteUrl: `https://ourportal.shohamc1.com`, // change later
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "OurPortal",
        short_name: "OurPortal",
        start_url: "/",
        display: "standalone",
        icon: "src/assets/favicon.jpg",
      },
    },
  ],
};
