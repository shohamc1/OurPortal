/// <reference types="cypress" />

describe("Signup", () => {
  before(() => {
    cy.visit("/signup");
  });
  // beforeEach(() => {
  //   cy.getId("loginEmail").clear();
  //   cy.getId("loginPassword").clear();
  // });
  it("check cypress", () => {
    cy.window().its("Cypress").should("be.an", "object");
  });
  it("Greets with Header and Slogan", () => {
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  it("Basic Signup", () => {
    cy.get("[type='email']").type("suckonthis@gmail.com");
    cy.get("[type='password']").type("qwerty1234");
    cy.get("[autoComplete='given-name']").type("shit");
    cy.get("[autoComplete='family-name']").type("bag");
    cy.get("button").contains("Sign Up").click();
  });
});
