import React from "react";

import CONSTANTS from "../constants";

const Card = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
  type,
}) => {
  const { MODULE_CARD_COLOUR } = CONSTANTS;
  var focusColor = MODULE_CARD_COLOUR[type]
    ? MODULE_CARD_COLOUR[type]
    : MODULE_CARD_COLOUR.DEFAULT;
  return (
    <div class="relative flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md overflow-hidden mr-6 mb-6">
      <div
        class={`text-4xl font-semibold pl-4 py-2 ${focusColor}`}
        data-testid={courseCode}
      >
        {courseCode}
      </div>
      <div class="flex flex-col px-4 py-2 h-full">
        <span class="text-lg" data-testid="courseName">
          {courseName}
        </span>
        <div class="flex pb-2 pr-4 mt-auto">
          <div class="flex flex-col">
            <span class="text-sm font-light" data-testid="instructorLastName">
              {instructorLastName}
            </span>
            <span class="text-sm font-light" data-testid="instructorFirstName">
              {instructorFirstName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
