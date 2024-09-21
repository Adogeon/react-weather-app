import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { type SyntheticEvent, useState } from "react";
import "./App.css";
interface rawAPIResult {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: string;
    temp_f: string;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: string;
    feelslike_f: string;
  };
}

interface fetchRequestResult {
  status: number;
  data: rawAPIResult;
}

function App() {
  const [weather, setWeather] = useState<rawAPIResult>({} as rawAPIResult);
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchCall = await fetch(`./weather/london`);
    const result = (await fetchCall.json()) as fetchRequestResult;
    console.log(result.data);
    setWeather(result.data);
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
      {weather.location !== undefined ? (
        <div id="result">
          <section id="location">
            <div>{weather.location.name}</div>
            <div>{weather.location.region}</div>
            <div>{weather.location.country}</div>
          </section>
          <section id="current">
            <div>
              <img
                src={weather.current.condition.icon}
                alt={`${weather.current.condition.text}-icon`}
              />
            </div>
            <div>{weather.current.condition.text}</div>
            <div>{weather.current.temp_c}</div>
            <div>{weather.current.feelslike_c}</div>
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
