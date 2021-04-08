import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import { useUser } from "../../../context/authContext";
import ModuleTab from "./moduleTab";

const Cart = () => {
  const {
    cart,
    autoTradeModules,
    activePage,
    setActivePage,
    user,
    enrolledModules,
    setEnrolledModules,
    setFailedEnrollModules,
  } = useUser();
  const db = firebase.firestore();
  const collection = db.collection("availability");

  const array = activePage === "enroll" ? cart : autoTradeModules;
  const modules = array.map((m) => (
    <ModuleTab courseCode={m.courseCode} status={m.status} type={m.type} />
  ));

  const empty = (
    <div class="flex text-gray-400 py-2">
      {activePage === "enroll"
        ? "Your cart is empty!"
        : "You have not selected any modules!"}
    </div>
  );

  const checkOutProc = async () => {
    const tempSuc = [];
    const tempFail = [];
    for (const mod of array) {
      try {
        var doc = collection.doc(mod.courseCode);

        await db.runTransaction(async (t) => {
          const curModule = await t.get(doc);
          if (curModule.data().available > 0) {
            const newAvail = curModule.data().available - 1;
            t.update(doc, { available: newAvail });
            tempSuc.push(mod);
          } else {
            tempFail.push(mod);
          }
        });
      } catch (e) {
        console.log("Transaction error: ", e);
      }
    }

    if (tempSuc.length) {
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          modules: tempSuc.concat(enrolledModules).map((m) => m.courseCode),
        });

      setEnrolledModules(
        enrolledModules.concat(
          tempSuc.map((m) => ({ ...m, newlyEnrolled: true }))
        )
      );
    }
    // push {enrollmentComplete: true} object onto failedEnrollModules
    // to trigger display of checkout message
    // both successful and failed messages are triggered by this
    tempFail.push({ enrollmentComplete: true });
    setFailedEnrollModules(tempFail);
  };

  return (
    <div class="px-4 py-2 flex flex-col h-full" data-testid="cart">
      <div class="items-center flex flex-row w-full py-2">
        {activePage === "enroll" ? (
          <></>
        ) : (
          <a
            class="mr-3"
            href="#"
            onClick={() => {
              setActivePage("auto");
            }}
          >
            <svg
              class="mr-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.71729 5L3.00021 12L9.71729 19"
                stroke="#14142B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="1"
                y1="-1"
                x2="16.7331"
                y2="-1"
                transform="matrix(1 0 0 -1 3.26709 11.0317)"
                stroke="#14142B"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        )}
        <span class="text-3xl xl:text-4xl" data-testid="cartHeader">
          {activePage === "enroll" ? "Your Cart" : "Selected"}
        </span>
      </div>
      <div
        class="mb-auto overflow-y-scroll disable-scrollbars min-h-0"
        data-testid="cartContent"
      >
        {array.length ? modules : empty}
      </div>
      {activePage === "enroll" && array.length ? (
        <button
          class="bg-green-500 container py-3 px-8 mt-4 mb-3 rounded-md flex flex-row"
          onClick={checkOutProc}
        >
          <span class="text-white text-lg xl:text-xl text-center opacity-90 font-normal w-full">
            Proceed
          </span>
          <svg
            width="20"
            height="25"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6611 5.83179L17.1452 12.7664L11.6611 19.7009"
              stroke="#F5F6F8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="15.9272"
              y1="12.8071"
              x2="3.44929"
              y2="12.8071"
              stroke="#F5F6F8"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
