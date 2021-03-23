import React, { useState } from "react";
import { Helmet } from "react-helmet";

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
  };

  return (
    <div class="flex flex-col w-screen h-screen">
      <Helmet title="Signup | OurPortal" />
      <div class="flex my-auto mx-auto flex-col px-2">
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
          <span class="font-semibold text-lg">Password</span>
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
