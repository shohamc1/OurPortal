import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpError, setSignUpError] = useState(false);

  // const DB = firebase.firestore();
  // const AUTH = firebase.auth();
  // if (window.location.hostname === "localhost" && !DB) {
  // if (window.Cypress) {
  //   console.log("USING EMULATOR");
  //   DB.settings({ experimentalForceLongPolling: true });
  //   DB.useEmulator("localhost", 8080);
  //   AUTH.useEmulator("http://localhost:9099");
  // }

  const db = firebase.firestore().collection("users");

  const handleEmailChange = (event) => {
    const target = event.target;
    const value = target.value;

    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const target = event.target;
    const value = target.value;

    setPassword(value);
  };

  const handleFirstNameChange = (event) => {
    const target = event.target;
    const value = target.value;

    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const target = event.target;
    const value = target.value;

    setLastName(value);
  };

  const signUpProc = () => {
    if (password.length < 6) {
      setSignUpError("Password must contain at least 6 characters");
    } else if (password.length > 40) {
      setSignUpError("Password cannot exceed 40 characters");
    } else if (!password.match(/\d/)) {
      setSignUpError("Password must contain at least one number");
    } else if (!password.match(/[a-z]/)) {
      setSignUpError("Password must contain at least one lowercase character");
    } else if (!password.match(/[A-Z]/)) {
      setSignUpError("Password must contain at least one uppercase character");
    } else if (!password.match(/[@$!%*#?&]/)) {
      setSignUpError("Password must contain at least one special character");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log(user);
          db.doc(user.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: user.user.email,
            uid: user.user.uid,
            modules: [],
          });
        })
        .catch(function (error) {
          var errorMessage = error.message;
          setSignUpError(errorMessage);
        });
    }
  };

  const passwordTooltip = (
    <span>
      Password must be 6-40 characters in length and contain at least
      <br />
      one number, one lowercase letter, one uppercase letter and one
      <br />
      special character (@ $ ! % * # ? &)
    </span>
  );

  return (
    <div class="flex flex-col w-screen h-screen">
      <Helmet title="Signup | OurPortal" />
      <div class="flex my-auto mx-auto flex-col px-2 w-6/12">
        <span class="text-6xl md:text-8xl font-bold tracking-tight">
          OurPortal
        </span>
        <span class="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
          Get Your Mods
        </span>
        <div class="flex flex-col rounded-lg bg-gray-300 p-4 px-6 mb-8">
          <span class="font-semibold text-lg">Email</span>
          <input
            name="email"
            autoComplete="email"
            type="email"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="john_doe@mymail.sutd.edu.sg"
            value={email}
            onChange={handleEmailChange}
          />
          <div class="flex flex-row">
            <span class="font-semibold text-lg">Password</span>
            <a
              class="cursor-default ml-2 my-auto"
              data-tip
              data-for="passwordRequirements"
            >
              <svg
                fill="#425563"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18px"
                height="18px"
              >
                <path d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 12 2 C 17.523438 2 22 6.476563 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476563 22 2 17.523438 2 12 C 2 6.476563 6.476563 2 12 2 Z M 12 5.8125 C 11.816406 5.8125 11.664063 5.808594 11.5 5.84375 C 11.335938 5.878906 11.183594 5.96875 11.0625 6.0625 C 10.941406 6.15625 10.851563 6.285156 10.78125 6.4375 C 10.710938 6.589844 10.6875 6.769531 10.6875 7 C 10.6875 7.226563 10.710938 7.40625 10.78125 7.5625 C 10.851563 7.71875 10.941406 7.84375 11.0625 7.9375 C 11.183594 8.03125 11.335938 8.085938 11.5 8.125 C 11.664063 8.164063 11.816406 8.1875 12 8.1875 C 12.179688 8.1875 12.371094 8.164063 12.53125 8.125 C 12.691406 8.085938 12.816406 8.03125 12.9375 7.9375 C 13.058594 7.84375 13.148438 7.71875 13.21875 7.5625 C 13.289063 7.410156 13.34375 7.226563 13.34375 7 C 13.34375 6.769531 13.289063 6.589844 13.21875 6.4375 C 13.148438 6.285156 13.058594 6.15625 12.9375 6.0625 C 12.816406 5.96875 12.691406 5.878906 12.53125 5.84375 C 12.371094 5.808594 12.179688 5.8125 12 5.8125 Z M 10.78125 9.15625 L 10.78125 18.125 L 13.21875 18.125 L 13.21875 9.15625 Z" />
              </svg>
            </a>
            <ReactTooltip
              id="passwordRequirements"
              type="light"
              place="top"
              effect="solid"
              multiline
              backgroundColor="#d1dbda"
            >
              {passwordTooltip}
            </ReactTooltip>
          </div>

          <input
            name="current-password"
            autoComplete="current-password"
            type="password"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
          <span class="font-semibold text-lg">First Name</span>
          <input
            autoComplete="given-name"
            type="text"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="Hugh"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <span class="font-semibold text-lg">Last Name</span>
          <input
            autoComplete="family-name"
            type="text"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="Jass"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <button
          class="bg-purple-500 rounded-button p-4 text-white"
          onClick={signUpProc}
        >
          Sign Up
        </button>
      </div>
      {signUpError && (
        <div class="flex justify-center items-center mt-4 p-4 bg-red-500 text-white">
          <div class="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-info w-5 h-5 mx-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div class="w-full" data-testid="signUpErrorMessage">
            {signUpError}
          </div>
          <button
            class="flex flex-auto flex-row-reverse"
            onClick={(e) => {
              e.preventDefault();
              setSignUpError(false);
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="hover:text-red-600 cursor-pointer rounded-full w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
