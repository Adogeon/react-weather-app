//because I have no used for hour
/* eslint-disable @typescript-eslint/no-unused-vars */

import ForecastCard from "../ForecastCard";
import CurrentCard from "../CurrentCard";
import type {
  CurrentWeather,
  DailyForecastWithHour,
} from "../../types/weather";
import styles from "./SummaryArea.module.css";

interface SummaryAreaProps {
  forecast: DailyForecastWithHour;
  current?: CurrentWeather;
}

const SummaryArea = ({ current, forecast }: SummaryAreaProps) => {
  const { hour: _, ...dailySummary } = forecast;
  return (
    <section className={styles["summary"]}>
      {current ? <CurrentCard data={current} /> : null}
      <ForecastCard data={dailySummary} />
    </section>
  );
};

export default SummaryArea;
