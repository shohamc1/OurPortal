import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import Sidebar from "../sidebar";
import Header from "../header";
import Card from "../card";
import TradeDetails from "./tradeDetails";

var database = firebase.firestore().collection("trades");
var modDB = firebase.firestore().collection("modules");

const ConfirmTrade = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [UID, setUID] = useState({});
  const [yourMod, setYourMod] = useState("");
  const [theirMod, setTheirMod] = useState("");
  const [yourModDetails, setYourModDetails] = useState("");
  const [theirModDetails, setTheirModDetails] = useState("");

  useEffect(() => {
    // get all data here
    database
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setExists(true);
          var data = doc.data();

          setYourMod(data.toMod);
          setTheirMod(data.fromMod);
          setUID({ their: data.from, your: data.to });
        }
      });

    // stop loading
    setLoading(false);
  }, []);

  useEffect(() => {
    if (theirMod != "") {
      // get their mod details
      modDB
        .doc(theirMod)
        .get()
        .then((doc) => {
          setTheirModDetails(doc.data());
        });
    }
  }, [theirMod]);

  useEffect(() => {
    if (yourMod != "") {
      // get your mod details
      modDB
        .doc(yourMod)
        .get()
        .then((doc) => {
          setYourModDetails(doc.data());
        });
    }
  }, [yourMod]);

  // need to check if trade exists first
  return (
    <div class="flex">
      {!loading ? (
        <>
          <TradeDetails
            id={id}
            exists={exists}
            yourModDetails={yourModDetails}
            theirModDetails={theirModDetails}
            uid={UID}
          />
        </>
      ) : (
        <div class="flex items-center justify-center absolute w-full h-full">
          <div class="loader"></div>
        </div>
      )}
    </div>
  );
};

export default ConfirmTrade;
