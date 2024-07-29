import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import axios from "axios";
import Footer from "./components/Footer";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const key = import.meta.env.VITE_REACT_WEATHER_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=8&aqi=yes&alerts=yes`
        );
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location, key]);

  const handleCityChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className=" h-screen flex justify-center items-center  gap-4 flex-col bg-[#0F172A]">
      <div className="flex justify-center gap-40 w-full px-16">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            htmlFor="username"
            className="block text-sm leading-6 text-gray-500"
          >
            Şehir:
          </label>
          <input
            value={location}
            onChange={handleCityChange}
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            className="block flex-1 border rounded-2xl font-[600] text-transform: uppercase border-gray-500 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Şehir Giriniz..."
          />
        </form>
        <h1 className="font-bold text-white text-3xl">Hava Durumu</h1>
      </div>
      <Header weather={weather} />
      <Main weather={weather} />
      <Footer weather={weather} />
    </div>
  );
};

export default App;
