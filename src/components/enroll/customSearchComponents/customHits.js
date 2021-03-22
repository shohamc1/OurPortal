import React from "react";
import { connectHits } from "react-instantsearch-dom";
import ModuleCard from "./moduleCard";
import { useUser } from "../../../context/authContext";

const Hits = ({ hits }) => {
  const { activePage, tradeModule, enrolledModules } = useUser();
  console.log(enrolledModules);
  const enrolledModulesCode = enrolledModules.map((m) => m.courseCode);
  const shouldFilter = (item) => {
    return (
      (activePage === "auto-search" &&
        tradeModule.courseCode === item.courseCode) ||
      (activePage === "enroll" && enrolledModulesCode.includes(item.courseCode))
    );
  };
  return (
    <>
      {hits.length !== 0 ? (
        <>
          <div class="pl-6 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {hits.map((item, index) =>
              shouldFilter(item) ? (
                <></>
              ) : (
                <>
                  <ModuleCard
                    courseCode={item.courseCode}
                    courseName={item.courseName}
                    instructorFirstName={item.instructorFirstName}
                    instructorLastName={item.instructorLastName}
                    type={item.type}
                    key={index}
                  />
                </>
              )
            )}
          </div>
          <div class="mx-auto text-center text-xs font-light">
            You have reached the end of results.{" "}
            <span role="img" aria-label="no-mouth">
              😶
            </span>
          </div>
        </>
      ) : (
        <div class="ml-4 flex flex-col">
          <span class="text-3xl font-bold">
            No results{" "}
            <span role="img" aria-label="sad">
              😞
            </span>
          </span>
          <span class="text-xl font-medium">
            Try changing your search term.
          </span>
        </div>
      )}
    </>
  );
};

export const CustomHits = connectHits(Hits);
