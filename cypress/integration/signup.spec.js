/// <reference types="cypress" />

describe("Signup", () => {
  before(() => {
    cy.visit("/signup");
  });

  it("Greets with Header and Slogan", () => {
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  it("Successful Signup", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("something about the error");

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done();

      // return false to prevent the error from
      // failing this test
      return false;
    });

    cy.get("[type='email']").type("signuptest@gmail.com");
    cy.get("[type='password']").type("qwerty1234");
    cy.get("[autoComplete='given-name']").type("Ben");
    cy.get("[autoComplete='family-name']").type("Dover");
    cy.get("button").contains("Sign Up").click();
    // successful signup routes to page
    cy.getId("dashboardWelcome", 60000).should("contain", "Ben");
    cy.deleteUser();

    cy.getId("logoutBtn").click();
  });

  describe("Invalid Signup", () => {
    before(() => {
      cy.visit("/signup");
      cy.get("[type='email']").type("testuser@gmail.com");
      cy.get("[type='password']").type("12345");
      // cy.get("[autoComplete='given-name']").type("");
      // cy.get("[autoComplete='family-name']").type("");
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
    it("Invalid Email Format", () => {
      cy.get("[type='email']").clear().type("signuptest");
      cy.get("button").contains("Sign Up").click();
      cy.getId("signUpErrorMessage").should(
        "contain",
        "The email address is badly formatted."
      );
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
  });
});
