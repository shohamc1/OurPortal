import React from "react";
import OriToor from "../assets/oritoor.jpg";

const Landing = () => {
  return (
    <div class="flex w-screen h-screen">
      <img src={OriToor} class="w-auto h-auto" />
      <div class="my-auto flex flex-col p-4">
        <span class="text-8xl font-bold">OurPortal</span>
        <span class="text-4xl font-bold mb-8">Get your mods</span>
        <button class="mb-4 rounded-button bg-purple-700 border-2 border-purple-700 text-white py-4 px-8">
          Login
        </button>
        <button class="mb-4 rounded-button text-purple-500 border-2 border-purple-500 py-4 px-8">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
