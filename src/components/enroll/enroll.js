import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Sidebar from "../sidebar";
import Header from "../header";
import AlgoliaMainContent from "./algoliaMainContent";
import { useUser } from "../../context/authContext";

const Enroll = () => {
  const user = useUser();

  useEffect(() => {
    user.setActivePage("enroll");
  }, []);
  console.log(user);
  return (
    <div class="flex">
      <Helmet title="Enroll | OurPortal" />
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
