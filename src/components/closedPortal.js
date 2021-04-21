import React from "react";
import moment from "moment";
import "moment-timezone";

import ClosedSign from "../images/ClosedSign.js";

const ClosedPortal = ({
  startTime,
  endTime,
  name,
  showImage = true,
  additionalComponent = <></>,
  width = "w-7/12",
}) => {
  return (
    <div class={`mx-auto flex flex-col p-2 rounded ${width}`}>
      {showImage ? (
        <div class="h-1/6 w-7/12 m-auto mb-8">
          <ClosedSign />
        </div>
      ) : (
        <></>
      )}
      <span
        class="lg:text-4xl sm:text-2xl font-bold mb-4 text-center "
        data-testid="closedPortalMessage"
      >
        Enrollment has not started!
      </span>
      <p class="lg:text-xl sm:text-md font-semibold text-center">
        {`${name} will only be live during the enrollment period. `}
        {startTime === null
          ? "Please await the release of information regarding your next enrollment period by your school administrators."
          : "Your next enrollment period will begin on " +
            moment(startTime).tz("Asia/Singapore").format("MMM DD, YYYY") +
            " at " +
            moment(startTime).tz("Asia/Singapore").format("LT") +
            " and end on " +
            moment(endTime).tz("Asia/Singapore").format("MMM DD, YYYY") +
            " at " +
            moment(endTime).tz("Asia/Singapore").format("LT") +
            "."}
      </p>
      {additionalComponent}
    </div>
  );
};

export default ClosedPortal;
