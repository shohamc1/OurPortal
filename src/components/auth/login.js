import React, { useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCsNTpDcTDvEvjGdNrCECgQ5vnWga2pO9s",
  authDomain: "ourportal-e0a9c.firebaseapp.com",
  databaseURL: "https://ourportal-e0a9c-default-rtdb.firebaseio.com",
  projectId: "ourportal-e0a9c",
  storageBucket: "ourportal-e0a9c.appspot.com",
  messagingSenderId: "569619605040",
  appId: "1:569619605040:web:5d6bb04aea40940c5a6ff5",
  measurementId: "G-6KGX9H2DNY",
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(false);

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

  const emailLoginProc = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (user) {
        // Add to database
        // firebase
        //   .database()
        //   .ref("users/" + user.user.uid)
        //   .update({
        //     email: user.user.email,
        //     source: user.user.providerData[0].providerId,
        //     uid: user.user.uid,
        //   });
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        setSignInError(error.message);
      });
  };

  return (
    <div class="flex flex-col w-screen h-screen">
      <Helmet title="Login | OurPortal" />
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
            data-testid="loginEmail"
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
            data-testid="loginPassword"
          />
        </div>
        <button
          class="bg-purple-500 rounded-button p-4 text-white"
          onClick={emailLoginProc}
          data-testid="loginBtn"
        >
          Log In
        </button>
      </div>
      {signInError && (
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
          <div class="w-full" data-testid="errorMessage">
            {signInError}
          </div>
          <button
            class="flex flex-auto flex-row-reverse"
            onClick={(e) => {
              e.preventDefault();
              setSignInError(false);
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

export default Login;
