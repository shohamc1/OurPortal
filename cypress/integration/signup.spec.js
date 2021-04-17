/// <reference types="cypress" />

describe("Signup", () => {
  before(() => {
    cy.visit("/");
    cy.loginDelete();
    cy.wait(5000);
  });

  it("Greets with Header and Slogan", () => {
    cy.visit("/signup");
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  describe("Invalid Signup", () => {
    before(() => {
      cy.get("[type='email']").type("testuser@gmail.com");
      cy.get("[type='password']").type("12345");
    });
    it("Invalid Password", () => {
      cy.get("button").contains("Sign Up").click();
      cy.getId("signUpErrorMessage").should(
        "contain",
        "Password should be at least 6 characters"
      );
    });

    it("Existing User", () => {
      cy.get("[type='password']").type("6");
      cy.get("button").contains("Sign Up").click();
      cy.getId("signUpErrorMessage").should(
        "contain",
        "The email address is already in use by another account."
      );
    });
  });
});

describe("Valid signup", () => {
  before(() => {
    cy.visit("/signup");
  });

  it("Successful Signup", () => {
    cy.get("[type='email']").type("signuptest@gmail.com");
    cy.get("[type='password']").type("qwerty1234");
    cy.get("[autoComplete='given-name']").type("Ben");
    cy.get("[autoComplete='family-name']").type("Dover");
    cy.get("button").contains("Sign Up").click();
    // successful signup routes to page\
    cy.getId("dashboardWelcome", 30000)
      .should("contain", "Ben")
      .then(() => {
        cy.logout();
      });
  });
});
/*TODO fix the name to not accept empty/numbers/symbols  */
// it("Invalid First Name ", () => {
//  cy.get("[type='email']").type("@gmail.com");
//  cy.get("button").contains("Sign Up").click();
// /*assert some error message to appear */
// });

// it("Invalid Last Name ", () => {
//   cy.get("[autoComplete='given-name']").clear().type("validname");
//   cy.get("button").contains("Sign Up").click();
// /*assert some error message to appear */
// });
