import React, { useState } from 'react';
import { fetchWeather, WeatherData } from './api';
import './App.css';

const App: React.FC = () => {
    const [city, setCity] = useState<string>('London'); // Default city
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const getWeather = async () => {
        const data = await fetchWeather(city);
        setWeather(data);
    };

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Winnipeg"
            />
            <button onClick={getWeather}>Get Weather</button>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default App;
