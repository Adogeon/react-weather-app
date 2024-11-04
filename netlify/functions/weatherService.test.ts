import { fetchCityForecast } from "./weatherService"
import { vi, describe, it, expect } from 'vitest';

describe("fetchWeather", () => {
    const API_KEY = 'test-api-key';

    it("should return weather data on a successful API call", async () => {
        const mockWeatherData = { location: { name: "London" }, forecast: { forecastday: [] } };
        global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => mockWeatherData });

        const data = await fetchCityForecast("London", API_KEY);
        expect(data).toEqual(mockWeatherData);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('http://api.weatherapi.com/v1/forecast.json?key=test-api-key&q=London&days=3&aqi=no&alerts=no'));
    });

    it("should throw an error if the API key is missing", async () => {
        await expect(fetchCityForecast("London", "")).rejects.toThrow("Missing API key");
    });

    it("should throw an error if the API request failes", async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: false });

        await expect(fetchCityForecast('London', API_KEY)).rejects.toThrow("Failed to fetch weather data");
    })
})