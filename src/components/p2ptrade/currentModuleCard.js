import React from "react";

const CurrentModuleCard = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
}) => {
  return (
    <div
      class="flex flex-none flex-row items-center self-center rounded 
              bg-gray-50 w-3/4 h-auto shadow-md"
    >
      <div class="text-3xl font-semibold px-4 py-4">{courseCode}</div>
      <div class="flex text-lg pr-5">
        <div>{courseName}</div>
      </div>
      <div class="flex flex-col flex-grow items-end ml-auto mr-3 w-auto">
        <div class="text-sm font-light whitespace-nowrap">
          {instructorFirstName}
        </div>
        <div class="text-sm font-light whitespace-nowrap">
          {instructorLastName}
        </div>
      </div>
    </div>
  );
};

export default CurrentModuleCard;
