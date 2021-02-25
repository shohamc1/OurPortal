import React from "react";
import { Helmet } from "react-helmet";

import { Link } from "gatsby";
import OriToor from "../../assets/oritoor.jpg";

const Landing = () => {
  return (
    <div class="flex w-screen h-screen">
      <Helmet title="OurPortal" />
      <img
        src={OriToor}
        class="object-cover md:w-1/2 w-auto h-auto"
        alt="Focus"
      />
      <div class="my-auto flex flex-col p-8">
        <span class="text-8xl font-bold tracking-tight">OurPortal</span>
        <span class="text-4xl font-bold mb-8 tracking-tight">
          Get your mods
        </span>
        <Link
          to="/login"
          class="mb-4 rounded-button bg-purple-700 border-2 border-purple-700 text-white py-4 px-8 text-center"
        >
          Login
        </Link>
        <Link
          to="/signup"
          class="mb-4 rounded-button text-purple-500 border-2 border-purple-500 py-4 px-8 text-center"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
