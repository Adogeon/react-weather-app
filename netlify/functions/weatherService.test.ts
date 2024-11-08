import { fetchCityForecast } from "./weatherService"
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as nodeFetch from "node-fetch";
import { Response } from "node-fetch";

vi.mock("node-fetch", async () => {
    const actual: typeof nodeFetch = await vi.importActual("node-fetch");

    return {
        ...actual,
        default: vi.fn()
    }
})

const fetch = vi.mocked(nodeFetch.default);

describe("fetchWeather", () => {
    const API_KEY = 'test-api-key';
    beforeEach(() => {
        fetch.mockClear();
    })

    it("should return weather data on a successful API call", async () => {
        const mockWeatherData = { location: { name: "London" }, forecast: { forecastday: [] } };
        fetch.mockImplementationOnce(async () => new Response(JSON.stringify(mockWeatherData), { status: 200 }))
        const data = await fetchCityForecast("London", API_KEY);
        expect(data).toEqual(mockWeatherData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('http://api.weatherapi.com/v1/forecast.json?key=test-api-key&q=London&days=3&aqi=no&alerts=no'));
    });

    it("should throw an error if the API key is missing", async () => {
        await expect(fetchCityForecast("London", "")).rejects.toThrow("Missing API key");
    });

    it("should throw an error if the API request failes", async () => {
        fetch.mockImplementationOnce(async () => new Response("Bad request", { status: 501 }));

        await expect(fetchCityForecast('London', API_KEY)).rejects.toThrow("Failed to fetch weather data");
    })
})