import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import ForecastCard from ".";
import { DailyForecastData } from "../../types/weather";

const testData: DailyForecastData = {
  date: "2024-11-15",
  day: {
    mintemp_c: "12.8",
    mintemp_f: "55",
    maxtemp_c: "14.5",
    maxtemp_f: "58.1",
    avghumidity: "80",
    daily_chance_of_rain: "0",
    condition: {
      text: "test",
      icon: "/64x64/test",
    },
  },
};

test("Forecast Card should render correctly", () => {
  const { asFragment } = render(<ForecastCard data={testData} />);

  expect(asFragment()).toMatchSnapshot();
});
