import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/authContext";
import CONSTANTS from "../../../constants";

import firebase from "firebase/app";
import "firebase/database";

var database = firebase.firestore();

const Status = ({ statusType }) => {
  const { STATUS_COLOUR } = CONSTANTS;
  var fillColour = STATUS_COLOUR[statusType]
    ? STATUS_COLOUR[statusType]
    : STATUS_COLOUR["Available"];

  return (
    <div class="flex flex-row items-center mb-2" data-testid="moduleCardStatus">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill={fillColour} />
      </svg>
      <span class="ml-2">{statusType}</span>
    </div>
  );
};

const ModuleCard = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
  type,
}) => {
  const { MODULE_CARD_COLOUR } = CONSTANTS;
  const {
    activePage,
    autoTradeModules,
    setAutoTradeModules,
    enrolledModules,
    cart,
    setCart,
    pillar,
    setPillar,
    setAddToCartErrorMessage,
  } = useUser();
  const [added, setAdded] = useState(false);
  const [available, setAvailable] = useState("Full");

  useEffect(() => {
    if (
      (activePage === "auto-search" &&
        autoTradeModules.some((m) => m.courseCode === courseCode)) ||
      (activePage === "enroll" && cart.some((m) => m.courseCode === courseCode))
    ) {
      setAdded(true);
    }
  }, []);

  useEffect(() => {
    var array = activePage === "enroll" ? cart : autoTradeModules;
    setAdded(array.map((m) => m.courseCode).includes(courseCode));
  }, [courseCode, cart, autoTradeModules]);

  var number = database.collection("availability").doc(courseCode);
  useEffect(() => {
    number.onSnapshot((snapshot) => {
      var data = snapshot.data();
      if (data.available === 0) {
        setAvailable("Full");
      } else if (data.available < 10) {
        setAvailable("Filling Fast");
      } else {
        setAvailable("Available");
      }

      if (data == null) {
        setAvailable("Full");
      }
    });
  });

  var focusColor = MODULE_CARD_COLOUR[type]
    ? MODULE_CARD_COLOUR[type]
    : MODULE_CARD_COLOUR.DEFAULT;

  const hitMaxModules = cart.length + enrolledModules.length >= 4;
  const hasHASSModule =
    enrolledModules.find((m) => m.courseCode.slice(0, 2) === "02") ||
    cart.find((m) => m.courseCode.slice(0, 2) === "02");
  const canSelectHASSModule = type === "HASS" && !hasHASSModule;
  const canSelectThisPillar = type !== "HASS" && (!pillar || type === pillar);
  const hitMaxPillarModules =
    !hasHASSModule &&
    cart.length + enrolledModules.length >= 3 &&
    type !== "HASS";

  const canEnroll =
    !hitMaxModules &&
    !hitMaxPillarModules &&
    (canSelectHASSModule || canSelectThisPillar);

  const addToCart = () => {
    if (activePage === "enroll") {
      if (canEnroll) {
        setAdded(true);
        setCart([...cart, { courseCode, type, courseName, status: available }]);

        if (!pillar && type !== "HASS") {
          setPillar(type);
        }
      } else if (hitMaxModules) {
        setAddToCartErrorMessage(
          "Oops, you have already selected/enrolled in 4 modules."
        );
      } else if (hitMaxPillarModules) {
        setAddToCartErrorMessage(
          "Oops, you have already selected/enrolled in 3 pillar modules. Pick a HASS module instead."
        );
      } else if (type === "HASS") {
        setAddToCartErrorMessage(
          "Oops, you can only enroll in one HASS module."
        );
      } else {
        setAddToCartErrorMessage("Oops, this module is not from your pillar.");
      }
    } else if (activePage === "auto-search") {
      if (autoTradeModules.length < 3) {
        setAdded(true);
        setAutoTradeModules([
          ...autoTradeModules,
          { courseCode, type, courseName, weightage: "", status: available },
        ]);
      } else {
        alert(
          "You have already selected 3 modules. Remove one to add a new one."
        );
      }
    }
  };

  const removeFromCart = () => {
    setAdded(false);
    if (activePage === "enroll") {
      setCart(cart.filter((m) => m.courseCode !== courseCode));
    } else if (activePage === "auto-search") {
      setAutoTradeModules(
        autoTradeModules.filter((m) => m.courseCode !== courseCode)
      );
    }
  };

  return (
    <div
      class="relative flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md overflow-hidden mr-6 mb-6"
      data-testid={`${courseCode}`}
    >
      <div class={`text-4xl font-semibold pl-4 py-2 ${focusColor}`}>
        {courseCode}
      </div>
      <div class="flex flex-col pl-4 py-2 h-full">
        <span class="text-lg">{courseName}</span>
        <div class="flex pb-2 pr-4 mt-auto">
          <div class="flex flex-col">
            <Status statusType={available} />
            <span class="text-sm font-light">{instructorLastName}</span>
            <span class="text-sm font-light">{instructorFirstName}</span>
          </div>
          <button
            class="ml-auto mt-auto rounded-full h-1/2 bg-gray-300 text-sm px-4"
            onClick={added ? removeFromCart : addToCart}
          >
            {added ? (
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 4.5L13.2984 14.0806"
                  stroke="#14142B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.25 14.0806L13.2984 4.49992"
                  stroke="#14142B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6589 9.608H9.17088V17.16H7.79488V9.608H0.338875V8.392H7.79488V0.839998H9.17088V8.392H16.6589V9.608Z"
                  fill="black"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
