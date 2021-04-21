import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "@reach/router";
import firebase from "firebase";

const VerifyEmail = ({ oobCode, email }) => {
  useEffect(() => {
    if (email && oobCode) {
      firebase
        .auth()
        .applyActionCode(oobCode)
        .then(() => {
          firebase.auth().signOut();
          // firebase
          //   .firestore()
          //   .collection("users")
          //   .where("email", "==", email)
          //   .get()
          //   .then((snapshot) => {
          //     snapshot.forEach((d) => {
          //       firebase
          //         .firestore()
          //         .collection("users")
          //         .doc(d.id)
          //         .update({ modules: [] });
          //     });
          //   });
        });
    }
  }, [email]);
  return (
    <div class="flex flex-col w-screen h-screen">
      <Helmet title="Verify Email | OurPortal" />
      <div class="flex my-auto mx-auto flex-col px-2 ">
        <div class="flex flex-col rounded-lg bg-gray-300 p-4 px-6 mb-8">
          <span class="font-semibold text-lg">Verify Email</span>
          <div class="pb-4">
            <p>Congratulations, your email has been verified!</p>
            <Link to="/dashboard" class="text-lg text-purple-600 text-center">
              {"< Head back to OurPortal"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
