/// <reference types="cypress" />

describe("P2P Trade", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/request");
  });
  after(() => {
    cy.deleteMod(["02.144DH"]);
    cy.logout();
  });

  it("Dismissiable information tab on visit", () => {
    cy.getId("requestInfoTab")
      .should("be.visible")
      .and("contain", "Welcome to P2P Trading")
      .find("svg")
      .click();
  });

  describe("No enrolled module", () => {
    it("Empty card when not enrolled", () => {
      cy.contains("Your Current Module")
        .next()
        .get("span")
        .should("contain", "");
    });
    it("Button disabled when not enrolled", () => {
      cy.getId("requestSendButton"); // NEED TO FIX
    });
  });

  describe("With enrolled module", () => {
    before(() => {
      cy.enrollMod(["02.144DH"]);
      cy.visit("/request");
    });

    it("Module Card Visible", () => {
      cy.getId("02.144DH", 60000);
    });
    it("Button disabled when not enrolled", () => {
      cy.getId("requestSendButton").should("not.be.disabled"); // NEED TO FIX
    });
  });

  describe("Input Recipient Email", () => {
    // handle invalid input?
    // prevent spamming?
  });
});
