import styles from "./ForecastCard.module.css";

interface ForecastCardProps {
  date: string;
  condition: {
    icon: string;
    text: string;
  };
  mintemp_c: string;
  maxtemp_c: string;
  avghumidity: string;
  chance_of_rain: string;
}

const ForecastCard = ({
  date,
  condition,
  mintemp_c,
  maxtemp_c,
  avghumidity,
  chance_of_rain,
}: ForecastCardProps) => {
  return (
    <div className={styles["daily-forcast-card"]}>
      <div>{date}</div>
      <div>
        <img src={condition.icon} alt={`${condition.text}-icon`} />
      </div>
      <div>{condition.text}</div>
      <div>Min Temp: {mintemp_c}°C</div>
      <div>Max Temp: {maxtemp_c}°C</div>
      <div>Avg Humidity: {avghumidity}%</div>
      <div>Chance of Rain: {chance_of_rain}%</div>
    </div>
  );
};

export default ForecastCard;
