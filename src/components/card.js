import React from "react";

const Card = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
}) => {
  return (
    <div class="flex flex-col rounded bg-gray-50 min-w-80 w-auto h-auto shadow-md overflow-hidden mr-6 mb-6">
      <div class="text-4xl font-semibold bg-mint px-4 py-2">{courseCode}</div>
      <div class="flex flex-col px-4 py-2">
        <span class="text-lg pb-20">{courseName}</span>
        <div class="flex">
          <div class="flex flex-col">
            <span class="text-sm font-light">{instructorLastName}</span>
            <span class="text-sm font-light">{instructorFirstName}</span>
          </div>
          <button class="ml-auto rounded-button bg-gray-700 text-sm px-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
