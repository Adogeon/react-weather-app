export async function fetchCityForecast(city: string, apiKey: string) {
    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;
}