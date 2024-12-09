import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear_weather from "../assets/clear.png";
import wind_weather from "../assets/wind.png";
import humidity_weather from "../assets/humidity.png";

const Maincontainer = () => {
  const inputref = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    "50d": "https://openweathermap.org/img/wn/50d@2x.png",

    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    "13n": "https://openweathermap.org/img/wn/13n@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
        feels_like: Math.floor(data.main.feels_like),
      });
    } catch (error) {}
  };
  useEffect(() => {
    search("mumbai");
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-900 text-white p-8 m-auto rounded w-96">
          <div className="flex justify-between">
            <input
              ref={inputref}
              className="pr-10 px-2 text-black rounded font-semibold"
              type="text"
              id="search_input"
              placeholder="search"
            />
            <img
              src={search_icon}
              className="p-2 bg-white rounded hover:bg-slate-200"
              onClick={() => search(inputref.current.value)}
            />
          </div>
          <div className="flex justify-center flex-col items-center">
            <img src={weatherData.icon} />
              <h1 className="font-bold text-4xl mx-2">{weatherData.temp}°</h1>
            <h2 className="font-semibold text-2xl my-1 text-gray-300">
              {weatherData.location}
            </h2>
              <h2 className="font-medium text-2xl my-2 text-gray-400">
                {weatherData.description}
              </h2>

            <h5 className="my-1 text-gray-300 font-semibold">
              Feels Like {weatherData.feels_like}°
            </h5>
          </div>
          <div className="flex items-center justify-center">
            <h4 className="text-gray-400 mx-2">Wind Speed :</h4>
            <h4 className="font-semibold">{weatherData.windSpeed} Km/h</h4>
          </div>
          <div className="flex items-center justify-center">
            <h4 className="text-gray-400 mx-2">Humidity : </h4>
            <h4>  {weatherData.humidity}%</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maincontainer;
