import type { rawAPIError } from "../../types/api";
import styles from "./ErrorCard.module.css";

const ErrorCard = ({ data }: { data: rawAPIError }) => (
  <section className={styles["error"]}>
    <h1>{data.code}</h1>
    <p>{data.message}</p>
  </section>
);

export default ErrorCard;
