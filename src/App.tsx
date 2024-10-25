import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { type SyntheticEvent, useState } from "react";
import "./App.css";

import CurrentCard from "./components/CurrentCard";
import HourlyForcastCard from "./components/HourlyForecastCard";
import ForecastCard from "./components/ForecastCard";
import useInput from "./hooks/useInput";
import useFetchData from "./hooks/useFetchData";

interface weatherCondition {
  text: string;
  icon: string;
}

interface tempAndConditions {
  temp_c: string;
  temp_f: string;
  feelslike_c: string;
  feelslike_f: string;
  condition: weatherCondition;
}

interface rawAPIError {
  error: {
    code: string;
    message: string;
  };
}

interface rawAPISuccess {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: tempAndConditions & {
    last_updated: string;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          maxtemp_c: string;
          maxtemp_f: string;
          mintemp_c: string;
          mintemp_f: string;
          daily_chance_of_rain: string;
          avghumidity: string;
          condition: weatherCondition;
        };
        hour: [
          tempAndConditions & {
            time: string;
          }
        ];
      }
    ];
  };
}

function App() {
  const { status, data, error, fetchData } = useFetchData<
    rawAPISuccess,
    rawAPIError
  >();

  const city = useInput("");

  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(city.value);
    fetchData(`./weather/${city.value.trim()}`);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city-query"
          value={city.value}
          onChange={city.handleChange}
        />
      </form>
      {status === "loading" ? (
        <div>Loading ...</div>
      ) : (
        <div id="result">
          {status === "error" ? (
            <section id="error">
              <div>{error.error.message}</div>
            </section>
          ) : status === "success" ? (
            <>
              <section id="location">
                <div>{data.location.name}</div>
                <div>{data.location.region}</div>
                <div>{data.location.country}</div>
              </section>
              <CurrentCard data={data.current} />
              <section id="forecast">
                {data.forecast.forecastday.map((forecastday, index) => (
                  <div className="accordion" key={forecastday.date}>
                    <div
                      className="accordion-header"
                      onClick={() =>
                        setExpandedDay(expandedDay === index ? null : index)
                      }
                    >
                      <ForecastCard
                        date={forecastday.date}
                        condition={forecastday.day.condition}
                        mintemp_c={forecastday.day.mintemp_c}
                        maxtemp_c={forecastday.day.maxtemp_c}
                        avghumidity={forecastday.day.avghumidity}
                        chance_of_rain={forecastday.day.daily_chance_of_rain}
                      />
                    </div>
                    <div
                      className={`accordion-content ${
                        expandedDay === index ? "show" : ""
                      }`}
                    >
                      <div className="hourly-forecast">
                        {forecastday.hour.map((forecasthour) => (
                          <HourlyForcastCard
                            key={forecasthour.time}
                            time={forecasthour.time}
                            condition={forecasthour.condition}
                            temp_c={forecasthour.temp_c}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default App;
