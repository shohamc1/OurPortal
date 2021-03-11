import React, { useState } from "react";

/**
 * Card to display user's selected module with configurable text.
 * @param {number} selectionIndex -
 * @param {string} courseCode - course code
 * @param {string} courseName - course name
 * @function onWeightageUpdate - callback to pass weightage value to trade.js //no idea if this is correct way to document
 */

const EmptyModuleCard = () => {
  return (
    <div class="flex flex-row rounded items-center 2xl:self-center bg-gray-50 w-auto 2xl:w-3/4 h-auto shadow-md overflow-hidden my-2 px-4 py-2">
      <div class="text-base px-2 hidden">{0} </div>
      <div class="text-lg xl:text-2xl text-gray-500 font-semibold px-2 py-2 w-24 xl:w-32">
        {"XX.XXX"}
      </div>
      <div class="mx-2 my-2 xl:text-lg text-gray-500">No module selected</div>
      <div class="flex items-center ml-auto mr-4">
        <input
          class="mr-4 w-12 2xl:w-14 xl:text-lg text-gray-800 bg-gray-50 border-gray-500 border-b 
        placeholder-gray-400 text-center no-spin 
        focus:outline-none focus:border-purple-500 focus:placeholder-opacity-40"
          placeholder="0"
          disabled
        ></input>
        <span class="inline-block ">
          <svg
            class="stroke-current text-gray-500 stroke-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18.7742 18.7742"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 18.7744L18.7742 6.00022"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EmptyModuleCard;
