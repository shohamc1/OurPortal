/// <reference types="cypress" />

describe("enroll", () => {
  before(() => {
    cy.login();
    cy.visit("/enroll");
  });
  after(() => {
    cy.logout();
  });
  it("Page header displays Enroll", () => {
    cy.getId("pageName").should("eq", "Enroll");
  });
});
