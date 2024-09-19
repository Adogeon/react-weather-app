import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("The App should show the form for input a city name", async () => {
  render(<App />);

  expect(screen.getByPlaceholderText("city-query")).toBeInTheDocument();
});
