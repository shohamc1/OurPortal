import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import AlgoliaMainContent from "./algoliaMainContent";
import { useUser } from "../../context/authContext";

const Enroll = () => {
  const {
    setActivePage,
    failedEnrollModules,
    setFailedEnrollModules,
    enrolledModules,
    setEnrolledModules,
    setCart,
    user,
  } = useUser();
  const [showMessage, setShowMessage] = useState(false);
  const db = firebase.firestore().collection("users");
  const moduleDB = firebase.firestore().collection("modules");
  const success = failedEnrollModules.length <= 1;

  useEffect(() => {
    setActivePage("enroll");
    fetchData();
  }, []);

  useEffect(() => {
    // upon completeing checkout process, we push {enrollmentComplete: true}
    // onto failedEnrollModules to trigger display of checkout message
    // both successful and failed messages are triggered by this
    if (
      failedEnrollModules.length &&
      failedEnrollModules[failedEnrollModules.length - 1].enrollmentComplete
    ) {
      setShowMessage(true);
      document.body.style.overflow = "hidden";
    }
  }, [failedEnrollModules]);

  const fetchData = () => {
    db.doc(user.uid)
      .get()
      .then((doc) => {
        var data = doc.data();

        var modulesArray = data.modules;
        var modulesData = [];
        var promises = [];

        modulesArray.forEach(function (item) {
          promises.push(
            moduleDB
              .doc(item)
              .get()
              .then((doc) => {
                modulesData.push(doc.data());
              })
          );
        });

        Promise.all(promises).then(() => {
          setEnrolledModules(modulesData);
        });
      });
  };

  const dismissMessage = () => {
    setShowMessage(false);
    document.body.style.overflow = "scroll";
    setCart([]);
    setFailedEnrollModules([]);
    setEnrolledModules(
      enrolledModules.map((m) => {
        if (m.newlyEnrolled) delete m.newlyEnrolled;
        return m;
      })
    );
  };

  return (
    <div class="relative">
      <div class="flex">
        <Helmet title="Enroll | OurPortal" />
        <Sidebar />
        <div class="flex flex-col flex-grow">
          <Header pageName="Enroll" backAction={true} />
          <div class="h-full">
            <AlgoliaMainContent />
          </div>
        </div>
      </div>
      {showMessage ? (
        <div class="absolute bottom-0 left-0 flex bg-gray-dark bg-opacity-50 h-full w-full z-20">
          <div
            class={`${
              success ? "bg-green-500" : "bg-red-500"
            } px-5 pt-4 pb-5 w-1/2 flex flex-col rounded fixed transform -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2`}
            data-testid="enrollModal"
          >
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
            <div class="flex justify-center flex-col text-center">
              {success ? (
                <>
                  <p class="font-semibold text-xl">
                    You have successfully enrolled into the following modules
                  </p>
                  <br />
                  {enrolledModules.reduce((arr, m) => {
                    if (m.newlyEnrolled) {
                      arr.push(
                        <p data-testid="enrollMods">{`${m.courseCode}: ${m.courseName}`}</p>
                      );
                    }
                    return arr;
                  }, [])}
                </>
              ) : (
                <>
                  <p class="font-semibold text-xl">
                    The enrollment for the modules has failed
                  </p>
                  <br />
                  {failedEnrollModules.reduce((arr, m) => {
                    if (m.courseCode) {
                      arr.push(<p>{`${m.courseCode}: ${m.courseName}`}</p>);
                    }
                    return arr;
                  }, [])}{" "}
                  <br />
                  <p class="text-xs italic">
                    This is because the modules are no longer available.
                  </p>
                  {enrolledModules.find((m) => m.newlyEnrolled) ? (
                    <>
                      <p class="pt-4 font-semibold text-xl">
                        You have been successfully enrolled into the following
                        modules{" "}
                      </p>
                      <br />
                      {enrolledModules.reduce((arr, m) => {
                        if (m.newlyEnrolled) {
                          arr.push(<p>{`${m.courseCode}: ${m.courseName}`}</p>);
                        }
                        return arr;
                      }, [])}{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Enroll;
