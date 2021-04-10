import React from "react";
/**
 * Card to display user's current module with configurable text.
 * If courseCode === "", no enrolled version displayed
 * @param {string} courseCode - course code
 * @param {string} courseName - course name
 * @param {string} instructorFirstName - first name
 * @param {string} instructorLastName - last name
 */
const CurrentModuleCard = ({
  courseCode,
  courseName,
  instructorFirstName,
  instructorLastName,
}) => {
  return (
    <div
      class="flex flex-none flex-row items-center self-center rounded bg-gray-50 w-auto md:w-3/4 2xl:w-2/3 h-auto shadow-md mt-2"
      data-testid="currentModuleCard"
    >
      {courseCode ? (
        <div
          class="text-3xl xl:text-4xl font-semibold px-4 py-4 xl:py-6"
          data-testid="courseCode"
        >
          {courseCode}
        </div>
      ) : (
        <svg
          class="m-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="noModWarning"
        >
          <circle cx="12" cy="12" r="11" stroke="#ED2E7E" stroke-width="2" />
          <path
            d="M12 7V12"
            stroke="#ED2E7E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 16V16.5"
            stroke="#ED2E7E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      {courseCode ? (
        <div class="text-lg xl:text-2xl pr-5">
          <div data-testid="courseName">{courseName}</div>
        </div>
      ) : (
        <div
          class="mx-auto my-6 text-lg  pr-5 justify-center text-center text-gray-500"
          data-testid="noModMessage"
        >
          <div>
            You are currently not enrolled in a module eligible for trade
          </div>
        </div>
      )}
      {courseCode ? (
        <div class="flex flex-col flex-grow items-end ml-auto mr-3 w-auto xl:text-lg">
          <div
            class="font-light whitespace-nowrap"
            data-testid="instructorFirstName"
          >
            {instructorFirstName}
          </div>
          <div
            class="font-light whitespace-nowrap"
            data-testid="instructorLastName"
          >
            {instructorLastName}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CurrentModuleCard;
