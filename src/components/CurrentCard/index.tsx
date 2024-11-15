import styles from "./CurrentCard.module.css";
import type { CurrentWeather } from "../../types/weather";

const CurrentCard = ({ data }: { data: CurrentWeather }) => {
  const bigIconSrc = data.condition.icon.replace(/\/64x64\//, "/128x128/");
  return (
    <section id="current" className={styles.current}>
      <div className={styles["icon-container"]}>
        <img src={bigIconSrc} alt={`${data.condition.text}-icon`} />
      </div>
      <div className={styles["weather-info"]}>
        <div>{data.condition.text}</div>
        <div className={styles.temperature}>{data.temp_c}°C</div>
        <div className={styles["feels-like"]}>
          Feels like {data.feelslike_c}°C
        </div>
      </div>
    </section>
  );
};

export default CurrentCard;
