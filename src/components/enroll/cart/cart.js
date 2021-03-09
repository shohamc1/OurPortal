import React from "react";

import { useUser } from "../../../context/authContext";
import ModuleTab from "./moduleTab";

const Cart = () => {
  const user = useUser();

  const array = user.activePage == "enroll" ? user.cart : user.autoTradeModules;
  const modules = array.map((m) => (
    <ModuleTab courseCode={m.courseCode} status={m.status} type={m.type} />
  ));

  const empty = (
    <div class="flex text-gray-400 py-2">
      {user.activePage == "enroll"
        ? "Your cart is empty!"
        : "You have not selected any modules!"}
    </div>
  );

  return (
    <div class="px-4 py-2">
      <div class="items-center flex flex-row w-full py-2">
        {user.activePage == "enroll" ? (
          <></>
        ) : (
          <a
            class="mr-3"
            href="#"
            onClick={() => {
              user.setActivePage("auto");
            }}
          >
            <svg
              class="mr-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.71729 5L3.00021 12L9.71729 19"
                stroke="#14142B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="1"
                y1="-1"
                x2="16.7331"
                y2="-1"
                transform="matrix(1 0 0 -1 3.26709 11.0317)"
                stroke="#14142B"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        )}
        <span class="text-3xl xl:text-4xl">
          {user.activePage == "enroll" ? "Your Cart" : "Selected"}
        </span>
      </div>
      {array.length ? modules : empty}
    </div>
  );
};

export default Cart;
