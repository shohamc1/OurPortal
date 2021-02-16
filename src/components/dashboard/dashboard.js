import * as React from "react";

import Sidebar from "../sidebar";
import Header from "../header";

const Dashboard = () => {
  return (
    <div class="flex">
      <Sidebar />
      <Header pageName="Overview" />
    </div>
  );
};

export default Dashboard;
