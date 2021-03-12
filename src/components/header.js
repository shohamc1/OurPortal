import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
/**
 * Standardised header with configurable text
 * @param {string} pageName - header text
 */
const Header = ({ pageName = "Test" }) => {
  const logoutProc = () => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="flex border-b-2 w-auto h-auto items-center">
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
