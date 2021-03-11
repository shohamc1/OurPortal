// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCsNTpDcTDvEvjGdNrCECgQ5vnWga2pO9s",
  authDomain: "ourportal-e0a9c.firebaseapp.com",
  databaseURL: "https://ourportal-e0a9c-default-rtdb.firebaseio.com",
  projectId: "ourportal-e0a9c",
  storageBucket: "ourportal-e0a9c.appspot.com",
  messagingSenderId: "569619605040",
  appId: "1:569619605040:web:5d6bb04aea40940c5a6ff5",
  measurementId: "G-6KGX9H2DNY",
};

firebase.initializeApp(firebaseConfig);
// this works for now but there is another recommended method here https://docs.cypress.io/guides/testing-strategies/google-authentication.html#Google-Developer-Console-Setup

Cypress.Commands.add(
  "login",
  (email = "testuser@gmail.com", password = "test123") => {
    Cypress.log({
      displayName: "login",
      consoleProps: () => {
        return { email, password };
      },
    });

    return firebase.default.auth().signInWithEmailAndPassword(email, password);
  }
);

Cypress.Commands.add("logout", () => {
  Cypress.log({
    displayName: "logout",
  });
  return firebase.auth().signOut();
});

Cypress.Commands.add("getId", (dataTestId) => {
  cy.get(`[data-testid='${dataTestId}']`);
});
