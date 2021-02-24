import React, { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";
import CurrentModuleCard from "./currentModuleCard";
import SelectedModuleCard from "./selectedModuleCard";

const Trade = () => {
  const [info, setInfo] = useState(true);
  const [remainingWeightage, setRemainingWeightage] = useState(100);
  const [weightages, setWeightages] = useState([0, 0, 0]);
  console.log(info);

  const closeInfo = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  const updateWeightages = (value, index) => {
    let sum = value;
    for (let i = 0; i < 3; i++) {
      if (i !== index) {
        sum += weightages[i];
      }
    }
    console.log(sum);
    if (100 - sum >= 0) {
      setRemainingWeightage(100 - sum);
      setWeightages(weightages.map((w, i) => (i == index ? value : w)));
    }
    console.log(weightages);
  };

  return (
    <div class="flex">
      <Sidebar active="auto" />
      <div class="flex flex-col flex-grow">
        <Header pageName="Auto Trade" />
        <div class="flex flex-col text-sm text-gray-800 w-full py-4 px-4">
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
                <p class="font-light text-sm">
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

          <h2 class="font-bold text-3xl mt-4">Selected Modules</h2>
          <p class="font-light text-green-500 text-sm mb-2">
            Your Selection is Updated
          </p>

          <SelectedModuleCard
            courseCode="02.105DH"
            courseName="Sages Through The Ages: Readings in Early Indian and Chinese Religion and Philosophy"
            selectionIndex={1}
            onWeightageUpdate={updateWeightages}
          />
          <SelectedModuleCard
            courseCode="02.155TS"
            courseName="Design Anthropology"
            selectionIndex={2}
            onWeightageUpdate={updateWeightages}
          />
          <SelectedModuleCard
            courseCode="02.216"
            courseName="Southeast Asia Under Japan: Motives, Memoirs, and Media"
            selectionIndex={3}
            onWeightageUpdate={updateWeightages}
          />
          <div class="flex flex-row mt-8 items-center">
            <p class="font-bold">Remaining Weightage:</p>
            <div class="bg-red-700 text-white opacity-90 text-sm font-bold p-2 m-2 rounded-md">
              {remainingWeightage}
            </div>
            <button class="secondary-button rounded-button py-2 px-4 mr-2 md:px-10 ml-auto md:mr-4 text-white">
              Search
            </button>
            <button class="secondary-button-ns rounded-button py-2 px-4 mr-2 md:px-10 md:mr-4  text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
