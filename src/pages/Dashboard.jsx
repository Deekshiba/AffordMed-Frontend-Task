import React, { useState } from "react";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = "6445090685f3f4aa21069e2b25401bca";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("City not found. Please enter a valid city.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="dashboard-wrapper">
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-container">
        <h2>Weather Dashboard</h2>

        <div className="input-group">
          <input
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>

        {loading && <p className="loading">Loading weather data...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Feels Like: {weather.main.feels_like} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
