/// <reference types="cypress" />

describe("P2P Trade", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.deleteMod(["02.136DH"]).then(() => {
      cy.visit("/request");
    });
  });
  after(() => {
    cy.deleteMod(["02.136DH"]).then(() => {
      cy.logout();
    });
  });

  describe("No enrolled module", () => {
    it("Empty card when not enrolled", () => {
      cy.getId("requestPopup").should(
        "contain",
        "Seems like you do not have a HASS module yet. Come back once you have one!"
      );
    });

    it("Redirects to home on dismiss", () => {
      cy.getId("requestPopup")
        .find("svg")
        .click()
        .then(() => {
          cy.url({ timeout: 10000 }).should("include", "/dashboard");
        });
    });
  });

  describe("With enrolled module", () => {
    before(() => {
      cy.enrollMod(["02.136DH"]).then(() => {
        cy.visit("/request");
      });
    });

    it("Dismissiable information tab on visit", () => {
      cy.getId("requestInfoTab").should("be.visible").find("button").click();
    });

    it("Module Card Visible", () => {
      cy.getId("02.136DH", 30000);
    });
    // it("Button disabled when not enrolled", () => {
    //   cy.getId("requestSendButton").should("not.be.disabled"); // NEED TO FIX
    // });
  });

  // describe("Input Recipient Email", () => {
  //   // handle invalid input?
  //   // prevent spamming?
  // });
});
