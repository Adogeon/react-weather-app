//because I have no used for hour
/* eslint-disable @typescript-eslint/no-unused-vars */

import ForecastCard from "./ForecastCard";
import CurrentCard from "./CurrentCard";
import type { CurrentWeather, DailyForecastWithHour } from "../types/weather";

interface SummaryAreaProps {
  forecast: DailyForecastWithHour;
  current?: CurrentWeather;
}

const SummaryArea = ({ current, forecast }: SummaryAreaProps) => {
  const { hour: _, ...dailySummary } = forecast;
  return (
    <>
      {current ? <CurrentCard data={current} /> : null}
      <ForecastCard data={dailySummary} />
    </>
  );
};

export default SummaryArea;
