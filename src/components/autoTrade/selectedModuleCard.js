import React from "react";

const SelectedModuleCard = ({ selectionIndex, courseName, courseCode }) => {
  return (
    <div class="flex flex-row rounded items-center bg-gray-50 w-auto h-auto shadow-md overflow-hidden my-2">
      <div class="text-base px-2">{selectionIndex} </div>
      <div class="w-24 text-lg font-semibold py-2">{courseCode}</div>
      <div class="mx-2">{courseName}</div>
      <div class="flex items-center ml-auto mr-4">
        <input
          class="mr-4 w-12 text-gray-800 bg-gray-50 border-gray-500 border-b 
        placeholder-gray-400 
        focus:outline-none focus:border-purple-500 focus:placeholder-opacity-40"
          placeholder="0"
          type="number"
          min="0"
          max="100"
        ></input>
        <span class="cursor-pointer inline-block ">
          <svg
            class="stroke-current text-gray-500 stroke-2 hover:text-red-700"
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

export default SelectedModuleCard;
