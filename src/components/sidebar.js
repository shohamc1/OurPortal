import React from "react";

const Sidebar = () => {
  return (
    <div class="flex flex-col max-w-1/7 h-screen bg-gray-100 rounded-r-lg">
      <h1 class="font-bold text-6xl pl-4 pr-8 py-4 mb-4">OurPortal</h1>
      <button class="mx-2 mb-4 rounded text-gray-100 primary-button">
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
              stroke="#F5F6F8"
              stroke-width="2"
              stroke-linecap="round"
            />
            <ellipse
              cx="11.3333"
              cy="28"
              rx="1.33333"
              ry="1.33333"
              stroke="#F5F6F8"
              stroke-width="2"
            />
            <ellipse
              cx="27.3333"
              cy="28"
              rx="1.33333"
              ry="1.33333"
              stroke="#F5F6F8"
              stroke-width="2"
            />
          </svg>
          <span class="text-4xl">Enroll</span>
        </div>
      </button>

      <button class="mx-2 mb-4 rounded">
        <div class="px-4 items-center items-center flex flex-row w-full py-2">
          <svg
            class="mr-4"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 0.200012C24.8307 0.200012 32 7.36935 32 16.2C32 25.0307 24.8307 32.2 16 32.2C7.16933 32.2 0 25.0307 0 16.2C0 7.36935 7.16933 0.200012 16 0.200012ZM16 2.86668C23.3587 2.86668 29.3333 8.84135 29.3333 16.2C29.3333 23.5587 23.3587 29.5333 16 29.5333C8.64133 29.5333 2.66667 23.5587 2.66667 16.2C2.66667 8.84135 8.64133 2.86668 16 2.86668ZM18.6667 18.8667V14.8667L25.3333 20.2L18.6667 25.5333V21.5333H6.66667V18.8667H18.6667ZM13.3333 10.8667V6.86668L6.66667 12.2L13.3333 17.5333V13.5333H25.3333V10.8667H13.3333Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="32"
                  height="32"
                  fill="white"
                  transform="translate(0 0.200012)"
                />
              </clipPath>
            </defs>
          </svg>

          <span class="text-4xl">Trade</span>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
