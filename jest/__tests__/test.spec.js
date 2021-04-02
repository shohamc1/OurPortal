import React from "react";
import { render } from "@testing-library/react";

import Header from "@components/header.js";

describe("Header", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("headerPageName")).toHaveTextContent("Test");
  });
});
