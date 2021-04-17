import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectedModuleCard from "@components/autoTrade/selectedModuleCard.js";
import { AuthContext } from "@context/authContext";
const mockValue = {
  autoTradeModules: [
    {
      selectionIndex: "0",
      courseCode: "02.136DH",
      courseName: "Lyric Poetry",
      weightage: "0",
    },
  ],
  setAutoTradeModules: jest.fn(),
};

describe("Autotrade Selected Module Card", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Renders correctly", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockValue}>
        <SelectedModuleCard
          selectionIndex="0"
          courseCode="02.136DH"
          courseName="Lyric Poetry"
          weightage="10"
        />
      </AuthContext.Provider>
    );
    expect(getByTestId("selectionIndex")).toHaveTextContent("0");
    expect(getByTestId("courseCode")).toHaveTextContent("02.136DH");
    expect(getByTestId("courseName")).toHaveTextContent("Lyric Poetry");
    expect(getByTestId("weightInput")).toHaveValue(10);
  });

  test("Input Weightage", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockValue}>
        <SelectedModuleCard
          selectionIndex="0"
          courseCode="02.136DH"
          courseName="Lyric Poetry"
          weightage="0"
        />
      </AuthContext.Provider>
    );
    const weightInput = getByTestId("weightInput");
    expect(weightInput).toHaveValue(0);

    userEvent.type(weightInput, "100");

    expect(mockValue.setAutoTradeModules).toHaveBeenCalled();
  });

  test("Delete Selected Module", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockValue}>
        <SelectedModuleCard
          selectionIndex="0"
          courseCode="02.136DH"
          courseName="Lyric Poetry"
          weightage="0"
        />
      </AuthContext.Provider>
    );
    const deleteButton = getByTestId("deleteSelected");
    userEvent.click(deleteButton);

    expect(mockValue.setAutoTradeModules).toHaveBeenCalled();
  });
});
