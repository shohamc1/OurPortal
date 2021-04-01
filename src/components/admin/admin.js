import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";

import Header from "../header";
import { AuthContext } from "../../context/authContext";

const Admin = () => {
  const [clicked, setClicked] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const db = firebase.firestore().collection("users");

  useEffect(() => {
    if (user) {
      // get user data from firestore
      db.doc(user.uid)
        .get()
        .then((doc) => {
          var data = doc.data();
          setFirstName(data.firstName);
          data.admin ? setAdmin(true) : setAdmin(false);
          setReady(true);
        });
    }
  }, [loading]);

  const dismissMessage = () => {
    setPopUp(false);
  };

  const exportFunc = () => {
    setClicked(true);

    axios
      .post(
        "https://us-central1-ourportal-e0a9c.cloudfunctions.net/exportCSV",
        null,
        {
          headers: {
            "Content-Disposition": "attachment; filename=export.csv",
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "export.csv");
          document.body.appendChild(link);
          link.click();

          setPopUp(true);
          setClicked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!ready) {
    return (
      <div class="flex h-screen w-screen items-center justify-center">
        <Helmet title="Overview | OurPortal" />
        <div class="loader"></div>
      </div>
    );
  }

  if (ready && !admin) {
    return (
      <div class="flex">
        <Helmet title="Overview | OurPortal" />
        <div class="flex flex-col p-2">
          <span class="text-5xl font-bold">You're not an admin! &#x1F620;</span>
          <span class="mt-2 text-xl">
            If you aren't supposed to see this, contact the administrators.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div class="flex">
      <Helmet title="Overview | OurPortal" />
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
                Exported data successfully! &#x2705;
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div class="flex flex-col flex-grow">
        <Header pageName="Admin Portal" />
        <div class="pl-4 pt-4">
          <div class="text-5xl font-light mb-4" data-testId="welcomeMessage">
            Hello {firstName}!
          </div>
          {!clicked ? (
            <button
              class="font-light bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-button px-12 py-4 w-1/5"
              onClick={exportFunc}
            >
              <span class="text-3xl">Export CSV</span>
            </button>
          ) : (
            <button
              disabled
              class="opacity-50 font-light bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-button px-12 py-4 w-1/5 justify-center flex"
            >
              <div class="loader-sm"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
