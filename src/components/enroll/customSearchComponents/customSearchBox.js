import React from "react";
import { connectSearchBox, connectPoweredBy } from "react-instantsearch-dom";

const CustomPoweredBy = connectPoweredBy(({ url }) => (
  <a class="ml-2 text-xs w-auto self-center text-right" href={url}>
    Powered by Algolia
  </a>
));

const SearchBox = ({ currentRefinement, refine }) => (
  <div class="flex flex-row w-full border-b-2 py-4 px-4 mb-4 self-center sticky top-0 z-10 bg-white">
    <svg
      class="mr-4"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
        stroke="#14142B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 22L18 18"
        stroke="#14142B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <input
      class="w-auto flex-grow placeholder-gray-500 text-lg font-medium"
      type="input"
      placeholder="Search"
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
    />

    <button class="pr-2 xl:pr-4 border-r-2" onClick={(e) => refine("")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
      >
        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
      </svg>
    </button>

    <CustomPoweredBy />
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
