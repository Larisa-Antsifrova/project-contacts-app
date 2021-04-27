import React from "react";
import Contacts from "../pages/Contacts";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "../server";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
