import React, { useState } from "react";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";

const ConfirmTrade = ({ id }) => {
  const [info, setInfo] = useState(true);

  const closeInfo = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  // need to check if trade exists first
  return (
    <div class="flex">
      <Sidebar active="peer" />
      <div class="flex flex-col flex-grow h-screen">
        <Header pageName={`Trade ${id}`} />
        <div class="flex flex-col flex-grow px-6 pt-4">
          {info ? (
            <div class="p-2 bg-red-400 rounded mb-4">
              <div class="ml-2 my-2 text-justify">
                <button class="float-right mx-2 p-2" onClick={closeInfo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                  </svg>
                </button>
                <b>Welcome to P2P Trading.</b>
                <p>Explain here</p>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div class="grid grid-flow-col grid-cols-auto mt-auto">
            <div class="flex flex-col">
              {/* your current module */}
              <span class="text-4xl font-bold">Your Current Module</span>
              <Card
                courseCode="50.004"
                courseName="Introduction to Bullshit"
                instructorFirstName="Ernest"
                instructorLastName="Chong"
                type="ISTD"
              />
            </div>

            <div class="self-center justify-self-center">
              {/* trade SVG */}
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="50px"
                height="50px"
                viewBox="0 0 477.859 477.859"
              >
                <g>
                  <g>
                    <path
                      d="M472.863,175.662L353.396,56.195c-6.666-6.664-17.472-6.662-24.136,0.004c-3.199,3.2-4.996,7.538-4.997,12.063v51.2
              H204.796c-9.426,0-17.067,7.641-17.067,17.067c0,9.426,7.641,17.067,17.067,17.067H341.33c9.426,0,17.067-7.641,17.067-17.067
              V109.46l78.268,78.268l-78.268,78.268v-27.068c0-9.426-7.641-17.067-17.067-17.067H153.596v-51.2
              c-0.002-9.426-7.645-17.065-17.07-17.063c-4.524,0.001-8.863,1.798-12.063,4.997L4.997,278.062
              c-6.663,6.665-6.663,17.468,0,24.132l119.467,119.467c3.2,3.201,7.54,5,12.066,5.001c2.243,0.007,4.466-0.434,6.536-1.297
              c6.376-2.644,10.532-8.867,10.53-15.77v-51.2h119.467c9.426,0,17.067-7.641,17.067-17.067s-7.641-17.067-17.067-17.067H136.53
              c-9.426,0-17.067,7.641-17.067,17.067v27.068l-78.268-78.268l78.268-78.268v27.068c0,9.426,7.641,17.067,17.067,17.067h187.733
              v51.2c0.002,9.426,7.645,17.065,17.07,17.063c4.524-0.001,8.863-1.798,12.063-4.997l119.467-119.467
              C479.525,193.129,479.525,182.326,472.863,175.662z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div class="flex flex-col">
              {/* recipient */}
              <span class="text-4xl font-bold">Their Current Module</span>
              <Card
                courseCode="50.001"
                courseName="Introduction to Sadness"
                instructorFirstName="huh"
                instructorLastName="idk"
                type="ISTD"
              />
            </div>
          </div>
          <div class="flex flex-row mb-auto justify-center mt-4">
            <button class="flex flex-row bg-red-500 text-white w-1/5 py-4 rounded justify-center font-medium text-lg mr-12">
              Reject
            </button>
            <button class="flex flex-row bg-green-500 text-white w-1/5 py-4 rounded justify-center font-medium text-lg">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTrade;
