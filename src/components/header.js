import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "gatsby";
import { navigate } from "@reach/router";
/**
 * Standardised header with configurable text
 * @param {string} pageName - header text
 * @param {string} backAction - determines if back button is shown
 */
const Header = ({ pageName = "Test", backAction = false }) => {
  const logoutProc = () => {
    firebase
      .auth()
      .signOut()
      .then(function (_) {
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="flex border-b-2 w-auto h-auto items-center">
      {backAction ? (
        <Link to="/dashboard">
          <div class="pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 12l9-8v6h15v4h-15v6z" />
            </svg>
          </div>
        </Link>
      ) : (
        <div></div>
      )}
      <h1
        class="font-bold text-5xl px-4 py-4 mr-auto"
        data-testId="headerPageName"
      >
        {pageName}
      </h1>
      <button
        class="rounded-button mx-8 my-4 px-6 py-2 primary-button-ns align-right self-center text-white"
        onClick={logoutProc}
        data-testId="logoutBtn"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
