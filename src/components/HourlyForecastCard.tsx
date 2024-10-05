import styles from "./ForecastCard.module.css";
interface HourlyForcastCardProps {
  time: string;
  condition: {
    icon: string;
    text: string;
  };
  temp_c: string;
}

const HourlyForcastCard = ({
  time,
  condition,
  temp_c,
}: HourlyForcastCardProps) => {
  return (
    <div className={styles["hourly-forcast-card"]}>
      <div>{time}</div>
      <div>
        <img src={condition.icon} alt={`${condition.text}-icon`} />
      </div>
      <div>{temp_c}°C</div>
    </div>
  );
};

export default HourlyForcastCard;
