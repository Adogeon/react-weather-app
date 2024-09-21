import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { Config, Context } from '@netlify/functions'

dotenv.config();
export default async function (reg: Request, context: Context) {
    const { city } = context.params;
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Missing API key' }),
        };
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        const data = await response.json();

        console.log(data)

        return Response.json({
            statusCode: 200,
            data,
        });
    } catch (error) {
        return Response.json({
            statusCode: 500,
            body: JSON.stringify({ msg: 'Failed to fetch weather data', error }),
        });
    }
}

export const config: Config = {
    path: "/weather/:city"
}