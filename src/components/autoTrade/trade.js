// TODO: limit search to only include HASS mods

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import "moment-timezone";

import Sidebar from "../sidebar";
import Header from "../header";
import CurrentModuleCard from "./currentModuleCard";
import SelectedModuleCard from "./selectedModuleCard";
import AlgoliaMainContent from "../enroll/algoliaMainContent";
import { useUser } from "../../context/authContext";
import EmptyModuleCard from "./emptyModuleCard";
import ClosedPortal from "../closedPortal";

const Trade = () => {
  const {
    user,
    activePage,
    setActivePage,
    autoTradeModules,
    setAutoTradeModules,
    tradeModule,
    setTradeModule,
  } = useUser();
  const [showInfo, setShowInfo] = useState(true);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [remainingWeightage, setRemainingWeightage] = useState(100);
  const [invalidWeightage, setInvalidWeightage] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore().collection("users");
  const moduleDB = firebase.firestore().collection("modules");
  const enrollmentPeriodDb = firebase
    .firestore()
    .collection("enrollmentPeriod");

  useEffect(() => {
    setLoading(true);
    setActivePage("auto");
    if (user != null) {
      db.doc(user.uid)
        .get()
        .then((doc) => {
          var data = doc.data();

          enrollmentPeriodDb
            .where(
              "end",
              ">",
              firebase.firestore.Timestamp.fromMillis(Date.now())
            )
            .get()
            .then((snapshot) => {
              if (snapshot.size === 0) {
                setLoading(false);
                return;
              }

              let tempStart, tempEnd;
              const now = Date.now();
              if (snapshot.size > 1) {
                let difference = Number.MAX_VALUE;
                snapshot.forEach((d) => {
                  const periodData = d.data();
                  const tempDiff = periodData.end.toMillis() - now;
                  if (tempDiff < difference) {
                    difference = tempDiff;
                    tempStart = periodData.start.toMillis();
                    tempEnd = periodData.end.toMillis();
                  }
                });
                setStartTime(tempStart);
                setEndTime(tempEnd);
              } else {
                snapshot.forEach((d) => {
                  tempStart = d.data().start.toMillis();
                  tempEnd = d.data().end.toMillis();
                });
                setStartTime(tempStart);
                setEndTime(tempEnd);
              }

              if (tempStart < Date.now()) {
                if (data.autoTradeModules != null) {
                  var modulesData = [];
                  var promises = [];
                  var totalWeightage = 0;

                  data.autoTradeModules.forEach(function (item) {
                    promises.push(
                      moduleDB
                        .doc(item.courseCode)
                        .get()
                        .then((doc) => {
                          modulesData.push({
                            ...doc.data(),
                            weightage: item.weightage,
                          });
                          totalWeightage += item.weightage;
                        })
                    );
                  });

                  Promise.all(promises).then(() => {
                    setAutoTradeModules(modulesData);
                    setRemainingWeightage(100 - totalWeightage);

                    if (data.modules != null) {
                      data.modules.forEach(function (item) {
                        moduleDB
                          .where("courseCode", "==", item)
                          .where("type", "==", "HASS")
                          .get()
                          .then((doc) => {
                            if (!doc.empty) {
                              doc.forEach((d) => {
                                setTradeModule(d.data());
                              });
                            }
                            setLoading(false);
                          });
                      });
                    } else {
                      setLoading(false);
                    }
                  });
                }
              } else {
                setLoading(false);
              }
            });
        });
    }
  }, []);

  useEffect(() => {
    var totalWeightage = 0;
    autoTradeModules.forEach((m) => {
      totalWeightage += Number.isNaN(m.weightage) ? 0 : m.weightage;
    });
    setRemainingWeightage(100 - totalWeightage);
    setInvalidWeightage(100 - totalWeightage < 0);
  }, [autoTradeModules]);

  const closeInfo = (e) => {
    e.preventDefault();
    setShowInfo(false);
  };

  const displaySearch = () => {
    setActivePage("auto-search");
  };

  const updateFirestore = () => {
    db.doc(user.uid)
      .update({
        autoTradeModules: autoTradeModules.map((m) => ({
          courseCode: m.courseCode,
          weightage:
            Number.isNaN(m.weightage) || m.weightage === "" ? 0 : m.weightage,
        })),
      })
      .then(() => {
        setShowUpdateMessage(true);
        setTimeout(() => {
          setShowUpdateMessage(false);
        }, 3000);
      });
  };

  const withinEnrollmentPeriod = startTime !== null && startTime < Date.now();

  const selectedModules = autoTradeModules.length
    ? autoTradeModules
        .map((m, i) => (
          <SelectedModuleCard
            courseCode={m.courseCode}
            courseName={m.courseName}
            weightage={m.weightage}
            selectionIndex={i + 1}
            // onWeightageUpdate={updateWeightages}
          />
        ))
        .concat([
          ...Array(3 - autoTradeModules.length).fill(<EmptyModuleCard />),
        ])
    : [1, 2, 3].map((m) => <EmptyModuleCard />);

  if (loading) return <></>;

  if (activePage === "auto-search") {
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
      <Sidebar />
      <div class="flex flex-col flex-grow">
        <Header pageName="Auto Trade" />
        <div class="flex flex-col text-sm text-gray-800 w-full py-4 px-4 h-full">
          {withinEnrollmentPeriod ? (
            <>
              {showInfo ? (
                <div
                  class="p-2 border-2 border-red-400 rounded mb-4"
                  data-testid="tradeInfoTab"
                >
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
                    <b>Welcome to Auto Trading.</b>
                    <p>
                      This feature allows you to put your enrolled HASS module
                      up for exchange for a chance to obtain your desired hass
                      module. At the end of the enrollment period, our algorithm
                      will attempt to help everyone who used this feature to get
                      their desired module!
                    </p>
                    <p class="mt-2">Instructions:</p>
                    <ol class="list-decimal list-inside w-3/4 self-center mt-2">
                      <li class="ml-4 mb-1">
                        Click on the search button to look for HASS modules you
                        want to trade for.
                      </li>
                      <li class="ml-4 mb-1">
                        You can pick <b>up to 3</b> modules.
                      </li>
                      <li class="ml-4 mb-1">
                        Distribute <b>all</b> weightage point among your
                        selected modules
                      </li>
                      <li class="ml-4 mb-1">
                        Click on update to save your trades
                      </li>
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
                courseCode={tradeModule ? tradeModule.courseCode : ""}
                courseName={tradeModule ? tradeModule.courseName : ""}
                instructorFirstName={
                  tradeModule ? tradeModule.instructorFirstName : ""
                }
                instructorLastName={
                  tradeModule ? tradeModule.instructorLastName : ""
                }
              />

              <h2 class="font-bold text-3xl mt-4">Selected Modules</h2>
              <div class="min-h-text-sm">
                {showUpdateMessage ? (
                  <p
                    class="font-light text-green-500 text-sm mb-2"
                    data-testid="tradeUpdateMessage"
                  >
                    Your Selection is Updated
                  </p>
                ) : (
                  <></>
                )}
              </div>

              {selectedModules}
              <div class="flex flex-row mt-auto items-center">
                <p class="font-bold text-lg xl:text-xl inline-block">
                  Remaining Weightage:
                </p>
                <div
                  class={`${
                    remainingWeightage ? "bg-red-700" : "bg-green-500"
                  } text-white text-lg xl:text-xl text-center opacity-90 font-bold w-10 2xl:w-12 min-w-min p-2 m-2 rounded-md`}
                  data-testid="tradeRemainingWeightage"
                >
                  {remainingWeightage}
                </div>
                {invalidWeightage ? (
                  <div
                    class="flex flex-col text-xs text-red-500"
                    data-testid="tradeExceedWeightage"
                  >
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
                  class={`${
                    tradeModule ? "secondary-button" : "bg-gray-500"
                  } rounded py-2 mr-2 xl:px-10 ml-auto xl:mr-4 text-white text-xl 2xl:text-2xl w-1/5`}
                  onClick={displaySearch}
                  disabled={!tradeModule}
                  data-testid="tradeSearchButton"
                >
                  Search
                </button>
                <button
                  class={`${
                    remainingWeightage ? "bg-gray-500" : "secondary-button-ns"
                  } rounded py-2 px-4 mr-2 xl:px-10 xl:mr-4 text-white text-xl 2xl:text-2xl w-1/5`}
                  disabled={remainingWeightage !== 0}
                  onClick={updateFirestore}
                  data-testid="tradeUpdateButton"
                >
                  Update
                </button>
              </div>
            </>
          ) : (
            <ClosedPortal
              startTime={startTime}
              endTime={endTime}
              name="Autotrade"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
