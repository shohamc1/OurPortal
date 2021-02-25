import { Router } from "@reach/router";
import React from "react";

import NotFoundPage from "./404";
import Landing from "../components/auth/landing";
import Dashboard from "../components/dashboard/dashboard";
import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";
import Trade from "../components/autoTrade/trade";
import Enroll from "../components/enroll/enroll";
import Request from "../components/p2ptrade/request";
import ConfirmTrade from "../components/p2ptrade/confirmTrade";

const Index = () => {
  return (
    <Router basepath="/">
      <NotFoundPage default />

      <Login path="/login" />
      <SignUp path="/signup" />

      <Landing path="/" />
      <Dashboard path="dashboard" />
      <Trade path="autotrade" />
      <Enroll path="enroll" />
      <Request path="request" />
      <ConfirmTrade path="trade/:id" />
    </Router>
  );
};

export default Index;
