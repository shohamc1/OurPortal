/// <reference types="cypress" />

describe("Landing", () => {
  it("Greets with image, header and slogan", () => {
    cy.visit("/");
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Modules").should("exist");
    cy.get('[alt="Focus"]')
      .should("be.visible")
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("links to login page", () => {
    cy.contains("Login").should("have.attr", "href", "/login");
  });
  it("links to sign up page", () => {
    cy.contains("Sign Up").should("have.attr", "href", "/signup");
  });
});
