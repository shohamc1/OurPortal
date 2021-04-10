import React from "react";
import { render } from "@testing-library/react";
import EmptyModuleCard from "@components/autoTrade/emptyModuleCard.js";

describe("Autotrade Selected Module Card", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test(" correctly", () => {
    const { getByTestId } = render(<EmptyModuleCard />);
    expect(getByTestId("courseCode")).toHaveTextContent("XX.XXX");
    expect(getByTestId("courseName")).toHaveTextContent("No module selected");
    expect(getByTestId("weightInput")).toBeDisabled();
  });
});
