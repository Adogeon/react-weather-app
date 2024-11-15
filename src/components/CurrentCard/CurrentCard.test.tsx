import { render } from "@testing-library/react";
import { test, expect } from "vitest";

import CurrentCard from ".";
import { CurrentWeather } from "../../types/weather";

const testData: CurrentWeather = {
  condition: {
    text: "test text",
    icon: "/64x64/test",
  },
  temp_c: "20",
  temp_f: "70",
  feelslike_c: "10",
  feelslike_f: "50",
  last_updated: "12329812",
};

test("The CurrentCard should render correctly", () => {
  const { asFragment } = render(<CurrentCard data={testData} />);

  expect(asFragment()).toMatchSnapshot();
});
