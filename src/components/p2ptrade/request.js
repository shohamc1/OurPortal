import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";
import { useUser } from "../../context/authContext";
import { navigate } from "@reach/router";
import ClosedPortal from "../closedPortal";

var userDB = firebase.firestore().collection("users");
var modDB = firebase.firestore().collection("modules");

const Request = () => {
  const [info, setInfo] = useState(true);
  const [userUID, setUserUID] = useState("");
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mod, setMod] = useState({});
  const [done, setDone] = useState(false);
  const [hasMod, setHasMod] = useState(true);
  const [hasTrade, setHasTrade] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setActivePage, user } = useUser();
  const enrollmentPeriodDb = firebase
    .firestore()
    .collection("enrollmentPeriod");

  useEffect(() => {
    setLoading(true);
    setActivePage("peer");
    setUserUID(user.uid);

    // check if trade exists
    userDB
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // check if within enrollment period
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
                // retrieve trade if within enrollment period
                if (doc.data().hasOpenTrade) {
                  setHasTrade(true);
                  console.log("has trade");
                }
                var modules = doc.data()?.modules;
                // test modules
                let mod;
                for (let element of modules) {
                  if (/02\.\S+/gm.test(element)) {
                    mod = element;
                    break;
                  }
                }

                // retrieve module if module is found
                if (mod !== null) {
                  modDB
                    .doc(mod)
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        setMod(doc.data());
                      }
                    })
                    .then(() => {
                      if (
                        !mod ||
                        Object.keys(mod).length === 0 ||
                        mod === undefined
                      ) {
                        setDone(true);
                        setHasMod(false);
                      }
                      setLoading(false);
                    });
                } else {
                  setLoading(false);
                }
              } else {
                setLoading(false);
              }
            });
        }
      });
  }, []);

  const closeInfo = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  const dismissMessage = () => {
    setPopUp(false);
  };

  const dismissMessageRedirect = () => {
    navigate("/dashboard");
    setDone(false);
  };

  const handleEmailChange = (event) => {
    const target = event.target;
    const value = target.value;

    setEmail(value);
  };

  const sendRequest = () => {
    if (Object.keys(mod).length === 0 || mod === undefined) {
      setDone(true);
      setHasMod(false);
    }
    if (hasTrade) {
      dismissMessageRedirect();
    }

    setIsClicked(true);
    axios
      .post(
        "https://us-central1-ourportal-e0a9c.cloudfunctions.net/sendRequest",
        { senderID: userUID, receiverEID: email }
      )
      .then((res) => {
        if (res.status === 200) {
          userDB
            .doc(user.uid)
            .update({ hasOpenTrade: true })
            .then(() => {
              setPopUp(true);
              setIsClicked(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const withinEnrollmentPeriod = startTime !== null && startTime < Date.now();

  if (loading) return <></>;

  return (
    <div class="flex">
      <Helmet title="P2P Trade Request | OurPortal" />
      {hasTrade ? (
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
                  onClick={dismissMessageRedirect}
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

              <span class="text-5xl font-bold">
                You already have an open trade!
              </span>
              <span class="text-2xl font-medium">
                You have to wait for your existing trade to be accepted or
                declined
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {done && !hasMod ? (
        <>
          <div
            class="absolute bottom-0 left-0 flex bg-gray-dark bg-opacity-50 h-full w-full z-20"
            data-testid="requestPopup"
          >
            <div class="bg-gray-100 px-5 pt-4 pb-5 w-1/2 flex flex-col rounded fixed transform -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2">
              <div class="flex justify-end">
                <svg
                  class="cursor-pointer"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={dismissMessageRedirect}
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

              <span class="text-5xl font-bold">Uh oh! &#x1F62C;</span>
              <span class="text-2xl font-medium">
                Seems like you do not have a HASS module yet. Come back once you
                have one!
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
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

              <span class="text-5xl font-bold">
                Trade request sent! &#x1F389;
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <Sidebar />
      <div class="flex flex-col flex-grow h-screen">
        <Header pageName="P2P Trade Request" />
        <div class="flex flex-col flex-grow px-6 pt-4">
          {withinEnrollmentPeriod ? (
            <>
              {info ? (
                <div
                  class="p-2 border-2 border-red-400 rounded mb-4"
                  data-testid="requestInfoTab"
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
                    <b>Welcome to P2P Trading.</b>
                    <p>
                      Already have someone to trade with? Here you can just
                      input their email and once they accept, you will be able
                      to swap modules.
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div class="flex flex-col w-1/2 mx-auto my-auto">
                <div class="flex flex-col">
                  {/* your current module */}
                  <span class="text-4xl font-bold text-justify">
                    Your Current Module
                  </span>
                  <Card
                    courseCode={mod.courseCode}
                    courseName={mod.courseName}
                    instructorFirstName={mod.instructorFirstName}
                    instructorLastName={mod.instructorLastName}
                    type={mod.type}
                  />
                </div>

                <div class="self-center justify-self-center">
                  {/* trade SVG */}
                  <svg
                    style={{ rotate: "90deg" }}
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
                  <span class="text-4xl font-bold text-justify">
                    Recipient's Details
                  </span>
                  <div
                    class="flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md mr-6 mb-6 p-2"
                    data-testid="requestRecipientCard"
                  >
                    <div class="my-auto">
                      <span class="font-semibold text-lg">Email</span>
                      <input
                        type="email"
                        class="w-full rounded bg-gray-300 px-4 py-4 mb-4"
                        placeholder="john_doe@mymail.sutd.edu.sg"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={startTime > Date.now()}
                      />

                      {/* generate magic link here */}
                      {isClicked ? (
                        <button class="opacity-50 flex flex-row mx-auto bg-green-500 text-gray-50 w-full py-2 rounded justify-center">
                          <div class="loader-sm"></div>
                        </button>
                      ) : (
                        <button
                          class="flex flex-row mx-auto bg-green-500 text-gray-50 w-full py-2 rounded justify-center"
                          onClick={sendRequest}
                          data-testid="requestSendButton"
                          disabled={startTime > Date.now()}
                        >
                          <span class="mr-2">Send</span>
                          <svg
                            width="26"
                            height="24"
                            viewBox="0 0 26 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.2917 5L22.2481 12L15.2917 19"
                              stroke="#F5F5F5"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <line
                              x1="20.9717"
                              y1="12.0317"
                              x2="4.60703"
                              y2="12.0317"
                              stroke="#F5F5F5"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ClosedPortal
              startTime={startTime}
              endTime={endTime}
              name="Peer-to-Peer Trade"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
