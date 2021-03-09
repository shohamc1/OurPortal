import React from "react";

import Cart from "./enroll/cart/cart";

/**
 * Sidebar with configurable highlight
 * @param {string} active - determines which button will be highlighted
 */
const Sidebar = ({ active = "home" }) => {
  // base CSS classes
  var homeClass = "mx-2 mb-4 rounded";
  var enrollClass = "mx-2 mb-4 rounded";
  var peerClass = "mx-2 mb-4 rounded";
  var autoClass = "mx-2 mb-4 rounded";

  // apply CSS classes depending on value of active recieved
  switch (active) {
    case "home":
      homeClass =
        "mx-2 mb-4 rounded text-gray-100 text-gray-100 primary-button";
      break;
    case "enroll":
      enrollClass =
        "mx-2 mb-4 rounded text-gray-100 text-gray-100 primary-button";
      break;
    case "peer":
      peerClass =
        "mx-2 mb-4 rounded text-gray-100 text-gray-100 primary-button";
      break;
    case "auto":
      autoClass =
        "mx-2 mb-4 rounded text-gray-100 text-gray-100 primary-button";
      break;
    default:
      void 0;
  }

  return (
    <div class="flex flex-col max-w-1/7 h-screen bg-gray-100 rounded-r-lg sticky top-0">
      {/* header text */}
      <a href="/dashboard">
        <h1 class="font-bold text-4xl xl:text-6xl pl-4 pr-8 py-4 mb-4">
          OurPortal
        </h1>
      </a>

      {/* nav buttons */}

      {active == "enroll" || active == "trade-search" ? (
        <Cart />
      ) : (
        <>
          <a href="/dashboard" class={homeClass}>
            <div class="px-4 items-center flex flex-row w-full py-2">
              <svg
                class="mr-4"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.66669 12.6679C2.66669 11.7144 3.12 10.8176 3.88784 10.2522L16 1.33325L28.1122 10.2522C28.88 10.8176 29.3334 11.7144 29.3334 12.6679V28.1666C29.3334 29.5473 28.2141 30.6666 26.8334 30.6666H21C20.4477 30.6666 20 30.2189 20 29.6666V21.1666C20 20.8904 19.7762 20.6666 19.5 20.6666H12.5C12.2239 20.6666 12 20.8904 12 21.1666V29.6666C12 30.2189 11.5523 30.6666 11 30.6666H5.16669C3.78597 30.6666 2.66669 29.5473 2.66669 28.1666V12.6679Z"
                  stroke={active === "home" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="text-3xl xl:text-4xl">Home</span>
            </div>
          </a>

          <a href="/enroll" class={enrollClass}>
            <div class="px-4 items-center flex flex-row w-full py-2">
              <svg
                class="mr-4"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33331 2.66666H5.0623C5.9997 2.66666 6.81133 3.31772 7.01468 4.2328L7.99998 8.66666M7.99998 8.66666L9.77089 18.4066C10.2896 21.2596 12.7744 23.3333 15.6741 23.3333H22.5439C25.3453 23.3333 27.7739 21.3948 28.3947 18.6631L30.2502 10.4991C30.4635 9.56044 29.7501 8.66666 28.7875 8.66666H7.99998Z"
                  stroke={active === "enroll" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <ellipse
                  cx="11.3333"
                  cy="28"
                  rx="1.33333"
                  ry="1.33333"
                  stroke={active === "enroll" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                />
                <ellipse
                  cx="27.3333"
                  cy="28"
                  rx="1.33333"
                  ry="1.33333"
                  stroke={active === "enroll" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                />
              </svg>
              <span class="text-3xl xl:text-4xl">Enroll</span>
            </div>
          </a>

          <a href="/request" class={peerClass}>
            <div class="px-4 items-center flex flex-row w-full py-2">
              <svg
                class="mr-4"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.8935 16.8171C1.06575 16.4988 1.03131 15.3404 1.83867 14.9734L28.3518 2.92201C29.1929 2.53965 30.0583 3.405 29.6759 4.24618L17.6245 30.7593C17.2575 31.5666 16.0992 31.5322 15.7808 30.7044L12.0828 21.0895C11.9812 20.8254 11.7725 20.6167 11.5084 20.5152L1.8935 16.8171Z"
                  stroke={active === "peer" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                />
              </svg>
              <span class="text-3xl xl:text-4xl">P2P Trade</span>
            </div>
          </a>

          <a href="/autotrade" class={autoClass}>
            <div class="px-4 items-center flex flex-row w-full py-2">
              <svg
                class="mr-4"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="17"
                  cy="17.0001"
                  r="5.33333"
                  stroke={active === "auto" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                />
                <path
                  d="M15.2845 2.52968C16.061 1.23371 17.939 1.23371 18.7156 2.52968L20.4827 5.47855C20.9355 6.23434 21.8297 6.60472 22.6844 6.39054L26.0191 5.55487C27.4846 5.18762 28.8125 6.51553 28.4452 7.98105L27.6096 11.3157C27.3954 12.1704 27.7658 13.0646 28.5215 13.5174L31.4704 15.2845C32.7664 16.0611 32.7664 17.9391 31.4704 18.7156L28.5215 20.4827C27.7658 20.9356 27.3954 21.8298 27.6096 22.6844L28.4452 26.0191C28.8125 27.4846 27.4846 28.8125 26.0191 28.4453L22.6844 27.6096C21.8297 27.3954 20.9355 27.7658 20.4827 28.5216L18.7156 31.4705C17.939 32.7664 16.061 32.7664 15.2845 31.4705L13.5174 28.5216C13.0645 27.7658 12.1703 27.3954 11.3157 27.6096L7.98099 28.4453C6.51547 28.8125 5.18755 27.4846 5.55481 26.0191L6.39047 22.6844C6.60465 21.8298 6.23428 20.9356 5.47849 20.4827L2.52961 18.7156C1.23365 17.9391 1.23365 16.0611 2.52961 15.2845L5.47849 13.5174C6.23428 13.0646 6.60465 12.1704 6.39047 11.3157L5.55481 7.98105C5.18755 6.51553 6.51547 5.18762 7.98099 5.55487L11.3157 6.39054C12.1703 6.60472 13.0645 6.23434 13.5174 5.47855L15.2845 2.52968Z"
                  stroke={active === "auto" ? "#F5F6F8" : "black"}
                  stroke-width="2"
                />
              </svg>

              <span class="text-3xl xl:text-4xl">Auto Trade</span>
            </div>
          </a>
        </>
      )}
    </div>
  );
};

export default Sidebar;
