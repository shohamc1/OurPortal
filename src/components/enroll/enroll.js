import React from "react";

import Sidebar from "../sidebar";
import Header from "../header";
import AlgoliaMainContent from "./algoliaMainContent";

const Enroll = () => {
  return (
    <div class="flex">
      <Sidebar active="enroll" />
      <div class="flex flex-col flex-grow">
        <Header pageName="Enroll" />
        <div class="h-full">
          <AlgoliaMainContent />
        </div>
      </div>
    </div>
  );
};

export default Enroll;
