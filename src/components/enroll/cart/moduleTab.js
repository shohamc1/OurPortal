import React from "react";
import { useUser } from "../../../context/authContext";
import { STATUS_COLOUR, MODULE_COLOUR } from "../../../constants";

const ModuleTab = ({ courseCode, status, type }) => {
  const user = useUser();

  var fillColour = STATUS_COLOUR[status]
    ? STATUS_COLOUR[status]
    : STATUS_COLOUR["Available"];
  var focusColor = `border-${
    MODULE_COLOUR[type] ? MODULE_COLOUR[type] : MODULE_COLOUR.DEFAULT
  }`;

  const removeFromCart = () => {
    user.setCart(user.cart.filter((m) => m.courseCode !== courseCode));
  };

  return (
    <div
      class={`bg-gray-300 container py-2 px-4 mt-2 mb-3 rounded-md flex flex-row border-t-4 ${focusColor}`}
    >
      <div class="my-auto mr-3">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill={fillColour} />
        </svg>
      </div>
      <span class="mr-auto">{courseCode}</span>
      <button onClick={removeFromCart}>
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
      </button>
    </div>
  );
};

export default ModuleTab;