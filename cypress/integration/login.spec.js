/// <reference types="cypress" />

describe("Login", () => {
  before(() => {
    cy.visit("/login");
  });
  beforeEach(() => {
    cy.getId("loginEmail").clear();
    cy.getId("loginPassword").clear();
  });

  it("Greets with Header and Slogan", () => {
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  it("Invalid Email Format", () => {
    cy.getId("loginEmail").type("invalid");
    cy.getId("loginPassword").type("0");
    cy.getId("loginBtn").click();
    cy.getId("errorMessage").should(
      "contain",
      "The email address is badly formatted."
    );
  });

  it("Invalid User", () => {
    cy.getId("loginEmail").type("invalid@test.com");
    cy.getId("loginPassword").type("0");
    cy.getId("loginBtn").click();
    cy.getId("errorMessage").should(
      "contain",
      "There is no user record corresponding to this identifier. The user may have been deleted."
    );
  });

  it("Invalid password", () => {
    cy.getId("loginEmail").type("testuser@gmail.com");
    cy.getId("loginPassword").type("0");
    cy.getId("loginBtn").click();
    cy.getId("errorMessage").should(
      "contain",
      "The password is invalid or the user does not have a password."
    );
  });

  it("Navigates to Dashboard on success", () => {
    cy.getId("loginEmail").type("testuser@gmail.com");
    cy.getId("loginPassword").type("test123");
    cy.getId("loginBtn").click();
    cy.url().should("contain", "/dashboard");
    cy.getId("welcomeMessage").should("contain", "test");
    cy.logout();
  });
});
describe("logout", () => {
  it("Logout redirects to landing", () => {
    cy.login();
    cy.visit("/dashboard");
    cy.url().should("contain", "/dashboard");
    cy.getId("welcomeMessage").should("contain", "test");
    cy.getId("logoutBtn").click();
    cy.url().should("eq", "http://localhost:8000/");
  });
});
// User is at landing page => the pic loads and the 2 important buttons exist
// User clicks on login button and is redirected to the login page
// Get the username and text fields and attempt to login
// ISSUES: person logged in once and login will persist even after browser closes
// ISSUES: person clicks sign up