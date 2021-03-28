import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";
import { AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { user, setActivePage } = useContext(AuthContext);
  const [userUID, setUserUID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [modules, setModules] = useState([]);
  const db = firebase.firestore().collection("users");
  const moduleDB = firebase.firestore().collection("modules");

  useEffect(() => {
    setActivePage("home");
  }, []);

  useEffect(() => {
    if (user !== null) {
      setUserUID(user.uid);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [userUID]);

  const fetchData = () => {
    db.doc(user.uid)
      .get()
      .then((doc) => {
        var data = doc.data();
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
        });
      });
  };

  return (
    <div class="flex">
      <Helmet title="Overview | OurPortal" />
      <Sidebar />
      <div class="flex flex-col flex-grow">
        <Header pageName="Overview" />
        <div class="pl-6 pt-4">
          <div class="text-5xl font-light mb-4" data-testId="dashboardWelcome">
            Good Morning, {firstName}
          </div>
          <div
            class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
            data-testid="dashboardMods"
          >
            {modules.length ? (
              modules.map((item, index) => (
                <Card
                  courseCode={item.courseCode}
                  courseName={item.courseName}
                  instructorFirstName={item.instructorFirstName}
                  instructorLastName={item.instructorLastName}
                  type={item.type}
                  key={index}
                />
              ))
            ) : (
              <></>
            )}
            {/* <Card
              courseCode="30.001"
              courseName="Ayylmao"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
              type="HASS"
            />

            <Card
              courseCode="30.002"
              courseName="ggezpz"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
              type="EPD"
            />

            <Card
              courseCode="30.003"
              courseName="wth"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
              type="ISTD"
            />

            <Card
              courseCode="30.004"
              courseName="aaaa"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
              type="ESD"
            />

            <Card
              courseCode="30.004"
              courseName="aaaa"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
              type="ASD"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
