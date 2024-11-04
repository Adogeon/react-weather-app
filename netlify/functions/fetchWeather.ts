import dotenv from 'dotenv';
import { Config, Context } from '@netlify/functions'
import { fetchCityForecast } from './weatherService';

dotenv.config();

export default async function (reg: Request, context: Context) {
    const { city } = context.params;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const data = await fetchCityForecast(city, API_KEY);

        return Response.json({
            statusCode: 200,
            data,
        });
    } catch (error) {
        return Response.json({
            statusCode: 500,
            body: JSON.stringify({ msg: error.message }),
        });
    }
}

export const config: Config = {
    path: "/weather/:city"
}