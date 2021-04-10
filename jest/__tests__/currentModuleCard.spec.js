import React from "react";
import { render } from "@testing-library/react";

import CurrentModuleCard from "@components/autoTrade/currentModuleCard.js";

describe("Autotrade Current Module Card", () => {
  // suppress console warnings, they are categorized as errors for some reason
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Enrolled in HASS", () => {
    const { getByTestId, queryByTestId } = render(
      <CurrentModuleCard
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
      />
    );

    expect(getByTestId("courseCode")).toHaveTextContent("02.213");
    expect(getByTestId("courseName")).toHaveTextContent("Course Name");
    expect(getByTestId("instructorLastName")).toHaveTextContent("Last");
    expect(getByTestId("instructorFirstName")).toHaveTextContent("First");
    expect(queryByTestId("noModWarning")).toBeFalsy();
    expect(queryByTestId("noModMessage")).toBeFalsy();
  });

  test("Not Enrolled in HASS", () => {
    const { getByTestId, queryByTestId } = render(
      <CurrentModuleCard
        courseCode=""
        courseName=""
        instructorFirstName=""
        instructorLastName=""
      />
    );
    expect(queryByTestId("courseCode")).toBeFalsy();
    expect(queryByTestId("courseName")).toBeFalsy();
    expect(queryByTestId("instructorLastName")).toBeFalsy();
    expect(queryByTestId("instructorFirstName")).toBeFalsy();
    expect(getByTestId("noModWarning")).toBeTruthy();
    expect(getByTestId("noModMessage")).toHaveTextContent(
      "You are currently not enrolled in a module eligible for trade"
    );
  });
});
