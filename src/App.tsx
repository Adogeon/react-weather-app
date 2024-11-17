import { type SyntheticEvent, useState } from "react";
import "./App.css";

import HourlyForecastCard from "./components/HourlyForecastCard";
import useInput from "./hooks/useInput";
import useFetchData from "./hooks/useFetchData";
import type { rawAPIError, rawAPISuccess } from "./types/api";
import SummaryArea from "./components/SummaryArea";
import ErrorCard from "./components/ErrorCard";

enum ForecastTab {
  Today = 0,
  Tomorrow = 1,
  DayAfter = 2,
}

function App() {
  const { status, data, error, fetchData } = useFetchData<
    rawAPISuccess,
    rawAPIError
  >();
  const city = useInput("");
  const [activeTab, setActiveTab] = useState<ForecastTab>(ForecastTab.Today);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(`./weather/${city.value.trim()}`);
  };

  const activeDayForecastIndex = activeTab;

  return (
    <>
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
            <ErrorCard data={error} />
          ) : status === "success" ? (
            <>
              <h2>{`${data.location.name}, ${data.location.region}, ${data.location.country}`}</h2>
              <SummaryArea
                forecast={data.forecast.forecastday[activeDayForecastIndex]}
                current={
                  activeTab === ForecastTab.Today ? data.current : undefined
                }
              />

              <div className="tabs">
                <button onClick={() => setActiveTab(ForecastTab.Today)}>
                  Today
                </button>
                <button onClick={() => setActiveTab(ForecastTab.Tomorrow)}>
                  Tomorrow
                </button>
                <button onClick={() => setActiveTab(ForecastTab.DayAfter)}>
                  Day After
                </button>
              </div>

              <section className="hourly-forecast">
                {data.forecast.forecastday[activeDayForecastIndex]?.hour.map(
                  (forecasthour) => (
                    <HourlyForecastCard
                      key={forecasthour.time}
                      data={forecasthour}
                    />
                  )
                )}
              </section>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default App;
