import React, { useState } from "react";
import { navigate } from "gatsby";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";

var userDB = firebase.firestore().collection("users");
var tradeDB = firebase.firestore().collection("trades");

const TradeDetails = ({ id, yourModDetails, theirModDetails, exists, uid }) => {
  const [info, setInfo] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const closeInfo = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  const dismissMessage = () => {
    setPopUp(false);

    // redirect to dashboard
    navigate("/dashboard");
  };

  const exchangeYours = () => {
    userDB
      .doc(uid.your)
      .get()
      .then((doc) => {
        var mods = doc.data().modules;
        var index = mods.indexOf(yourModDetails.courseCode);
        if (index != -1) {
          mods[index] = theirModDetails.courseCode;
        }
        return mods;
      })
      .then((mods) => {
        userDB.doc(uid.your).update({ modules: mods });
      });
  };

  const exchangeTheirs = () => {
    userDB
      .doc(uid.their)
      .get()
      .then((doc) => {
        var mods = doc.data().modules;
        var index = mods.indexOf(theirModDetails.courseCode);
        if (index != -1) {
          mods[index] = yourModDetails.courseCode;
        }
        return mods;
      })
      .then((mods) => {
        userDB.doc(uid.their).update({ modules: mods });
      });
  };

  const acceptProc = () => {
    // exchange modules
    exchangeYours();
    exchangeTheirs();

    // delete active trade
    tradeDB.doc(id).delete();

    setPopUp("accepted");
  };

  const declinedProc = () => {
    // delete active trade
    tradeDB.doc(id).delete();

    setPopUp("declined");
  };

  return (
    <>
      {exists && yourModDetails && theirModDetails ? (
        <>
          {popUp ? (
            <>
              <div class="absolute bottom-0 left-0 flex bg-gray-dark bg-opacity-50 h-full w-full z-20">
                <div class="bg-gray-100 px-5 pt-4 pb-5 w-1/2 flex flex-col rounded fixed transform -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2">
                  <div class="flex justify-end">
                    <svg
                      class="cursor-pointer"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={dismissMessage}
                    >
                      <path
                        d="M3 3L9.3871 9.3871"
                        stroke="#14142B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 9.38708L9.3871 2.99999"
                        stroke="#14142B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {popUp == "accepted" ? (
                    <span class="text-5xl font-bold">
                      Trade completed! &#x1F389;
                    </span>
                  ) : (
                    <span class="text-5xl font-bold">
                      Trade declined. &#x1F615;
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <Sidebar />
          <div class="flex flex-col flex-grow h-screen">
            <Header pageName={`Trade ${id}`} />
            <div class="flex flex-col flex-grow px-6 pt-4">
              {info ? (
                <div class="flex flex-col rounded mb-4 shadow-md border-2 border-red-400">
                  <div class="flex flex-row items-center h-1/6 w-auto rounded-t mt-2">
                    <div class="font-bold text-lg ml-2">
                      You've received a trade request!
                    </div>
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
                  <div class="mx-2 mt-2 text-justify">
                    <p>
                      Welcome to P2P Trading. You can check the details of the
                      requested trade and either accept or decline it!
                    </p>
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
                    courseCode={yourModDetails.courseCode}
                    courseName={yourModDetails.courseName}
                    instructorFirstName={yourModDetails.instructorFirstName}
                    instructorLastName={yourModDetails.instructorLastName}
                    type={yourModDetails.type}
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
                    courseCode={theirModDetails.courseCode}
                    courseName={theirModDetails.courseName}
                    instructorFirstName={theirModDetails.instructorFirstName}
                    instructorLastName={theirModDetails.instructorLastName}
                    type={theirModDetails.type}
                  />
                </div>
              </div>
              <div class="flex flex-row mb-auto justify-center mt-4">
                <button
                  class="flex flex-row bg-red-500 text-white w-1/5 py-4 rounded justify-center font-medium text-lg mr-12"
                  onClick={declinedProc}
                >
                  Reject
                </button>
                <button
                  class="flex flex-row bg-green-500 text-white w-1/5 py-4 rounded justify-center font-medium text-lg"
                  onClick={acceptProc}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="flex flex-col p-4">
          <span class="text-5xl font-bold">
            This trade does not exist <a href="/">&#x1F61E;</a>
          </span>
          <span class="text-3xl font-light">
            If you expected something to be here, contact the administrators
          </span>
          <span class="mt-2">Click on the emoji to go back to home.</span>
        </div>
      )}
    </>
  );
};

export default TradeDetails;
