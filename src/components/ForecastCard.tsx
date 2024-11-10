import styles from "./ForecastCard.module.css";
import type { DailyForecastData } from "../types/weather";

const ForecastCard = ({ data }: { data: DailyForecastData }) => {
  return (
    <div className={styles["daily-forecast-card"]}>
      <div>
        <div>{data.date}</div>
        <div>
          <img
            src={data.day.condition.icon}
            alt={`${data.day.condition.text}-icon`}
          />
        </div>
        <div>{data.day.condition.text}</div>
      </div>
      <div>
        <div>
          {data.day.mintemp_c}°C - {data.day.maxtemp_c}°C
        </div>
        <div>Humidity: {data.day.avghumidity}%</div>
        <div>Chance of Rain: {data.day.daily_chance_of_rain}%</div>
      </div>
    </div>
  );
};

export default ForecastCard;
