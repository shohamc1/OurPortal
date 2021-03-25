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
    beforeEach(() => {
      cy.getId("customSearchBoxInput").clear();
    });

    it("Modules displayed with no text in search", () => {
      cy.getId("customHitsResults", 30000).children().should("have.length", 20);
      cy.contains("You have reached the end of results.");
    });
    it("Search based on professor", () => {
      cy.getId("customSearchBoxInput").type("Hokama Rhema");
      cy.getId("customHitsResults", 30000).children().should("have.length", 2);
      cy.getId("02.136DH").should("be.visible");
      cy.getId("02.127DH").should("be.visible");
      cy.contains("You have reached the end of results.");
    });
    it("Search based on module name", () => {
      cy.getId("customSearchBoxInput").type("Computer Vision");
      cy.getId("customHitsResults", 30000).children().should("have.length", 1);
      cy.getId("50.035").should("be.visible");
      cy.contains("You have reached the end of results.");
    });
    it("Search based on module code", () => {
      cy.getId("customSearchBoxInput").type("01.107");
      cy.getId("customHitsResults", 30000).children().should("have.length", 1);
      cy.getId("01.107").should("be.visible");
      cy.contains("You have reached the end of results.");
    });
    it("No results displays 'No results' message", () => {
      cy.getId("customSearchBoxInput").type("1111111");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
    });
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
      //cy.getId("moduleCard").find();
    });

    it("Module tab displays correct code and colour", () => {});

    it("Select multiple items", () => {});

    it("Disable selecting when cart size exceeds 7", () => {});

    it("Remove items from cart", () => {});

    // it("Proceed clears cart and enrolls user", () => {});
    // it("Proceed clears cart and rejects user when module is full", () => {});
  });
});
