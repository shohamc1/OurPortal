import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModuleTab from "@components/enroll/cart/moduleTab.js";
import { AuthContext } from "@context/authContext";
const mockTradeSearch = {
  autoTradeModules: [],
  cart: [],
  setAutoTradeModules: jest.fn(),
  setCart: jest.fn(),
  activePage: "auto-search",
};
const mockEnrollSearch = {
  autoTradeModules: [],
  cart: [],
  setAutoTradeModules: jest.fn(),
  setCart: jest.fn(),
  activePage: "enroll",
};
// status :
// type
describe("Cart Module Tab", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Renders correctly", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" status="Available" type="HASS" />
      </AuthContext.Provider>
    );
    expect(getByTestId("courseCode")).toHaveTextContent("02.136DH");
    expect(getByTestId("02.136DH")).toBeInTheDocument();
    expect(getByTestId("statusIndicator")).toBeInTheDocument();
  });

  // Buttons delete module based on the activePage
  test("Delete from cart ", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" status="Available" type="HASS" />
      </AuthContext.Provider>
    );
    const deleteButton = getByTestId("moduleTabDelete-02.136DH");
    userEvent.click(deleteButton);
    expect(mockEnrollSearch.setCart).toHaveBeenCalled();
    expect(mockEnrollSearch.setAutoTradeModules).not.toHaveBeenCalled();
  });

  test("Delete from auto trade mods ", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockTradeSearch}>
        <ModuleTab courseCode="02.136DH" status="Available" type="HASS" />
      </AuthContext.Provider>
    );
    const deleteButton = getByTestId("moduleTabDelete-02.136DH");
    userEvent.click(deleteButton);
    expect(mockTradeSearch.setAutoTradeModules).toHaveBeenCalled();
    expect(mockTradeSearch.setCart).not.toHaveBeenCalled();
  });

  // Subject Colour
  test("HASS Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" type="HASS" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-pastel-red");
  });
  test("EPD Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" type="EPD" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-pastel-mint");
  });
  test("ESD Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" type="ESD" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-pastel-blue");
  });
  test("ISTD Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" type="ISTD" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-pastel-turquoise");
  });
  test("ASD Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" type="ASD" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-pastel-yellow");
  });
  test("Default Tab", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" />
      </AuthContext.Provider>
    );
    expect(getByTestId("02.136DH")).toHaveClass("border-gray-500");
  });

  // Status Indicator Colour
  test("Status: Available ", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" status="Available" type="HASS" />
      </AuthContext.Provider>
    );
    expect(getByTestId("statusIndicator").getAttribute("fill")).toEqual(
      "#34EAB9"
    );
  });
  test("Status: Filling Fast ", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" status="Filling Fast" type="HASS" />
      </AuthContext.Provider>
    );
    expect(getByTestId("statusIndicator").getAttribute("fill")).toEqual(
      "#FFD789"
    );
  });
  test("Status: Full ", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockEnrollSearch}>
        <ModuleTab courseCode="02.136DH" status="Full" type="HASS" />
      </AuthContext.Provider>
    );
    expect(getByTestId("statusIndicator").getAttribute("fill")).toEqual(
      "#ED2E7E"
    );
  });
});
