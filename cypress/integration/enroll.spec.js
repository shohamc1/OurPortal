/// <reference types="cypress" />

describe("Enroll", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/enroll");
    //cy.deleteMod(["02.136DH", "50.046", "50.044", "50.043"]);
  });
  after(() => {
    cy.logout();
  });

  describe("Searching for Mods", () => {
    beforeEach(() => {
      cy.getId("customSearchBoxInput").clear();
    });

    after(() => {
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

  // describe("Module Card", () => {
  //   it("Colour corresponds to pillar", () => {});
  //   it("Availability indicator color", () => {});
  //   it("'+' button adds to cart, button changes to 'x'", () => {});
  //   it("'x' button removes from cart, button changes to '+'", () => {});
  //   it("disabled '+' when module is full", () => {});
  // });

  describe("Cart Usage", () => {
    it("Header displays 'Your Cart'", () => {
      cy.getId("cartHeader").should("contain", "Your Cart");
    });
    it("Empty cart displays 'Your cart is empty!", () => {
      cy.getId("cartContent").should("contain", "Your cart is empty!");
    });

    it("Proceed button visible when cart has at least 1 item", () => {
      cy.getId("customSearchBoxInput").type("Hokama Rhema");
      cy.getId("02.136DH").find("button").click();
      cy.getId("cart").find("button[class^=bg-green-500]").should("be.visible");
    });

    it("Select multiple items", () => {
      cy.getId("customSearchBoxInput").clear().type("50");
      cy.getId("50.046").find("button").click();
      cy.getId("50.044").find("button").click();
      cy.getId("50.043").find("button").click();
      cy.getId("cartContent").children().should("have.length", 4);
    });
    it("Module tab displays correct code and colour", () => {
      cy.getId("customSearchBoxInput").clear().type("40");
      cy.getId("40.324").find("button").click();
      cy.getId("customSearchBoxInput").clear().type("30");
      cy.getId("30.316").find("button").click();
      cy.getId("customSearchBoxInput").clear().type("20");
      cy.getId("20.223").find("button").click();
      cy.getId("cartContent").within(() => {
        cy.getId("02.136DH")
          .should("have.class", "border-pastel-red")
          .and("contain", "02.136DH");
        cy.getId("50.046")
          .should("have.class", "border-pastel-turquoise")
          .and("contain", "50.046");
        cy.getId("40.324")
          .should("have.class", "border-pastel-blue")
          .and("contain", "40.324");
        cy.getId("30.316")
          .should("have.class", "border-pastel-mint")
          .and("contain", "30.316");
        cy.getId("20.223")
          .should("have.class", "border-pastel-yellow")
          .and("contain", "20.223");
      });
    });

    it("Remove items via module tab", () => {
      cy.getId("cartContent").within(() => {
        cy.getId("40.324").find("button").click();
        cy.getId("30.316").find("button").click();
        cy.getId("20.223").find("button").click();
      });
      cy.getId("cartContent").children().should("have.length", 4);
    });

    it("Checkout successfully with success modal", () => {
      cy.getId("cart").find("button[class^=bg-green-500]").click();
      cy.getId("enrollModal", 30000)
        .should("be.visible")
        .and("have.class", "bg-green-500")
        .within(() => {
          cy.get("p").should(
            "contain",
            "You have successfully enrolled into the following modules"
          );
          cy.getId("enrollMods")
            .should("have.length", 4)
            .and("contain", "02.136DH: Lyric Poetry")
            .and("contain", "50.046: Cloud Computing and Internet of Things")
            .and("contain", "50.044: System Security")
            .and("contain", "50.043: Database and Big Data Systems");

          cy.get("svg").click();
        });
      cy.getId("cartContent").should("contain", "Your cart is empty!");
    });

    it("Homepage shows successfully enrolled modules", () => {
      cy.visit("/dashboard");
      cy.getId("dashboardMods", 30000).children().should("have.length", 4);
      cy.getId("02.136DH").should("be.visible");
      cy.getId("50.046").should("be.visible");
      cy.getId("50.044").should("be.visible");
      cy.getId("50.043").should("be.visible");
      cy.deleteMod(...["02.136DH", "50.046", "50.044", "50.043"]);
    });

    // it("Proceed clears cart and enrolls user", () => {});
    // it("Proceed clears cart and rejects user when module is full", () => {});
  });
});
