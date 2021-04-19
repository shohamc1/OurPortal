/// <reference types="cypress" />

describe("Signup", () => {
  before(() => {
    cy.visit("/");
    cy.loginDelete().then(() => {
      cy.visit("/signup");
    });
  });

  it("Greets with Header and Slogan", () => {
    cy.contains("OurPortal").should("exist");
    cy.contains("Get Your Mods").should("exist");
  });

  describe("Invalid Signup", () => {
    describe("Empty fields", () => {
      before(() => {
        cy.get("[type='email']").type("x");
        cy.get("[type='password']").type("x");
        cy.get("[autoComplete='given-name']").type("x");
        cy.get("[autoComplete='family-name']").type("x");
      });
      after(() => {
        cy.get("[type='email']").clear();
        cy.get("[type='password']").clear();
        cy.get("[autoComplete='given-name']").clear();
        cy.get("[autoComplete='family-name']").clear();
      });

      it("Missing email", () => {
        cy.get("[type='email']").clear();
        cy.signUpCheckError("Please fill in all fields");
      });
      it("Missing password", () => {
        cy.get("[type='email']").type("x");
        cy.get("[type='password']").clear();
        cy.signUpCheckError("Please fill in all fields");
      });
      it("Missing last name", () => {
        cy.get("[type='password']").type("x");
        cy.get("[autoComplete='given-name']").clear();
        cy.signUpCheckError("Please fill in all fields");
      });
      it("Missing first name", () => {
        cy.get("[autoComplete='given-name']").type("x");
        cy.get("[autoComplete='family-name']").clear();
        cy.signUpCheckError("Please fill in all fields");
      });
    });
    describe("Invalid passwords", () => {
      before(() => {
        cy.get("[type='email']").type("yiern_goh@mymail.sutd.edu.sg");
        cy.get("[autoComplete='given-name']").type("x");
        cy.get("[autoComplete='family-name']").type("x");
      });

      after(() => {
        cy.get("[type='email']").clear();
        cy.get("[type='password']").clear();
        cy.get("[autoComplete='given-name']").clear();
        cy.get("[autoComplete='family-name']").clear();
      });

      it("Password < 6 characters", () => {
        cy.get("[type='password']").type("a");
        cy.signUpCheckError("Password must contain at least 6 characters");
        cy.get("[type='password']").type("A");
        cy.signUpCheckError("Password must contain at least 6 characters");
        cy.get("[type='password']").type("1");
        cy.signUpCheckError("Password must contain at least 6 characters");
        cy.get("[type='password']").type("!");
        cy.signUpCheckError("Password must contain at least 6 characters");
      });

      it("Password has no number ", () => {
        cy.get("[type='password']").clear().type("abcdef");
        cy.signUpCheckError("Password must contain at least one number");

        cy.get("[type='password']").clear().type("Abcdef");
        cy.signUpCheckError("Password must contain at least one number");

        cy.get("[type='password']").type("!");
        cy.signUpCheckError("Password must contain at least one number");
      });

      it("Password has no uppercase", () => {
        cy.get("[type='password']").clear().type("abcde1");
        cy.signUpCheckError(
          "Password must contain at least one uppercase character"
        );

        cy.get("[type='password']").type("!");
        cy.signUpCheckError(
          "Password must contain at least one uppercase character"
        );
      });

      it("Password has no special character", () => {
        cy.get("[type='password']").clear().type("Abcde1");
        cy.signUpCheckError(
          "Password must contain at least one special character"
        );
      });

      it("Password > 40 characters", () => {
        cy.get("[type='password']")
          .clear()
          .type("Averyveryveryveryverylongpasswordisthisvalid!123");
        cy.signUpCheckError("Password cannot exceed 40 characters");
      });
    });

    describe("Invalid Email", () => {
      before(() => {
        cy.get("[type='password']").clear().type("Valid1!");
        cy.get("[autoComplete='given-name']").type("x");
        cy.get("[autoComplete='family-name']").type("x");
      });
      // checks password before email
      it("Existing User", () => {
        cy.get("[type='email']").type("yiern_goh@mymail.sutd.edu.sg");
        cy.signUpCheckError(
          "The email address is already in use by another account."
        );
      });
      it("Badly formatted email", () => {
        cy.get("[type='email']").clear().type("<@#!test>@gmail.com");
        cy.signUpCheckError("Please use your SUTD email to sign up");
      });
      it("External email domain", () => {
        cy.get("[type='email']").clear().type("test@gmail.com");
        cy.signUpCheckError("Please use your SUTD email to sign up");
      });
    });
  });
});

describe("Valid signup", () => {
  before(() => {
    cy.visit("/signup");
  });

  it("Successful Signup", () => {
    const email = "signuptest@mymail.sutd.edu.sg";
    cy.get("[type='email']").type(email);
    cy.get("[type='password']").type("Qwerty123!");
    cy.get("[autoComplete='given-name']").type("Ben");
    cy.get("[autoComplete='family-name']").type("Dover");
    cy.get("button").contains("Sign Up").click();
    cy.getId("signUpErrorMessage")
      .should("contain", `A verification email has been sent to ${email}!`)
      .parent()
      .should("have.class", "bg-green-500");
  });
});
/*TODO fix the name to not accept empty/numbers/symbols  */
// it("Invalid First Name ", () => {
//  cy.get("[type='email']").type("@gmail.com");
//  cy.get("button").contains("Sign Up").click();
// /*assert some error message to appear */
// });

// it("Invalid Last Name ", () => {
//   cy.get("[autoComplete='given-name']").clear().type("validname");
//   cy.get("button").contains("Sign Up").click();
// /*assert some error message to appear */
// });
