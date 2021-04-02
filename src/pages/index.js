import { Router } from "@reach/router";
import React from "react";

import NotFoundPage from "./404";
import Landing from "components/auth/landing";
import Dashboard from "components/dashboard/dashboard";
import Login from "components/auth/login";
import SignUp from "components/auth/signup";
import Trade from "components/autoTrade/trade";
import Enroll from "components/enroll/enroll";
import Request from "components/p2ptrade/request";
import ConfirmTrade from "components/p2ptrade/confirmTrade";
import Admin from "components/admin/admin";

import { AuthProvider } from "context/authContext";
import OnlyPublicRoute from "routes/onlyPublicRoute";
import OnlyPrivateRoute from "routes/onlyPrivateRoute";

const Index = () => {
  return (
    <AuthProvider>
      <Router basepath="/">
        <NotFoundPage default />
        <Landing path="/" />

        <OnlyPublicRoute component={Login} path="/login" />
        <OnlyPublicRoute component={SignUp} path="/signup" />

        <OnlyPrivateRoute component={Dashboard} path="dashboard" />
        <OnlyPrivateRoute component={Trade} path="autotrade" />
        <OnlyPrivateRoute component={Enroll} path="enroll" />
        <OnlyPrivateRoute component={Request} path="request" />
        <ConfirmTrade path="trade/:id" />

        <OnlyPrivateRoute component={Admin} path="admin" />
      </Router>
    </AuthProvider>
  );
};

export default Index;
