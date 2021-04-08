/// <reference types="cypress" />
const mods = ["02.136DH", "50.046", "50.044", "50.043"];
describe("Enroll", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.deleteMod(mods).then(() => {
      cy.visit("/enroll");
    });
  });
  after(() => {
    // cy.deleteMod(mods).then(() => {
    //   cy.wait(500);
    //   cy.logout();
    // });
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

  describe("Cart Usage", () => {
    it("Header displays 'Your Cart'", () => {
      cy.getId("cartHeader").should("contain", "Your Cart");
    });
    it("Empty cart displays 'Your cart is empty!", () => {
      cy.getId("cartContent").should("contain", "Your cart is empty!");
    });

    it("Add item to cart", () => {
      cy.getId("customSearchBoxInput").type("Hokama Rhema");
      cy.getId(mods[0]).find("button").click();
      cy.getId("cartContent").children().should("have.length", 1);
    });

    it("Remove item via module card", () => {
      cy.getId("customHitsResults")
        .find(`[data-testid='${mods[0]}']`)
        .find("button")
        .click();
      cy.getId("cartContent").should("contain", "Your cart is empty!");
    });

    it("Proceed button visible when cart has at least 1 item", () => {
      cy.getId(mods[0]).find("button").click();
      cy.getId("cart").find("button[class^=bg-green-500]").should("be.visible");
    });

    it("Select multiple items", () => {
      cy.getId("customSearchBoxInput").clear().type("50");
      cy.getId(mods[1]).find("button").click();
      cy.getId(mods[2]).find("button").click();
      cy.getId(mods[3]).find("button").click();
      cy.getId("cartContent").children().should("have.length", 4);
    });

    it("Success modal and empty cart upon success", () => {
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
            .and("contain", `${mods[0]}: Lyric Poetry`)
            .and(
              "contain",
              `${mods[1]}: Cloud Computing and Internet of Things`
            )
            .and("contain", `${mods[2]}: System Security`)
            .and("contain", `${mods[3]}: Database and Big Data Systems`);

          cy.get("svg").click();
        });
      cy.getId("cartContent").should("contain", "Your cart is empty!");
    });

    it("Searching for enrolled mods returns no results", () => {
      cy.getId("customSearchBoxInput").clear().type("02.136");
      cy.getId("customHitsResults").children().should("have.length", 0);
      cy.contains("You have reached the end of results.");
      cy.getId("customSearchBoxInput").clear().type("50.046");
      cy.getId("customHitsResults").children().should("have.length", 0);
      cy.contains("You have reached the end of results.");
      cy.getId("customSearchBoxInput").clear().type("50.044");
      cy.getId("customHitsResults").children().should("have.length", 0);
      cy.contains("You have reached the end of results.");
      cy.getId("customSearchBoxInput").clear().type("50.043");
      cy.getId("customHitsResults").children().should("have.length", 0);
      cy.contains("You have reached the end of results.");
    });

    it("Homepage shows successfully enrolled modules", () => {
      cy.visit("/dashboard");
      cy.getId("dashboardMods")
        .children({ timeout: 30000 })
        .should("have.length", 4);
      cy.getId(mods[0]).should("be.visible");
      cy.getId(mods[1]).should("be.visible");
      cy.getId(mods[2]).should("be.visible");
      cy.getId(mods[3]).should("be.visible");
    });

    // TODO clean up hardcoding by using fixtures instead
  });

  describe("Unenroll modules", () => {
    it("Toggle edit mode", () => {
      cy.getId("dashboardEdit").click();
      cy.getId(mods[0])
        .find("button")
        .should("have.attr", "data-testid", "editCardDelete");
      cy.getId(mods[1])
        .find("button")
        .should("have.attr", "data-testid", "editCardDelete");
      cy.getId(mods[2])
        .find("button")
        .should("have.attr", "data-testid", "editCardDelete");
      cy.getId(mods[3])
        .find("button")
        .should("have.attr", "data-testid", "editCardDelete");

      cy.getId("dashboardShow").click();
      cy.getId(mods[0]).find("button").should("not.exist");
      cy.getId(mods[1]).find("button").should("not.exist");
      cy.getId(mods[2]).find("button").should("not.exist");
      cy.getId(mods[3]).find("button").should("not.exist");
    });

    it("Unenroll HASS module", () => {
      cy.getId("dashboardEdit").click();
      cy.getId("editCardDelete").eq(0).click();
      cy.getId("dashboardMods").children().should("have.length", 3);
    });

    it("Find unenrolled module again", () => {
      cy.visit("/enroll");
      cy.getId("customSearchBoxInput").type(mods[0]);
      cy.getId(mods[0]).should("be.visible");
    });

    it("Unenroll all modules", () => {
      cy.visit("/dashboard");
      cy.getId("dashboardEdit").click();
      cy.getId("editCardDelete").each(($el, $index, $list) => {
        cy.wrap($el).click();
        cy.wait(500);
      });
      cy.getId("dashboardMods").children().should("have.length", 0);
    });

    it("Toggle show updates with no modules enrolled message", () => {
      cy.getId("dashboardShow").click();
      cy.contains("Seems like you have no modules yet.");
    });
  });

  describe("Warning modals when enrolling", () => {
    const extraMods = ["02.155TS", "20.302", "50.045"];
    before(() => {
      cy.visit("/enroll");
    });

    it("Different pillar warning", () => {
      cy.getId("customSearchBoxInput").type("50");
      cy.getId(mods[1]).find("button").click();
      cy.getId("customSearchBoxInput").clear().type("20");
      cy.getId(extraMods[1]).find("button").click();
      cy.getId("enrollModal", 10000)
        .should("be.visible")
        .and("contain", "Oops, this module is not from your pillar.")
        .find("svg")
        .click();
    });
    it("Enrolling in more than 3 pillar modules", () => {
      cy.getId("customSearchBoxInput").clear().type("50");
      cy.getId(mods[2]).find("button").click();
      cy.getId(mods[3]).find("button").click();
      cy.getId(extraMods[2]).find("button").click();
      cy.getId("enrollModal", 10000)
        .should("be.visible")
        .and(
          "contain",
          "Oops, you have already selected/enrolled in 3 pillar modules. Pick a HASS module instead."
        )
        .find("svg")
        .click();
      cy.getId("customHitsResults")
        .find(`[data-testid='${mods[3]}']`)
        .find("button")
        .click();
    });

    it("Enrolling in more than one HASS", () => {
      cy.getId("customSearchBoxInput").clear().type("02.1");
      cy.getId(mods[0]).find("button").click();
      cy.getId(extraMods[0]).find("button").click();
      cy.getId("enrollModal", 10000)
        .should("be.visible")
        .and("contain", "Oops, you can only enroll in one HASS module.")
        .find("svg")
        .click();
    });
    it("Enrolling in more than 4 modules", () => {
      cy.getId("customSearchBoxInput").clear().type("50");
      cy.getId(mods[3]).find("button").click();
      cy.getId(extraMods[2]).find("button").click();
      cy.getId("enrollModal", 10000)
        .should("be.visible")
        .and(
          "contain",
          "Oops, you have already selected/enrolled in 4 modules."
        )
        .find("svg")
        .click();
    });
  });
});
