import styles from "./ForecastCard.module.css";

interface ForecastCardProps {
  date: string;
  icon: string;
  conditionText: string;
  mintemp_c: string;
  maxtemp_c: string;
  avghumidity: string;
  dailyChanceOfRain: string;
}

const ForecastCard = (props: ForecastCardProps) => {
  return (
    <section className={styles["forecast-card"]}>
      <div className={styles["forecast-date"]}>{props.date}</div>
      <div className={styles["forecast-content"]}>
        <img
          src={props.icon}
          alt={`${props.conditionText}-icon`}
          className={styles["condition-icon"]}
        />
        <div className={styles["condition-text"]}>{props.conditionText}</div>
        <div className={styles["temperature"]}>
          {props.mintemp_c}°C - {props.maxtemp_c}°C
        </div>
        <div className={styles["humidity"]}>Humidity: {props.avghumidity}%</div>
        <div className={styles["chance-of-rain"]}>
          Chance of Rain: {props.dailyChanceOfRain}%
        </div>
      </div>
    </section>
  );
};

export default ForecastCard;
