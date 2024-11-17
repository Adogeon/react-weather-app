import type { CurrentWeather, DailyForecastWithHour } from "./weather";

export interface rawAPIError {
    code: string;
    message: string;
}

export interface rawAPISuccess {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: CurrentWeather
    forecast: {
        forecastday: Array<DailyForecastWithHour>
    }
};
