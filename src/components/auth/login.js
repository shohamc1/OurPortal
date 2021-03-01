import React from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase";
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
  return (
    <div class="flex w-screen h-screen">
      <Helmet title="Login | OurPortal" />
      <div class="flex my-auto mx-auto flex-col">
        <span class="text-8xl font-bold tracking-tight">OurPortal</span>
        <span class="text-4xl font-bold mb-8 tracking-tight">
          Get your mods
        </span>
        <div class="flex flex-col rounded-lg bg-gray-300 p-4 px-6 mb-8">
          <span class="font-semibold text-lg">Username</span>
          <input
            type="email"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="john_doe"
          />
          <span class="font-semibold text-lg">Password</span>
          <input
            type="password"
            class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
            placeholder="********"
          />
        </div>
        <button class="bg-purple-500 rounded-button p-4 text-white">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
