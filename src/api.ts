// src/api.ts
import axios from 'axios';

const API_KEY = 'c538ece0eb5ee9728e689fec9b50fd18';

export interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
};
