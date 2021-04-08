import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import CONSTANTS from "../../constants";
import { AuthContext } from "context/authContext";

const EditCard = ({
  courseName,
  courseCode,
  instructorFirstName,
  instructorLastName,
  type,
}) => {
  const { MODULE_CARD_COLOUR } = CONSTANTS;
  var focusColor = MODULE_CARD_COLOUR[type]
    ? MODULE_CARD_COLOUR[type]
    : MODULE_CARD_COLOUR.DEFAULT;
  const db = firebase.firestore().collection("users");

  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const deleteProc = (e) => {
    e.preventDefault();
    setVisible(true);

    db.doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var mods = doc.data().modules;
          mods.splice(mods.indexOf(courseCode), 1);
          return { mods, autoTradeMods: doc.data().autoTradeModules };
        }
      })
      .then(({ mods, autoTradeMods }) => {
        db.doc(user.uid)
          .update({
            modules: mods,
            autoTradeModules:
              courseCode.slice(0, 2) === "02" ? null : autoTradeMods,
          })
          .then(() => {
            setVisible(false);
            setDeleted(true);
          });
      });
  };

  if (deleted) {
    return <></>;
  }

  return (
    <div class="pulse relative flex flex-col rounded bg-gray-50 w-auto h-60 shadow-md overflow-hidden mr-6 mb-6">
      <div
        class={`flex text-4xl font-semibold pl-4 py-2 ${focusColor}`}
        data-testid={courseCode}
      >
        <div class="mr-auto">{courseCode}</div>
        {visible ? (
          <div class="mr-4 loader-sm self-center"></div>
        ) : (
          <>
            <button
              class="mr-4"
              onClick={(e) => {
                deleteProc(e);
              }}
              data-testid="editCardDelete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div class="flex flex-col px-4 py-2 h-full">
        <span class="text-lg" data-testid="courseName">
          {courseName}
        </span>
        <div class="flex pb-2 pr-4 mt-auto">
          <div class="flex flex-col">
            <span class="text-sm font-light" data-testid="instructorLastName">
              {instructorLastName}
            </span>
            <span class="text-sm font-light" data-testid="instructorFirstName">
              {instructorFirstName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
