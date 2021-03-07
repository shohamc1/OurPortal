import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";
import { AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userUID, setUserUID] = useState(null);
  const [firstName, setFirstName] = useState("Hugh");
  const [modules, setModules] = useState([]);
  const db = firebase.firestore().collection("users");
  const moduleDB = firebase.firestore().collection("modules");

  useEffect(() => {
    if (user !== null) {
      setUserUID(user.uid);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [userUID]);

  const fetchData = async () => {
    var doc = await db.doc(user.uid).get();
    var data = doc.data();
    setFirstName(data.firstName);

    var modulesArray = data.modules;
    var modulesData = [];
    var doc1 = "";
    modulesArray.forEach(async function (item) {
      doc1 = await moduleDB.doc(item).get();
      modulesData.push(doc1.data());
    });
    setModules(modulesData);
  };

  return (
    <div class="flex">
      <Helmet title="Overview | OurPortal" />
      <Sidebar active="home" />
      <div class="flex flex-col flex-grow">
        <Header pageName="Overview" />
        <div class="pl-6 pt-4">
          <div class="text-5xl font-light mb-4">Good Morning, {firstName}</div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {modules.length ? (
              modules.map((item, index) => (
                <Card
                  courseCode={item.subject_code}
                  courseName={item.title}
                  instructorFirstName={item.instructor_first_name}
                  instructorLastName={item.instructor_last_name}
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
