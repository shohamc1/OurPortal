import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [tradeModule, setTradeModule] = useState(null);
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
