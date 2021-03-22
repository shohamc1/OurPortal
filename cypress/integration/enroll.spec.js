/// <reference types="cypress" />

describe("Enroll", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/enroll");
  });
  after(() => {
    cy.logout();
  });

  describe("Search", () => {
    it("Modules displayed with no text in search", () => {
      cy.getId("customSearchBoxInput").clear();
      cy.getId("customHitsResults").children().should("have.length", 20);
    });
    it("Search based on professor", () => {});
    it("Search based on module name", () => {});
    it("Search based on module code", () => {});
    it("No results displays 'No results' message", () => {});
  });

  describe("Module Card", () => {
    it("Colour corresponds to pillar", () => {});
    it("Availability indicator color", () => {});
    it("Layout with no professor", () => {});
    it("Layout with Professor", () => {});
    it("'+' button adds to cart, button changes to 'x'", () => {});
    it("'x' button removes from cart, button changes to '+'", () => {});
    it("disabled '+' when module is full", () => {});
  });

  describe("Cart", () => {
    it("Empty cart displays 'Your cart is empty!'", () => {});

    it("Proceed button visible when cart has at least 1 item", () => {
      cy.getId("moduleCard").find();
    });

    it("Module tab displays correct code and colour", () => {});

    it("Select multiple items", () => {});

    it("Disable selecting when cart size exceeds 7", () => {});

    it("Remove items from cart", () => {});

    // it("Proceed clears cart and enrolls user", () => {});
    // it("Proceed clears cart and rejects user when module is full", () => {});
  });
});
