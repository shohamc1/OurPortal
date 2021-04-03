import React from "react";
import { getByLabelText, render } from "@testing-library/react";

import Card from "@components/card.js";

describe("Header", () => {
  // suppress console warnings, they are categorized as errors for some reason
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Data set correctly", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="HASS"
      />
    );

    expect(getByTestId("02.213")).toHaveTextContent("02.213");
    expect(getByTestId("courseName")).toHaveTextContent("Course Name");
    expect(getByTestId("instructorLastName")).toHaveTextContent("Last");
    expect(getByTestId("instructorFirstName")).toHaveTextContent("First");
  });

  test("HASS Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="HASS"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-pastel-red");
  });

  test("EPD Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="EPD"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-pastel-mint");
  });

  test("ESD Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="ESD"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-pastel-blue");
  });

  test("ISTD Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="ISTD"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-pastel-turquoise");
  });

  test("ASD Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
        type="ASD"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-pastel-yellow");
  });

  test("Default Card", () => {
    const { getByTestId } = render(
      <Card
        courseCode="02.213"
        courseName="Course Name"
        instructorFirstName="First"
        instructorLastName="Last"
      />
    );
    expect(getByTestId("02.213")).toHaveClass("bg-gray-500");
  });
});
