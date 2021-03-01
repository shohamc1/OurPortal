import React from "react";
import { useUser } from "../../../context/authContext";

const ModuleTab = ({ courseCode, status, type }) => {
  const user = useUser();

  const removeFromCart = () => {
    user.setCart(user.cart.filter((m) => m.courseCode !== courseCode));
  };

  return (
    <div class="bg-gray-300 container py-2 px-4 mb-2 rounded-md flex flex-row">
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
