import styles from "./HourlyForecastCard.module.css";

interface HourlyForecastCardProps {
  time: string;
  icon: string;
  conditionText: string;
  temp_c: string;
  feelslike_c: string;
}

const HourlyForecastCard = (props: HourlyForecastCardProps) => {
  return (
    <div className={styles["hourly-forecast-card"]}>
      <div className={styles["hour"]}>{props.time}</div>
      <img
        src={props.icon}
        alt={`${props.conditionText}-icon`}
        className={styles["condition-icon"]}
      />
      <div className={styles["condition-text"]}>{props.conditionText}</div>
      <div className={styles["temperature"]}>{props.temp_c}°C</div>
      <div className={styles["feels-like"]}>
        Feels Like: {props.feelslike_c}°C
      </div>
    </div>
  );
};

export default HourlyForecastCard;
