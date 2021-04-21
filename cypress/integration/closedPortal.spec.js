/// <reference types="cypress" />

describe("Enrollment Closed", () => {
  before(() => {
    cy.visit("/");
    cy.login();
  });

  after(() => {
    cy.setEnrollmentEnd(false).then(() => {
      cy.logout();
    });
  });

  describe("Before start date", () => {
    before(() => {
      cy.setEnrollmentStart(true).then(() => {
        cy.visit("/dashboard");
      });
    });
    after(() => {
      cy.setEnrollmentStart(false).then(() => {
        return;
      });
    });
    it("Dashboard still accessible", () => {
      cy.getId("dashboardWelcome", 20000).should("contain", "Yi Ern");
    });
    it("AutoTrade page shows enrollment closed", () => {
      cy.visit("/autotrade");
      cy.getId("closedPortalMessage", 20000).should(
        "contain",
        "Enrollment has not started!"
      );
    });

    it("P2P page shows enrollment closed", () => {
      cy.visit("/request");
      cy.getId("closedPortalMessage", 20000).should(
        "contain",
        "Enrollment has not started!"
      );
    });

    it("Enrollment page popup", () => {
      cy.visit("/enroll");
      cy.getId("enrollmentPeriodModal", 20000)
        .should("exist")
        .and(
          "contain",
          "Browsing is permitted outside of the enrollment period, but please note that you will not be able to add any modules to your cart."
        );
    });

    it("Popup dismissable", () => {
      cy.getId("enrollmentPeriodModal").find("svg").click();
    });

    it("Cannot add item to cart", () => {
      cy.getId("customSearchBoxInput").type("20");
      cy.getId("20.304").find("button").should("be.disabled");
      cy.getId("20.301").find("button").should("be.disabled");
      cy.getId("20.302").find("button").should("be.disabled");
    });
  });
  describe("After end date", () => {
    before(() => {
      cy.setEnrollmentEnd(true).then(() => {
        cy.visit("/dashboard");
      });
    });
    it("Dashboard still accessible", () => {
      cy.getId("dashboardWelcome").should("contain", "Yi Ern");
    });
    it("AutoTrade page shows enrollment closed", () => {
      cy.visit("/autotrade");
      cy.getId("closedPortalMessage", 20000).should(
        "contain",
        "Enrollment has not started!"
      );
    });

    it("P2P page shows enrollment closed", () => {
      cy.visit("/request");
      cy.getId("closedPortalMessage", 20000).should(
        "contain",
        "Enrollment has not started!"
      );
    });

    it("Enrollment page popup", () => {
      cy.visit("/enroll");
      cy.getId("enrollmentPeriodModal", 20000)
        .should("exist")
        .and(
          "contain",
          "Browsing is permitted outside of the enrollment period, but please note that you will not be able to add any modules to your cart."
        );
    });

    it("Popup dismissable", () => {
      cy.getId("enrollmentPeriodModal").find("svg").click();
    });

    it("Cannot add item to cart", () => {
      cy.getId("customSearchBoxInput").type("20");
      cy.getId("20.304").find("button").should("be.disabled");
      cy.getId("20.301").find("button").should("be.disabled");
      cy.getId("20.302").find("button").should("be.disabled");
    });
  });
});
