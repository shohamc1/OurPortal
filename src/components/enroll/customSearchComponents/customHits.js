import React from "react";
import { connectHits } from "react-instantsearch-dom";
import ModuleCard from "./moduleCard";

const Hits = ({ hits }) => {
  return (
    <>
      {hits.length !== 0 ? (
        <>
          <div class="pl-6 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {hits.map((item, index) => (
              <>
                <ModuleCard
                  courseCode={item.subject_code}
                  courseName={item.title}
                  instructorFirstName={item.instructor}
                  instructorLastName={item.instructor}
                  type={item.type}
                  key={index}
                />
              </>
            ))}
          </div>
        </>
      ) : (
        <span>No results</span>
      )}
    </>
  );
};

export const CustomHits = connectHits(Hits);
