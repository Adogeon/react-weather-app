import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Load the App body on screen", async () => {
  render(<App />);

  expect(screen.getAllByRole("link")).toHaveLength(2);
});
