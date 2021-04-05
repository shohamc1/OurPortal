import React from "react";

import Card from "../card";
import EditCard from "./editCard";

const ModsGrid = ({ modules, mode }) => {
  if (!mode) {
    return (
      <>
        {modules.length ? (
          modules.map((item, index) => (
            <EditCard
              courseCode={item.courseCode}
              courseName={item.courseName}
              instructorFirstName={item.instructorFirstName}
              instructorLastName={item.instructorLastName}
              type={item.type}
              key={index}
            />
          ))
        ) : (
          <></>
        )}
      </>
    );
  }
  return (
    <>
      {modules.length ? (
        modules.map((item, index) => (
          <Card
            courseCode={item.courseCode}
            courseName={item.courseName}
            instructorFirstName={item.instructorFirstName}
            instructorLastName={item.instructorLastName}
            type={item.type}
            key={index}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ModsGrid;
