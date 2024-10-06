import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import SignIn from './SignIn'; // Import SignIn component
import { fetchWeather, WeatherData } from './api';
import './App.css';

const WeatherDashboard: React.FC = () => {
    const [city, setCity] = useState<string>('London'); // Default city
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getWeather = async () => {
        setLoading(true);
        const data = await fetchWeather(city);
        setWeather(data);
        setLoading(false);
    };

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={getWeather}>Get Weather</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                weather && (
                    <div>
                        <h2>{weather.name}</h2>
                        <p>Temperature: {weather.main.temp} °C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                    </div>
                )
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/" element={<WeatherDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
