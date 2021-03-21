import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // modules currently in cart
  // cart is emptied once user checks out
  const [cart, setCart] = useState([]);
  // modules that user is currently enrolled in -- all modules displayed on dashboard
  const [enrolledModules, setEnrolledModules] = useState([]);
  // modules that user failed to enroll in -- used to display failed enrollment message
  // will be reset to empty array once user dismisses pop-up
  // includes object {enrollmentComplete: true} upon checkout to trigger display of message
  const [failedEnrollModules, setFailedEnrollModules] = useState([]);
  // hass module
  const [tradeModule, setTradeModule] = useState(null);
  // 3 selected autotrade modules
  const [autoTradeModules, setAutoTradeModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home"); // home, enroll, peer, auto, auto-search

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cart,
        setCart,
        enrolledModules,
        setEnrolledModules,
        failedEnrollModules,
        setFailedEnrollModules,
        autoTradeModules,
        setAutoTradeModules,
        activePage,
        setActivePage,
        tradeModule,
        setTradeModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return { ...context };
};

export { AuthContext, AuthProvider, useUser };
