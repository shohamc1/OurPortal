import React from "react";
import { Helmet } from "react-helmet";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";

const Dashboard = () => {
  return (
    <div class="flex">
      <Helmet title="Overview | OurPortal" />
      <Sidebar active="home" />
      <div class="flex flex-col flex-grow">
        <Header pageName="Overview" />
        <div class="pl-6 pt-4">
          <div class="text-5xl font-light mb-4">Good morning, firstname</div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <Card
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
