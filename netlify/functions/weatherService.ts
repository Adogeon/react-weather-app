import fetch from "node-fetch";

interface errorResponse {
    error: {
        code: string,
        message: string
    }
}

export async function fetchCityForecast(city: string, apiKey?: string) {
    if (!apiKey) {
        throw new Error("Missing API key");
    }

    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`);
    if (!response.ok) {
        const errorData = await response.json() as errorResponse;
        throw { status: response.status, message: errorData.error.message }
    }

    const data = await response.json();
    return data;
}