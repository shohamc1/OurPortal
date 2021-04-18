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
      // consoleProps: () => {
      //   return { email, password };
      // },
    });

    return firebase.default.auth().signInWithEmailAndPassword(email, password);
  }
);

Cypress.Commands.add(
  "loginDelete",
  (email = "signuptest@mymail.sutd.edu.sg", password = "Qwerty123!") => {
    Cypress.log({
      displayName: "login to delete",
      consoleProps: () => {
        return { email, password };
      },
    });
    return firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        firebase
          .firestore()
          .collection("users")
          .doc(credentials.user.uid)
          .delete()
          .then(() => {
            console.log("Account removed from users collection");
            credentials.user
              .delete()
              .then(() => {
                console.log("Account removed successfully");
              })
              .catch((error) => {
                console.log("Error deleting account");
              });
          })
          .catch((error) => {
            console.log("Error deleting account from collection:");
          });
      })
      .catch((error) => {
        console.log(error);
        console.log("User already deleted");
      })
      .then(firebase.auth().signOut());
  }
);
// cy.document().then({ timeout: 10000 }, (doc) => {});

Cypress.Commands.add("logout", () => {
  Cypress.log({
    displayName: "logout",
  });
  return firebase.auth().signOut();
});

Cypress.Commands.add("getUser", (o) => {
  return firebase.auth().onAuthStateChanged(($user) => {
    if ($user) {
      console.log("User registered!");
      o.user = $user;
    } else {
      console.log("User logged out");
    }
  });
});
Cypress.Commands.add("deleteUser", (user) => {
  return cy.document().then({ timeout: 10000 }, (doc) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log("Account removed from users collection");
        user
          .delete()
          .then(() => {
            console.log("Account removed successfully");
          })
          .catch((error) => {
            console.log("Error deleting account");
          });
      })
      .catch((error) => {
        console("Error deleting account from collection:");
      });
  });
});

Cypress.Commands.add("deleteMod", (courseCodes) => {
  return cy.document().then({ timeout: 10000 }, (doc) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        modules: firebase.firestore.FieldValue.arrayRemove(...courseCodes),
      });
  });
});

Cypress.Commands.add("enrollMod", (courseCodes) => {
  return cy.document().then({ timeout: 10000 }, (doc) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        modules: firebase.firestore.FieldValue.arrayUnion(...courseCodes),
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
