import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import "dotenv";

function App() {
  const [print, setPrint] = useState<string>("");

  const handleSubmit = async () => {
    const fetchCall = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=London`
    );
    const result = await fetchCall.json();
    setPrint(result);
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
      <div id="result">{print}</div>
    </>
  );
}

export default App;
