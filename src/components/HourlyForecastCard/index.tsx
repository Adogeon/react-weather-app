import styles from "./HourlyForecastCard.module.css";
import toHourDisplayText from "../../utils/toHourDisplayText";

import type { HourlyForecast } from "../../types/weather";

const HourlyForcastCard = ({ data }: { data: HourlyForecast }) => {
  return (
    <div className={styles["hourly-card"]}>
      <div>{toHourDisplayText(data.time.split(" ")[1])}</div>
      <div>
        <img src={data.condition.icon} alt={`${data.condition.text}-icon`} />
      </div>
      <div>{data.temp_c}°C</div>
    </div>
  );
};

export default HourlyForcastCard;
