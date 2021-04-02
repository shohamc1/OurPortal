import React from "react";
import { render } from "@testing-library/react";

import Header from "@components/header.js";

describe("Header", () => {
  // suppress console warnings, they are categorized as errors for some reason
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Renders, no params", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("headerPageName")).toHaveTextContent("Test");
  });

  test("Incorrect render, no params", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("headerPageName")).not.toHaveTextContent("Test1");
  });

  test("Correct render with params", () => {
    const { getByTestId } = render(<Header pageName="Hello" />);
    expect(getByTestId("headerPageName")).toHaveTextContent("Hello");
  });
});
