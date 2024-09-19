import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("Load the App body on screen", async () => {
  render(<App />);

  expect(screen.getByRole("link")).toBeInTheDocument();
});
