/// <reference types="cypress" />

describe("Login", () => {
  before(() => {
    cy.visit("/login");
  });

  it("Greets with Header and Slogan", () => {
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  describe("Normal Login", () => {
    it("Navigates to Dashboard on success", () => {
      cy.getId("loginEmail").type("yiern_goh@mymail.sutd.edu.sg");
      cy.getId("loginPassword").type("Test123!");
      cy.getId("loginBtn").click();
      cy.url().should("contain", "/dashboard");
      cy.getId("dashboardWelcome").should("contain", "Yi Ern");
    });
    it("Logout redirects to landing", () => {
      cy.getId("logoutBtn").click();
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include("something about the error");

        // using mocha's async done callback to finish
        // this test so we prove that an uncaught exception
        // was thrown
        done();

        // return false to prevent the error from
        // failing this test
        return false;
      });
      cy.url().should("eq", "http://localhost:8000/");
    });
  });

  describe("Bad Logins", () => {
    before(() => {
      cy.visit("/login");
    });

    afterEach(() => {
      cy.getId("loginEmail").clear();
      cy.getId("loginPassword").clear();
    });

    it("Invalid Email Format", () => {
      cy.getId("loginEmail").type("invalid");
      cy.getId("loginPassword").type("0");
      cy.getId("loginBtn").click();
      cy.getId("loginErrorMessage").should(
        "contain",
        "The email address is badly formatted."
      );
    });

    it("Invalid User", () => {
      cy.getId("loginEmail").type("invalid@test.com");
      cy.getId("loginPassword").type("0");
      cy.getId("loginBtn").click();
      cy.getId("loginErrorMessage").should(
        "contain",
        "There is no user record corresponding to this identifier. The user may have been deleted."
      );
    });

    it("Invalid password", () => {
      cy.getId("loginEmail").type("testuser@gmail.com");
      cy.getId("loginPassword").type("0");
      cy.getId("loginBtn").click();
      cy.getId("loginErrorMessage").should(
        "contain",
        "The password is invalid or the user does not have a password."
      );
    });

    it("Unverified email", () => {
      cy.getId("loginEmail").type("signuptest@mymail.sutd.edu.sg");
      cy.getId("loginPassword").type("Qwerty123!");
      cy.getId("loginBtn").click();
      cy.getId("loginErrorMessage").should(
        "contain",
        "Oops, your account has not been verified yet!" // change this
      );
    });
  });

  describe("Visit pages when unauthenticated blocked", () => {
    it("Visit Dashboard", () => {
      cy.visit("/dashboard").then(() => {
        cy.url({ timeout: 10000 }).should("not.include", "/dashboard");
      });
    });
    it("Visit Autotrade", () => {
      cy.visit("/autotrade").then(() => {
        cy.url({ timeout: 10000 }).should("not.include", "/autotrade");
      });
    });
    it("Visit Request", () => {
      cy.visit("/request").then(() => {
        cy.url({ timeout: 10000 }).should("not.include", "/request");
      });
    });
    it("Visit Enroll", () => {
      cy.visit("/dashboard").then(() => {
        cy.url({ timeout: 10000 }).should("not.include", "/enroll");
      });
    });
    it("Visit Admin", () => {
      cy.visit("/admin").then(() => {
        cy.url({ timeout: 10000 }).should("not.include", "/admin");
      });
    });
  });
});
