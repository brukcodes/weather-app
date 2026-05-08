import { useState, useEffect, useRef } from "react";
import "./Weather.css";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import sun from "../assets/sun.png";
import hum from "../assets/humidity1.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  // from openweathermap
  const allIcons = {
    "01d": "https://openweathermap.org/img/w/01d.png",
    "01n": "https://openweathermap.org/img/w/01n.png",
    "02d": "https://openweathermap.org/img/w/02d.png",
    "02n": "https://openweathermap.org/img/w/02n.png",
    "03d": "https://openweathermap.org/img/w/03d.png",
    "03n": "https://openweathermap.org/img/w/03n.png",
    "04d": "https://openweathermap.org/img/w/04d.png",
    "04n": "https://openweathermap.org/img/w/04n.png",
    "09d": "https://openweathermap.org/img/w/09d.png",
    "09n": "https://openweathermap.org/img/w/09n.png",
    "10d": "https://openweathermap.org/img/w/10d.png",
    "10n": "https://openweathermap.org/img/w/10n.png",
    "11d": "https://openweathermap.org/img/w/11d.png",
    "11n": "https://openweathermap.org/img/w/11n.png",
    "13d": "https://openweathermap.org/img/w/13d.png",
    "13n": "https://openweathermap.org/img/w/13n.png",
    "50d": "https://openweathermap.org/img/w/50d.png",
    "50n": "https://openweathermap.org/img/w/50n.png",
  };
  //
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
      setWeatherData(false);
    }
  };
  //
  useEffect(() => {
    search("london");
  }, []);
  return (
    <div className="weather">
      <h1>Weather</h1>
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="search for weather "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(inputRef.current.value);
            }
          }}
        />
        <img
          src="https://icons.iconarchive.com/icons/alecive/flatwoken/128/Apps-Search-And-Replace-icon.png"
          width="50"
          height="50"
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature"> {weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="humidity">
              <img src={humidity} alt="humidity" className="humidity icon" />
              <span>
                <span className="value">{weatherData.humidity} %</span>
                <span className="label">humidity</span>
              </span>
            </div>
            <div className="wind-speed">
              <img src={wind} alt="wind" className="wind-speed icon" />
              <span className="value">{weatherData.windSpeed} km/hr</span>
              <span className="label">wind speed</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>No weather data available</p>
        </>
      )}
    </div>
  );
};

export default Weather;
