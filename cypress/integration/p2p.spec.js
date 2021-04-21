/// <reference types="cypress" />

describe("P2P Trade", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.deleteMod(["02.136DH"]).then(() => {
      cy.setOpenTradeValue(false).then(() => {
        cy.visit("/request");
      });
    });
  });
  after(() => {
    cy.deleteMod(["02.136DH"]).then(() => {
      cy.setOpenTradeValue(false).then(() => {
        cy.logout();
      });
    });
  });

  describe("No enrolled module", () => {
    it("Not enrolled popup", () => {
      cy.getId("requestPopupNoHASS", 30000).should(
        "contain",
        "Seems like you do not have a HASS module yet. Come back once you have one!"
      );
    });

    it("Redirects to home on dismiss", () => {
      cy.getId("requestPopupNoHASS")
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

    it("Sending trade request enabled", () => {
      cy.getId("requestInput").should("not.be.disabled");
      cy.getId("requestSendButton").should("not.be.disabled");
    });

    it("Email does not exist in our database", () => {
      cy.getId("requestInput").type("doesnotexist@mymail.sutd.edu.sg");
      // cy.getId("requestSendButton").click();
      // cy.getId("requestPopupSent").should("contain", "");
    });
  });

  describe("Has existing trade", () => {
    before(() => {
      cy.setOpenTradeValue(true).then(() => {
        return;
      });
    });

    it("Sending trade request is disabled", () => {
      cy.getId("requestInput"); //.should('be.disabled')
      cy.getId("requestSendButton"); //.should('be.disabled')
    });

    it("Not enrolled popup", () => {
      cy.reload();
      cy.getId("requestPopupExistingTrade", 30000)
        .should("contain", "You already have an open trade!")
        .and(
          "contain",
          "You have to wait for your existing trade to be accepted or declined"
        );
    });

    it("Redirects to home on dismiss", () => {
      cy.reload();
      cy.getId("requestPopupExistingTrade")
        .find("svg")
        .click()
        .then(() => {
          cy.url({ timeout: 10000 }).should("include", "/dashboard");
        });
    });
  });
});
