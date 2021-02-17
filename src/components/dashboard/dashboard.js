import * as React from "react";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";

const Dashboard = () => {
  return (
    <div class="flex">
      <Sidebar />
      <div class="flex flex-col flex-grow">
        <Header pageName="Overview" />
        <div class="pl-6 pt-4">
          <div class="text-5xl font-light mb-4">Good morning, firstname</div>
          <div class="flex flex-row flex-wrap">
            <Card
              courseCode="30.001"
              courseName="Ayylmao"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
            />

            <Card
              courseCode="30.002"
              courseName="ggezpz"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
            />

            <Card
              courseCode="30.003"
              courseName="wth"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
            />

            <Card
              courseCode="30.004"
              courseName="aaaa"
              instructorFirstName="Yang Huei"
              instructorLastName="Pang"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
