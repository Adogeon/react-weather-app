import dotenv from 'dotenv';
import { Config, Context } from '@netlify/functions'
import { fetchCityForecast } from './weatherService';

dotenv.config();

const cache: { [key: string]: { data: unknown, expiry: number } } = {};

const CACHE_DURATION = 5 * 60 * 1000;

export default async function (reg: Request, context: Context) {
    const { city } = context.params;

    if (cache[city] && cache[city].expiry > Date.now()) {
        return Response.json({
            statusCode: 200,
            data: cache[city].data,
        })
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const data = await fetchCityForecast(city, API_KEY);

        cache[city] = {
            data,
            expiry: Date.now() + CACHE_DURATION
        }

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