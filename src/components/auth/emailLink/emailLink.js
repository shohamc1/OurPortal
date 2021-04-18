import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import ResetPassword from "./resetPassword";
import VerifyEmail from "./verifyEmail";
import firebase from "firebase";

const EmailLink = (props) => {
  const [mode, setMode] = useState("");
  const [email, setEmail] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [validCode, setValidCode] = useState(null);
  useEffect(() => {
    const queryString = props.location.search.replace("?", "");
    const params = queryString.split("&");
    let tempCode, tempMode;
    params.forEach((p) => {
      const [key, value] = p.split("=");
      if (key === "oobCode") {
        tempCode = value;
      }
      if (key === "mode") {
        tempMode = value;
      }
    });

    if (tempMode === "resetPassword") {
      firebase
        .auth()
        .verifyPasswordResetCode(tempCode)
        .then((val) => {
          setValidCode(true);
          setMode(tempMode);
          setOobCode(tempCode);
        })
        .catch((e) => {
          setValidCode(false);
          console.log(e);
        });
    } else if (tempMode === "verifyEmail") {
      firebase
        .auth()
        .checkActionCode(tempCode)
        .then((val) => {
          setValidCode(true);
          setMode(tempMode);
          setOobCode(tempCode);
          setEmail(val.data.email);
        })
        .catch((e) => {
          setValidCode(false);
          console.log(e);
        });
    }
  }, []);

  const error = (
    <div class="flex w-screen h-screen">
      <div class="flex flex-col m-auto">
        <span class="text-3xl font-bold tracking-tight text-center">
          Oops, it seems like this link is invalid ¯\_(ツ)_/¯
        </span>
        <Link
          to="/dashboard"
          class="text-2xl text-purple-600 font-semibold tracking-tight text-center"
        >
          {"< Head back to OurPortal"}
        </Link>
      </div>
    </div>
  );

  if (!mode && validCode === null) return <></>;

  if (!validCode) return error;

  if (mode === "verifyEmail")
    return <VerifyEmail oobCode={oobCode} email={email} />;

  if (mode === "resetPassword") return <ResetPassword oobCode={oobCode} />;

  return <></>;
};

export default EmailLink;
