/// <reference types="cypress" />

describe("Admin", () => {
  before(() => {
    cy.visit("/");
    cy.adminLogin();
  });
  after(() => {
    cy.logout();
  });

  describe("Admin User", () => {
    it("Access the admin page", () => {
      cy.visit("/admin");
      cy.getId("headerPageName").should("contain", "Admin Portal");
      cy.getId("welcomeMessage").should("contain", "Hello Admin!");
      cy.getId("logoutBtn").should("exist");
      cy.getId("adminError").should("not.exist");
    });
    it("Admin page has export csv", () => {
      cy.getId("adminExport").should("not.be.disabled");
    });
  });

  describe("Non Admin User", () => {
    before(() => {
      cy.logout().then(() => {
        cy.login();
      });
    });
    it("Non Admin User blocked", () => {
      cy.visit("/admin");
      cy.getId("adminError")
        .should("contain", "You're not an admin!")
        .and(
          "contain",
          "If you aren't supposed to see this, contact the administrators."
        );
      cy.getId("adminExport").should("not.exist");
    });
  });
});
