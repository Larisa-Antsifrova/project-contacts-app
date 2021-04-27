// React imports
import React from "react";
// Component imports
import Contacts from "../pages/Contacts";
// Test lib imports
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Helpers imports
import { server } from "../server";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Testing getting data
describe("contacts get data", () => {
  test("loading", async () => {
    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(loader);
  });

  test("success", async () => {
    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();

    const tableContainer = screen.getByTestId("contacts-table-container");
    expect(tableContainer).toBeInTheDocument();
  });

  test("fail", async () => {
    server.use(
      rest.get("https://randomuser.me/api/?results=10", (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "I am a teapot",
          })
        );
      })
    );

    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();

    const error = screen.getByTestId("contacts-error");

    expect(error).toBeInTheDocument();
  });
});

// Testing grid vs table view mode toggle
describe("contacts data view mode", () => {
  test("should equal table", async () => {
    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-grid-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test("switch from grid to table", async () => {
    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    const toggleGrid = screen.getByTestId("toggle-data-view-mode-grid");
    const toggleTable = screen.getByTestId("toggle-data-view-mode-table");
    userEvent.click(toggleGrid);
    userEvent.click(toggleTable);

    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-grid-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test("should equal grid", async () => {
    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    const toggleGrid = screen.getByTestId("toggle-data-view-mode-grid");
    userEvent.click(toggleGrid);

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );

    expect(window.localStorage.getItem("dataViewMode")).toEqual("grid");
  });

  test("should equal grid with reload page", async () => {
    window.localStorage.setItem("dataViewMode", "grid");

    render(<Contacts />);

    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );

    window.localStorage.clear();
  });
});
