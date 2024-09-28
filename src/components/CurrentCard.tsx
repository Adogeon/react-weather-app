import styles from "./CurrentCard.module.css";

interface CurrentCardProps {
  data: {
    condition: {
      icon: string;
      text: string;
    };
    temp_c: string;
    temp_f: string;
    feelslike_c: string;
    feelslike_f: string;
  };
}

const CurrentCard = (props: CurrentCardProps) => {
  return (
    <section id="current" className={styles.current}>
      <div className={styles["icon-container"]}>
        <img
          src={props.data.condition.icon}
          alt={`${props.data.condition.text}-icon`}
        />
      </div>
      <div className={styles["weather-info"]}>
        <div>{props.data.condition.text}</div>
        <div className={styles.temperature}>{props.data.temp_c}°C</div>
        <div className={styles["feels-like"]}>
          Feels like {props.data.feelslike_c}°C
        </div>
      </div>
    </section>
  );
};

export default CurrentCard;
