import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import HourlyForcastCard from ".";
import { HourlyForecast } from "../../types/weather";

const testData: HourlyForecast = {
  time: "2024-11-15 14:00",
  temp_c: "14.3",
  temp_f: "57.7",
  feelslike_c: "12.7",
  feelslike_f: "54.9",
  condition: {
    text: "test",
    icon: "/64x64/test",
  },
};

test("HourlyForcastCard should render correctly", () => {
  const { asFragment } = render(<HourlyForcastCard data={testData} />);

  expect(asFragment()).toMatchSnapshot();
});
