import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import ForecastArea, { type ForecastAreaProps } from ".";

const TestData: ForecastAreaProps = {
  currentTime: "test-date 14:32",
  hour: [
    {
      time: "test-date 13:00",
      temp_c: "17",
      temp_f: "62.6",
      feelslike_c: "17",
      feelslike_f: "62.6",
      condition: {
        text: "test-condition",
        icon: "/64x64/test-iocn",
      },
    },
    {
      time: "test-date 14:00",
      temp_c: "17",
      temp_f: "62.6",
      feelslike_c: "17",
      feelslike_f: "62.6",
      condition: {
        text: "test-condition",
        icon: "/64x64/test-iocn",
      },
    },
    {
      time: "test-date 15:00",
      temp_c: "17",
      temp_f: "62.6",
      feelslike_c: "17",
      feelslike_f: "62.6",
      condition: {
        text: "test-condition",
        icon: "/64x64/test-iocn",
      },
    },
  ],
};

test("ForecastArea should render correctly", () => {
  const { asFragment } = render(<ForecastArea data={TestData} />);

  expect(asFragment()).toMatchSnapshot();
});
