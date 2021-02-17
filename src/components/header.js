import React from "react";

const Header = ({ pageName = "Test" }) => {
  return (
    <div class="flex border-b-2 w-auto h-auto items-center">
      <h1 class="font-bold text-5xl px-8 py-4 mr-auto">{pageName}</h1>
      <button class="rounded-button mx-8 my-4 px-4 py-1 border-purple-500 border-2 hover:bg-purple-500 align-right self-center">
        Sign Out
      </button>
    </div>
  );
};

export default Header;
