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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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
Cypress.Commands.add("getId", (dataTestId, time) => {
  var t = time || 10000;
  cy.get(`[data-testid='${dataTestId}']`, { timeout: t });
});

Cypress.Commands.add(
  "login",
  (email = "yiern_goh@mymail.sutd.edu.sg", password = "Test123!") => {
    Cypress.log({
      displayName: "login",
    });
    return new Cypress.Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve();
        });
    });
  }
);

Cypress.Commands.add("logout", () => {
  Cypress.log({
    displayName: "logout",
  });
  return new Cypress.Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve();
      });
  });
});

Cypress.Commands.add(
  "loginDelete",
  (email = "signuptest@mymail.sutd.edu.sg", password = "Qwerty123!") => {
    Cypress.log({
      displayName: "login to delete",
    });
    return new Cypress.Promise((resolve, reject) => {
      return firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((credentials) => {
          console.log("Authenticated ");
          firebase
            .firestore()
            .collection("users")
            .doc(credentials.user.uid)
            .delete()
            .then(() => {
              console.log("Account removed from users collection");
              return credentials.user
                .delete()
                .then(() => {
                  console.log("Account removed successfully");
                })
                .catch((error) => {
                  console.log("Error deleting account");
                })
                .then(() => {
                  firebase.auth().signOut();
                  resolve();
                });
            })
            .catch((error) => {
              console.log("Error deleting account from collection:");
            });
        })
        .catch((error) => {
          console.log("User already deleted");
        });
    });
  }
);

Cypress.Commands.add("deleteMod", (courseCodes) => {
  Cypress.log({
    displayName: "delete mods",
    modules: courseCodes,
  });
  return new Cypress.Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        modules: firebase.firestore.FieldValue.arrayRemove(...courseCodes),
      })
      .then(() => {
        console.log(courseCodes + " deleted successfully");
        resolve();
      });
  });
});

Cypress.Commands.add("enrollMod", (courseCodes) => {
  Cypress.log({
    displayName: "enroll mods",
    modules: courseCodes,
  });
  return new Cypress.Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        modules: firebase.firestore.FieldValue.arrayUnion(...courseCodes),
      })
      .then(() => {
        console.log(courseCodes + " enrolled successfully");
        resolve();
      });
  });
});

Cypress.Commands.add("removeAutoTradeMods", (autoTradeMods) => {
  Cypress.log({
    displayName: "remove autotrade mods",
    modules: autoTradeMods,
  });
  return cy.document().then({ timeout: 10000 }, (doc) => {
    return firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        autoTradeModules: firebase.firestore.FieldValue.arrayRemove(
          ...autoTradeMods
        ),
      });
  });
});
// only for sign up spec
Cypress.Commands.add("signUpCheckError", (message) => {
  cy.get("button").contains("Sign Up").click();
  cy.getId("signUpErrorMessage").should("contain", message);
});
