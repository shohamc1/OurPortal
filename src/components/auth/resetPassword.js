import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "@reach/router";
import firebase from "firebase/app";
import "firebase/auth";

const ResetPassword = (props) => {
  const [oobCode, setOobCode] = useState("");
  const [validCode, setValidCode] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [resetComplete, setResetComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const queryString = props.location.search.replace("?", "");
    const params = queryString.split("&");
    let tempCode;
    params.forEach((p) => {
      const [key, value] = p.split("=");
      if (key === "oobCode") {
        tempCode = value;
      }
    });
    firebase
      .auth()
      .verifyPasswordResetCode(tempCode)
      .then((val) => {
        setValidCode(true);
        setOobCode(tempCode);
      })
      .catch((e) => {
        setValidCode(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (errorMsg) {
      setErrorMsg("");
    }
  }, [password, passwordCopy]);

  const handlePasswordChange = (event) => {
    const target = event.target;
    const value = target.value;

    setPassword(value);
  };

  const handlePasswordCopyChange = (event) => {
    const target = event.target;
    const value = target.value;

    setPasswordCopy(value);
  };

  const resetPassword = () => {
    if (resetComplete) return;

    if (password !== passwordCopy) {
      setErrorMsg("Passwords do not match");
    } else if (password.length < 6) {
      setErrorMsg("Password must contain at least 6 characters");
    } else if (password.length > 40) {
      setErrorMsg("Password cannot exceed 40 characters");
    } else if (!password.match(/\d/)) {
      setErrorMsg("Password must contain at least one number");
    } else if (!password.match(/[a-z]/)) {
      setErrorMsg("Password must contain at least one lowercase character");
    } else if (!password.match(/[A-Z]/)) {
      setErrorMsg("Password must contain at least one uppercase character");
    } else if (!password.match(/[@$!%*#?&]/)) {
      setErrorMsg("Password must contain at least one special character");
    } else {
      firebase
        .auth()
        .confirmPasswordReset(oobCode, password)
        .then((val) => {
          setResetComplete(true);
        })
        .catch((err) => {
          setErrorMsg("Error resetting pasword. Try again!");
        });
    }
  };

  if (validCode === null) return <></>;

  if (validCode)
    return (
      <div class="flex flex-col w-screen h-screen">
        <Helmet title="Reset Password | OurPortal" />
        <div class="flex my-auto mx-auto flex-col px-2 md:w-6/12 lg:w-4/12">
          <div class="flex flex-col rounded-lg bg-gray-300 p-4 px-6 mb-8">
            <span class="font-semibold text-lg">Create New Password</span>
            <div class="pb-4">
              <p>Please ensure that your password has:</p>
              <ul class="list-disc pl-4">
                <li class="list-item">between 6 and 40 characters</li>
                <li class="list-item">
                  at least 1 uppercase and 1 lowercase character
                </li>
                <li class="list-item">at least 1 number</li>
                <li class="list-item">
                  at least 1 special character (@ $ ! % * # ? &)
                </li>
              </ul>
            </div>
            <span class="font-semibold text-lg">New Password</span>
            <input
              name="password"
              autoComplete="password"
              type="password"
              class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              data-testid="password-reset"
            />
            <span class="font-semibold text-lg">Confirm Password</span>
            <input
              name="password-copy"
              autoComplete="password-copy"
              type="password"
              class="w-full rounded bg-gray-600 px-4 py-4 mb-4"
              placeholder="********"
              value={passwordCopy}
              onChange={handlePasswordCopyChange}
              data-testid="password-reset-copy"
            />
          </div>
          <button
            class="bg-purple-500 rounded-button p-4 text-white"
            onClick={resetPassword}
            data-testid="resetPasswordBtn"
          >
            Reset Password
          </button>
        </div>
        {resetComplete ? (
          <div class="m-auto mt-2">
            <Link to="/dashboard" class="text-lg text-purple-600 text-center">
              {"< Head back to OurPortal"}
            </Link>
          </div>
        ) : (
          ""
        )}
        {(errorMsg || resetComplete) && (
          <div
            class={`flex justify-center items-center mt-4 p-4 ${
              resetComplete ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            <div class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-info w-5 h-5 mx-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div class="w-full" data-testid="resetPasswordErrorMessage">
              {resetComplete ? "Success!" : errorMsg}
            </div>
          </div>
        )}
      </div>
    );

  return (
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
};

export default ResetPassword;
