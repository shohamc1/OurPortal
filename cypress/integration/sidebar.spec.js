/// <reference types="cypress"/>

describe("Sidebar and Header", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/dashboard");
  });

  after(() => {
    cy.logout();
  });

  it("All links displayed with intended spelling", () => {
    cy.getId("sideBarOurPortal")
      .should("have.attr", "href", "/dashboard")
      .find("h1")
      .should("contain", "OurPortal");
    cy.getId("sideBarHome")
      .should("have.attr", "href", "/dashboard")
      .find("span")
      .should("contain", "Home");
    cy.getId("sideBarEnroll")
      .should("have.attr", "href", "/enroll")
      .find("span")
      .should("contain", "Enroll");
    cy.getId("sideBarPeer")
      .should("have.attr", "href", "/request")
      .find("span")
      .should("contain", "P2P Trade");
    cy.getId("sideBarAuto")
      .should("have.attr", "href", "/autotrade")
      .find("span")
      .should("contain", "Auto Trade");
  });

  it('P2P Trade highlighted and header is "P2P Trade" ', () => {
    cy.getId("sideBarPeer").click();
    cy.getId("headerPageName").should("contain", "P2P Trade Request");
    cy.getId("sideBarPeer")
      .should("have.class", "primary-button")
      .find("path")
      .should(($path) => {
        expect($path).to.have.attr("stroke", "#F5F6F8");
      });
  });
  it('Auto Trade highlighted and header is "Auto Trade" ', () => {
    cy.getId("sideBarAuto").click();
    cy.getId("headerPageName").should("contain", "Auto Trade");
    cy.getId("sideBarAuto")
      .should("have.class", "primary-button")
      .find("path")
      .should(($path) => {
        expect($path).to.have.attr("stroke", "#F5F6F8");
      });
  });
  it('Home highlighted and header is "Overview"', () => {
    cy.getId("sideBarHome").click();
    cy.getId("headerPageName").should("contain", "Overview");
    cy.getId("sideBarHome")
      .should("have.class", "primary-button")
      .find("path")
      .should(($path) => {
        expect($path).to.have.attr("stroke", "#F5F6F8");
      });
  });

  it('Enroll display empty cart and header is "Enroll"', () => {
    cy.getId("sideBarEnroll").click();
    cy.getId("headerPageName").should("contain", "Enroll");
    cy.getId("cartHeader").should("contain", "Your Cart");
    cy.getId("sideBarHome").should("not.exist");
    cy.getId("sideBarEnroll").should("not.exist");
    cy.getId("sideBarPeer").should("not.exist");
    cy.getId("sideBarAuto").should("not.exist");
  });
});
