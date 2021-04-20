import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";

import { AuthContext } from "../../context/authContext";
import ModsGrid from "./modsGrid";
import { navigate } from "@reach/router";

const Dashboard = () => {
  const { user, setActivePage } = useContext(AuthContext);
  const [userUID, setUserUID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [modules, setModules] = useState([]);
  const [mode, setMode] = useState(true); // false -> edit, true -> display
  const [loading, setLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState(false); // false -> morning, true -> evening
  // const [show, setShow] = useState(false);
  const db = firebase.firestore().collection("users");
  const moduleDB = firebase.firestore().collection("modules");

  useEffect(() => {
    setActivePage("home");
    setMode(true);
    new Date().getHours() > 12 ? setTimeOfDay(true) : setTimeOfDay(false);
  }, []);

  useEffect(() => {
    if (user !== null) {
      setUserUID(user.uid);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    mode ? fetchData() : setLoading(false);
  }, [userUID, mode]);

  const toggleMode = () => {
    setMode(!mode);
  };

  const fetchData = () => {
    db.doc(user.uid)
      .get()
      .then(async (doc) => {
        var data = doc.data();
        // if (data.admin) {
        //   navigate("/admin");
        // } else {
        //   setShow(true);
        setFirstName(data.firstName);

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
          setModules(modulesData);
          setLoading(false);
        });
        // }
      });
  };

  // if (!show) return <></>;

  if (loading) {
    return (
      <div class="flex">
        <Helmet title="Overview | OurPortal" />
        <Sidebar />
        <div class="flex flex-col flex-grow h-screen w-screen">
          <Header pageName="Overview" />
          <div class="mx-auto my-auto">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="flex">
      <Helmet title="Overview | OurPortal" />
      <Sidebar />
      <div class="flex flex-col flex-grow">
        <Header pageName="Overview" />
        <div class="pl-6 pt-4">
          <div class="flex flex-row items-start">
            <div
              class="text-5xl font-light mb-4"
              data-testId="dashboardWelcome"
            >
              {timeOfDay
                ? `Good Evening, ${firstName}`
                : `Good Morning, ${firstName}`}
            </div>
            {mode ? (
              <button
                class="flex mb-auto ml-auto mr-4 p-2 rounded-full bg-gray-200 items-center"
                onClick={toggleMode}
                data-testid="dashboardEdit"
              >
                <svg
                  class="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
                </svg>
                Edit
              </button>
            ) : (
              <button
                class="flex mb-auto ml-auto mr-4 p-2 rounded-full bg-gray-200 items-center"
                onClick={toggleMode}
                data-testid="dashboardShow"
              >
                <svg
                  class="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0v19h24v-19h-24zm22 17h-20v-15h20v15zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
                </svg>
                Show
              </button>
            )}
          </div>
          {modules.length == 0 ? (
            <span class="text-2xl" data-testid="dashboardNoMod">
              Seems like you have no modules yet. &#x1F61E;
            </span>
          ) : (
            <div
              class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
              data-testid="dashboardMods"
            >
              <ModsGrid modules={modules} mode={mode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
