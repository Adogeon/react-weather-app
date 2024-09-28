import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { type SyntheticEvent, useState } from "react";
import "./App.css";

import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import HourlyForecastCard from "./components/HourlyForecastCard";

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

interface fetchRequestResult {
  status: number;
  data: rawAPISuccess | rawAPIError;
}

const useFetchWeatherData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [weather, setWeather] = useState<rawAPISuccess>({} as rawAPISuccess);
  const [error, setError] = useState<rawAPIError | null>(null);

  const fetchData = async () => {
    setIsFinished(false);
    setIsLoading(true);
    const fetchCall = await fetch(`./weather/london`);
    const fetchResult = (await fetchCall.json()) as fetchRequestResult;
    if ("error" in fetchResult.data) {
      setError(fetchResult.data);
    } else {
      setWeather(fetchResult.data);
    }
    setIsLoading(false);
    setIsFinished(true);
  };

  return { isLoading, isFinished, weather, error, fetchData };
};

function App() {
  const { isLoading, isFinished, weather, error, fetchData } =
    useFetchWeatherData();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
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
        <input type="text" placeholder="city-query" />
      </form>
      {isLoading ? (
        <div>Loading ...</div>
      ) : isFinished ? (
        <div id="result">
          {error ? (
            <section id="error">
              <div>{error.error.message}</div>
            </section>
          ) : (
            <>
              <section id="location">
                <div>{weather.location.name}</div>
                <div>{weather.location.region}</div>
                <div>{weather.location.country}</div>
              </section>
              <CurrentCard data={weather.current} />
              <section id="forecast">
                {weather.forecast.forecastday.map((forecastday) => (
                  <div key={forecastday.date}>
                    <ForecastCard
                      date={forecastday.date}
                      icon={forecastday.day.condition.icon}
                      conditionText={forecastday.day.condition.text}
                      mintemp_c={forecastday.day.mintemp_c}
                      maxtemp_c={forecastday.day.maxtemp_c}
                      avghumidity={forecastday.day.avghumidity}
                      dailyChanceOfRain={forecastday.day.daily_chance_of_rain}
                    />
                    <section id="hourly-forecast">
                      {forecastday.hour.map((forcasthour) => (
                        <HourlyForecastCard
                          key={forcasthour.time}
                          time={forcasthour.time}
                          icon={forcasthour.condition.icon}
                          conditionText={forcasthour.condition.text}
                          temp_c={forcasthour.temp_c}
                          feelslike_c={forcasthour.feelslike_c}
                        />
                      ))}
                    </section>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

export default App;
