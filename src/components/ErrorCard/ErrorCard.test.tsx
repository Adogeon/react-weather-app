import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import ErrorCard from ".";
import { rawAPIError } from "../../types/api";

const testData: rawAPIError = {
  error: {
    code: "500",
    message: "Failed to fetch weather data",
  },
};

test("ErrorCard should render correctly", () => {
  const { asFragment } = render(<ErrorCard data={testData} />);

  expect(asFragment()).toMatchSnapshot();
});
