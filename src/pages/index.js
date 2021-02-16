import { Router } from "@reach/router";
import React from "react";

import NotFoundPage from "./404";
import Landing from "../components/auth/landing";
import Dashboard from "../components/dashboard/dashboard";
import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";

const Index = () => {
  return (
    <Router basepath="/">
      <NotFoundPage default />

      <Login path="/login" />
      <SignUp path="/signup" />

      <Landing path="/" />
      <Dashboard path="dashboard" />
    </Router>
  );
};

export default Index;
