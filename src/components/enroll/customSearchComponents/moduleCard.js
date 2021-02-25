import React from "react";

const Status = ({ statusType }) => {
  var fillColour = "#34EAB9";
  switch (statusType) {
    case "Available":
      fillColour = "#34EAB9";
      break;
    case "Filling Fast":
      fillColour = "#FFD789";
      break;
    case "Full":
      fillColour = "#ED2E7E";
      break;
    default:
      fillColour = "#34EAB9";
      break;
  }
  return (
    <div class="flex flex-row items-center mb-2">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill={fillColour} />
      </svg>
      <span class="ml-2">{statusType}</span>
    </div>
  );
};

const ModuleCard = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
  type,
}) => {
  var focusColor = "bg-gray-500";
  switch (type) {
    case "EPD":
      focusColor = "bg-pastel-mint";
      break;
    case "HASS":
      focusColor = "bg-pastel-red";
      break;
    case "ISTD":
      focusColor = "bg-pastel-turquoise";
      break;
    case "ESD":
      focusColor = "bg-pastel-blue";
      break;
    case "ASD":
      focusColor = "bg-pastel-yellow";
      break;
    default:
      focusColor = "bg-gray-500";
      break;
  }

  return (
    <div class="relative flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md overflow-hidden mr-6 mb-6">
      <div class={`text-4xl font-semibold pl-4 py-2 ${focusColor}`}>
        {courseCode}
      </div>
      <div class="flex flex-col pl-4 py-2 h-full">
        <span class="text-lg">{courseName}</span>
        <div class="flex pb-2 pr-4 mt-auto">
          <div class="flex flex-col">
            <Status statusType="Available" />
            <span class="text-sm font-light">{instructorLastName}</span>
            <span class="text-sm font-light">{instructorFirstName}</span>
          </div>
          <button class="ml-auto mt-auto rounded-full h-1/2 bg-gray-300 text-sm px-4">
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6589 9.608H9.17088V17.16H7.79488V9.608H0.338875V8.392H7.79488V0.839998H9.17088V8.392H16.6589V9.608Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
