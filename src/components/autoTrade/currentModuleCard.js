import React from "react";

const CurrentModuleCard = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
}) => {
  return (
    <div class="flex flex-none flex-row items-center self-center rounded bg-gray-50 w-auto md:w-3/4 2xl:w-1/2 h-auto shadow-md">
      <div class="text-3xl xl:text-4xl font-semibold px-4 py-4">
        {courseCode}
      </div>
      <div class="flex text-lg xl:text-2xl pr-5">
        <div>{courseName}</div>
      </div>
      <div class="flex flex-col flex-grow items-end ml-auto mr-3 w-auto xl:text-lg">
        <div class="font-light whitespace-nowrap">{instructorFirstName}</div>
        <div class="font-light whitespace-nowrap">{instructorLastName}</div>
      </div>
    </div>
  );
};

export default CurrentModuleCard;
