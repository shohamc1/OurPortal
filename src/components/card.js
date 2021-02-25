import React from "react";

const Card = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
  type,
}) => {
  var focusColor = "bg-gray-200";
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
      focusColor = "bg-gray-300";
      break;
  }

  return (
    <div class="relative flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md overflow-hidden mr-6 mb-6">
      <div class={`text-4xl font-semibold pl-4 py-2 ${focusColor}`}>
        {courseCode}
      </div>
      <div class="flex flex-col px-4 py-2 h-full">
        <span class="text-lg">{courseName}</span>
        <div class="flex pb-2 pr-4 mt-auto">
          <div class="flex flex-col">
            <span class="text-sm font-light">{instructorLastName}</span>
            <span class="text-sm font-light">{instructorFirstName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
