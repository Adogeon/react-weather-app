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
    <div className={styles["daily-forecast-card"]}>
      <div>
        <div>{date}</div>
        <div>
          <img src={condition.icon} alt={`${condition.text}-icon`} />
        </div>
        <div>{condition.text}</div>
      </div>
      <div>
        <div>
          {mintemp_c}°C - {maxtemp_c}°C
        </div>
        <div>Humidity: {avghumidity}%</div>
        <div>Chance of Rain: {chance_of_rain}%</div>
      </div>
    </div>
  );
};

export default ForecastCard;
