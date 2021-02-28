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
                  instructorFirstName={item.instructor_first_name}
                  instructorLastName={item.instructor_last_name}
                  type={item.type}
                  key={index}
                />
              </>
            ))}
          </div>
        </>
      ) : (
        <div class="ml-4 flex flex-col">
          <span class="text-3xl font-bold">No results 😞</span>
          <span class="text-xl font-medium">Try changing your search term.</span>
        </div>
      )}
    </>
  );
};

export const CustomHits = connectHits(Hits);
