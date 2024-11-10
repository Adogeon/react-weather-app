export interface WeatherCondition {
    text: string;
    icon: string;
}

export interface TempAndConditions {
    temp_c: string;
    temp_f: string;
    feelslike_c: string;
    feelslike_f: string;
    condition: WeatherCondition;
}

export interface CurrentWeather extends TempAndConditions {
    last_updated: string
}

interface DailyForecastWeather {
    maxtemp_c: string;
    maxtemp_f: string;
    mintemp_c: string;
    mintemp_f: string;
    daily_chance_of_rain: string;
    avghumidity: string;
    condition: WeatherCondition;
}

export interface DailyForecastData {
    date: string;
    day: DailyForecastWeather
}

interface HourlyForecast extends TempAndConditions {
    time: string;
}

export interface DailyForecastWithHour extends DailyForecastData {
    hour: Array<HourlyForecast>
}