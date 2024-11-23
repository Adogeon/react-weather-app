import { HourlyForecast } from "../../types/weather";
import { parsingTimeData } from "../../utils/parsingTimeData";
import HourlyForcastCard from "../HourlyForecastCard";

export interface ForecastAreaProps {
  currentTime: string;
  hour: Array<HourlyForecast>;
}

const ForecastArea = ({ data }: { data: ForecastAreaProps }) => {
  const { dayString: currentDay, hourString: currentHour } = parsingTimeData(
    data.currentTime
  );
  let displayHour = data.hour;
  if (data.hour[0].time.match(currentDay)) {
    const currentHourIndex = displayHour.findIndex((hour) => {
      const { hourString } = parsingTimeData(hour.time);
      return hourString.match(currentHour);
    });
    displayHour = displayHour.slice(currentHourIndex + 1);
  }

  return (
    <section id="forecast">
      {displayHour.map((hour) => (
        <HourlyForcastCard data={hour} key={hour.time} />
      ))}
    </section>
  );
};

export default ForecastArea;
