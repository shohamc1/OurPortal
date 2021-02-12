import * as React from "react";

import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Index = () => {
  return (
    <div class="flex bg-gray-1">
      <Sidebar />
      <Header pageName="Overview" />
    </div>
  );
};

export default Index;
