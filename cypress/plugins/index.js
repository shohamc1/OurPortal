/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
require("dotenv").config();
module.exports = (on, config) => {
  // for chrome browser 404 error. NEED THIS SHIT
  config.env.username = process.env.USER;
  config.env.password = process.env.PASSWORD;
  config.env.admin_username = process.env.ADMIN_USER;
  config.env.admin_password = process.env.ADMIN_PASSWORD;

  return config;
  // on("before:browser:launch", (browser = {}, launchOptions) => {
  //   if (browser.name === "chrome") {
  //     // ^ make sure this is your browser name, you may
  //     // be using 'canary' or 'chromium' for example, so change it to match!
  //     launchOptions.args.push("--proxy-bypass-list=<-loopback>");
  //     return launchOptions;
  //   }
  // });
};
