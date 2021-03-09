// TODO: limit search to only include HASS mods
// TODO: integrate autoTradeModules into Firebase

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Sidebar from "../sidebar";
import Header from "../header";
import CurrentModuleCard from "./currentModuleCard";
import SelectedModuleCard from "./selectedModuleCard";
import AlgoliaMainContent from "../enroll/algoliaMainContent";
import { useUser } from "../../context/authContext";
import EmptyModuleCard from "./emptyModuleCard";

const Trade = () => {
  const user = useUser();
  const [info, setInfo] = useState(true);
  const [remainingWeightage, setRemainingWeightage] = useState(100);
  const [invalidWeightage, setInvalidWeightage] = useState(false);
  console.log(info);

  useEffect(() => {
    user.setActivePage("auto");
  }, []);
  console.log(user);

  const closeInfo = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  const updateWeightages = (value, index) => {
    const weightages = user.autoTradeModules.map((m) => m.weightage);
    let sum = value;
    for (let i = 0; i < weightages.length; i++) {
      if (i !== index) {
        sum += weightages[i];
      }
    }
    setRemainingWeightage(100 - sum);
    setInvalidWeightage(100 - sum >= 0 ? false : true);
  };

  const selectedModules = user.autoTradeModules.length
    ? user.autoTradeModules
        .map((m, i) => (
          <SelectedModuleCard
            courseCode={m.courseCode}
            courseName={m.courseName}
            weightage={m.weightage}
            selectionIndex={i + 1}
            onWeightageUpdate={updateWeightages}
          />
        ))
        .concat([
          ...Array(3 - user.autoTradeModules.length).fill(<EmptyModuleCard />),
        ])
    : [1, 2, 3].map((m) => <EmptyModuleCard />);

  const displaySearch = () => {
    user.setActivePage("auto-search");
  };

  if (user.activePage == "auto-search") {
    return (
      <div class="flex">
        <Helmet title="Auto Trade | OurPortal" />
        <Sidebar active="trade-search" />
        <div class="flex flex-col flex-grow">
          <Header pageName="Auto Trade" />
          <div class="h-full">
            <AlgoliaMainContent />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div class="flex">
      <Helmet title="Auto Trade | OurPortal" />
      <Sidebar active="auto" />
      <div class="flex flex-col flex-grow">
        <Header pageName="Auto Trade" />
        <div class="flex flex-col text-sm text-gray-800 w-full py-4 px-4 h-full">
          {info ? (
            <div class="flex flex-col rounded mb-4 shadow-md border-2 border-red-400">
              <div class="flex flex-row items-center h-1/6 w-auto rounded-t ">
                <div class="font-bold text-lg ml-2">Information</div>
                <button class="ml-auto mr-2 p-2" onClick={closeInfo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                  </svg>
                </button>
              </div>
              <div class="mx-2 my-2 text-justify">
                <p>
                  Welcome to Auto Trading. This feature allows you to put your
                  enrolled HASS module up for exchange for a chance to obtain
                  your desired hass module. At the end of the enrollment period,
                  our algorithm will attempt to help everyone who used this
                  feature to get their desired module!
                </p>
                <p class="mt-2">Instructions:</p>
                <ol class="list-decimal list-inside w-3/4 self-center mt-2">
                  <li class="ml-4 mb-1">
                    Click on the search button to look for HASS modules you want
                    to trade for.
                  </li>
                  <li class="ml-4 mb-1">
                    You can pick <b>up to 3</b> modules.
                  </li>
                  <li class="ml-4 mb-1">
                    Distribute <b>all</b> weightage point among your selected
                    modules
                  </li>
                  <li class="ml-4 mb-1">Click on update to save your trades</li>
                </ol>
                <p class="font-light text-sm mx-2">
                  <em>
                    All trades are done based on availability and there is{" "}
                    <strong>NO GUARANTEE</strong> you will get your desired
                    module, so choose wisely
                  </em>
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
          <h2 class="font-bold text-3xl pt-2 mb-2">Current Module</h2>

          <CurrentModuleCard
            courseCode="02.102DH"
            courseName="The World Since 1400"
            instructorFirstName="Yang Huei"
            instructorLastName="Pang"
          />
          <CurrentModuleCard
            courseCode=""
            courseName="The World Since 1400"
            instructorFirstName="Yang Huei"
            instructorLastName="Pang"
          />

          <h2 class="font-bold text-3xl mt-4">Selected Modules</h2>
          <p class="font-light text-green-500 text-sm mb-2">
            Your Selection is Updated
          </p>

          {selectedModules}
          <div class="flex flex-row mt-auto items-center">
            <p class="font-bold text-lg xl:text-xl inline-block">
              Remaining Weightage:
            </p>
            <div
              class={`${
                remainingWeightage ? "bg-red-700" : "bg-green-500"
              } text-white text-lg xl:text-xl text-center opacity-90 font-bold w-10 2xl:w-12 min-w-min p-2 m-2 rounded-md`}
            >
              {remainingWeightage}
            </div>
            {invalidWeightage ? (
              <div class="flex flex-col text-xs text-red-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="#ED2E7E"
                    stroke-width="2"
                  />
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
                <p>Negative weights not allowed</p>
              </div>
            ) : (
              <></>
            )}
            <button
              class="secondary-button rounded py-2 mr-2 xl:px-10 ml-auto xl:mr-4 text-white text-xl 2xl:text-2xl w-1/5"
              onClick={displaySearch}
            >
              Search
            </button>
            <button
              class={`${
                remainingWeightage ? "bg-gray-500" : "secondary-button-ns"
              } rounded py-2 px-4 mr-2 xl:px-10 xl:mr-4 text-white text-xl 2xl:text-2xl w-1/5`}
              disabled={remainingWeightage !== 0}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
