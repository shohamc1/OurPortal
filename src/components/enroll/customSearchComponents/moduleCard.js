import React, { useState, useEffect } from "react";

import { useUser } from "../../../context/authContext";
import { STATUS_COLOUR, MODULE_COLOUR } from "../../../constants";

const Status = ({ statusType }) => {
  var fillColour = STATUS_COLOUR[statusType]
    ? STATUS_COLOUR[statusType]
    : STATUS_COLOUR["Available"];

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
  const user = useUser();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(user.cart.map((m) => m.courseCode).includes(courseCode));
  }, [courseCode, user.cart]);

  var focusColor = `bg-${
    MODULE_COLOUR[type] ? MODULE_COLOUR[type] : MODULE_COLOUR.DEFAULT
  }`;

  const addToCart = () => {
    setAdded(true);
    user.setCart([...user.cart, { courseCode, type, status: "Available" }]);
  };

  const removeFromCart = () => {
    setAdded(false);
    user.setCart(user.cart.filter((m) => m.courseCode !== courseCode));
  };

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
          <button
            class="ml-auto mt-auto rounded-full h-1/2 bg-gray-300 text-sm px-4"
            onClick={added ? removeFromCart : addToCart}
          >
            {added ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18.7742 18.7742"
                  stroke="#14142B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 18.7742L18.7742 5.99998"
                  stroke="#14142B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;