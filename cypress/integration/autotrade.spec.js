/// <reference types="cypress" />
const mods = [];
describe("Auto Trade", () => {
  before(() => {
    cy.fixture("autoTradeMods").then((autoTradeMods) => {
      autoTradeMods.modules.forEach(($mod) => {
        let mod = {
          courseCode: $mod.courseCode,
          weightage: parseInt($mod.weightage),
        };
        mods.push(mod);
      });
    });
    cy.visit("/");
    cy.login();
    cy.visit("/autotrade");
  });
  after(() => {
    cy.removeAutoTradeMods(mods);
    cy.deleteMod(["02.136DH"]);
    cy.logout();
  });

  it("Dismissiable information tab on visit", () => {
    cy.getId("tradeInfoTab")
      .should("be.visible")
      .and("contain", "Information")
      .find("button")
      .click();
  });

  describe("No enrolled module", () => {
    it("No module message in current module card", () => {
      cy.getId("currentModuleCard").should(
        "contain",
        "You are currently not enrolled in a module eligible for trade"
      );
      cy.getId("currentModuleCard").find("svg").should("be.visible");
    });

    it("All 3 selected cards are empty", () => {
      cy.getId("emptyModuleCard").should("have.length", 3);
    });

    it("Search is disabled", () => {
      cy.getId("tradeSearchButton").should("be.disabled");
    });

    it("Update is disabled", () => {
      cy.getId("tradeUpdateButton").should("be.disabled");
    });
  });

  describe("With enrolled module", () => {
    before(() => {
      cy.enrollMod(["02.136DH"]);
      cy.reload();
    });
    it("Currently enrolled module displayed", () => {
      cy.getId("currentModuleCard", 60000)
        .should("contain", "02.136DH")
        .and("contain", "Lyric Poetry");
    });

    it("All 3 selected cards are empty", () => {
      cy.getId("emptyModuleCard").should("have.length", 3);
    });

    it("Search is enabled", () => {
      cy.getId("tradeSearchButton").should("not.be.disabled");
    });

    it("Update is disabled", () => {
      cy.getId("tradeUpdateButton").should("be.disabled");
    });
  });

  describe("Search for Modules", () => {
    it("Navigate to search", () => {
      cy.getId("tradeSearchButton").click();
      cy.getId("customSearchBoxInput").should("exist");
      cy.getId("cartHeader").should("contain", "Selected");
      cy.getId("cartContent").should(
        "contain",
        "You have not selected any modules!"
      );
    });

    it("Non-HASS modules do exist", () => {
      cy.getId("customSearchBoxInput").type("50.");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
      cy.getId("customSearchBoxInput").clear().type("40.");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
      cy.getId("customSearchBoxInput").clear().type("30.");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
      cy.getId("customSearchBoxInput").clear().type("20.");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
      cy.getId("customSearchBoxInput").clear().type("10.");
      cy.getId("customHitsMessage").should(($message) => {
        expect($message).to.contain("No results");
        expect($message).to.contain("Try changing your search term.");
      });
    });

    it("Alert when more than 3 modules selected", () => {
      cy.getId("customSearchBoxInput").clear();
      cy.getId(mods[0].courseCode).find("button").click();
      cy.getId(mods[1].courseCode).find("button").click();
      cy.getId(mods[2].courseCode).find("button").click();

      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.getId("02.155TS")
        .find("button")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "You have already selected 3 modules. Remove one to add a new one."
          );
        });
      cy.getId("cartContent").children().should("have.length", 3);
    });

    it("Selected modules persist when navigating back to search", () => {
      cy.getId("cart").find("a").click();
      cy.getId("tradeSearchButton").click();
      cy.getId("cartContent")
        .children()
        .should("have.length", 3)
        .and("contain", mods[0].courseCode)
        .and("contain", mods[1].courseCode)
        .and("contain", mods[2].courseCode);
      cy.getId("cart").find("a").click();
    });
  });

  describe("Assign weightage", () => {
    it("Selected modules reflected in main autotrade page", () => {
      cy.getId("selectedModuleCard")
        .should("have.length", 3)
        .each((card, index) => {
          cy.wrap(card)
            .should("contain", mods[index].courseCode)
            .find("input")
            .should("have.value", "");
        });
    });
    it("Remaining Weightage is 100", () => {
      cy.getId("tradeRemainingWeightage")
        .should("contain", "100")
        .and("have.class", "bg-red-700");
    });

    it("Invalid characters blocked", () => {
      cy.getId("selectedModuleCard")
        .eq(0)
        .find("input")
        .type("+-./x")
        .should("have.value", "");
    });

    it("Max weightage is 100", () => {
      cy.getId("selectedModuleCard")
        .eq(0)
        .find("input")
        .type("1000")
        .should("have.value", "100")
        .clear()
        .type("299")
        .should("have.value", mods[0].weightage);
    });
    it("Total weightage > 100 blocks trade and shows warning", () => {
      cy.getId("selectedModuleCard").each((card, index) => {
        if (index !== 0) {
          cy.wrap(card).find("input").type("50");
        }
      });
      cy.getId("tradeUpdateButton").should("be.disabled");
      cy.getId("tradeExceedWeightage")
        .should("be.visible")
        .and("contain", "Negative weights not allowed");
      cy.getId("tradeRemainingWeightage")
        .should("contain", "-29")
        .and("have.class", "bg-red-700");
    });

    it("Update valid weightage assignment", () => {
      cy.getId("selectedModuleCard")
        .eq(2)
        .find("input")
        .clear()
        .type(mods[2].weightage);
      cy.getId("tradeRemainingWeightage")
        .should("contain", "0")
        .and("have.class", "bg-green-500");
      cy.getId("tradeUpdateButton").should("not.be.disabled").click();
      cy.getId("tradeUpdateMessage", 30000).should(
        "contain",
        "Your Selection is Updated"
      );
    });

    it("Weightage assigment persists when changing pages", () => {
      cy.getId("sideBarHome").click();
      cy.getId("sideBarAuto").click();
      cy.wait(1000);
      cy.getId("selectedModuleCard")
        .should("have.length", 3)
        .each((card, index) => {
          cy.wrap(card)
            .should("contain", mods[index].courseCode)
            .find("input")
            .should("have.value", mods[index].weightage);
        });
      // .should((cards) => {
      //   cy.wrap(cards[0])
      //     .should("contain", "02.231TS")
      //     .find("input")
      //     .should("contain", "29");
      //   cy.wrap(cards[1])
      //     .should("contain", "02.230TS")
      //     .find("input")
      //     .should("contain", "50");
      //   cy.wrap(cards[2])
      //     .should("contain", "02.219TS")
      //     .find("input")
      //     .should("contain", "21");
      // });
      // cy.getId("selectedModuleCard")
      //   .should("have.length", 3)
      //   .and("contain", "02.231TS")
      //   .and("contain", "02.230TS")
      //   .and("contain", "02.219TS");

      cy.get("tradeUpdateMessage").should("not.exist");
    });
  });
});
