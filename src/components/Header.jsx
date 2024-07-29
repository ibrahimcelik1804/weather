import axios from "axios";
import React, { useEffect, useState } from "react";

const Header = ({ weather }) => {
  const [temp, setTemp] = useState(null);
  const [unit, setUnit] = useState("°C");
  const [climate, setClimate] = useState(null);
  const [translate, setTranslate] = useState("");
  useEffect(
    (weather) => {
      if (weather) {
        setTemp(Math.round(weather.current.temp_c));
      }
    },
    [weather]
  );
  useEffect(() => {
    if (weather) {
      setTemp(
        unit === "°C"
          ? Math.round(weather.current.temp_c)
          : Math.round(weather.current.temp_f)
      );
    }
  }, [unit, weather]);

  const handleClick = (newUnit) => {
    if (newUnit === "°C") {
      setTemp(Math.round(weather.current.temp_c));
      setUnit("°C");
    } else {
      setTemp(Math.round(weather.current.temp_f));
      setUnit("°F");
    }
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("tr-TR", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    if (!climate && weather) {
      axios
        .get("http://localhost:3000/items")
        .then((res) => {
          const weatherData = res.data;

          setClimate(weatherData);
          const condition = weatherData.find(
            (item) => item.code === weather?.current?.condition?.code
          );
          const turkishText = condition?.languages.find(
            (lang) => lang.lang_iso === "tr"
          );
          setTranslate(turkishText ? turkishText.day_text : condition?.text);
        })
        .catch((err) => console.log(err));
    }
  }, [weather, climate]);
  if (!weather) return null;

  return (
    <div className="header flex items-center text-white justify-between px-10">
      <div className="left flex  gap-20 items-center">
        
        <div className=" flex gap-2">
          <img src={weather?.current?.condition?.icon} alt="" />
          <h1 className="text-gray-700 flex gap-1">
            <span className="text-5xl text-white active">{temp}</span>
            <span
              className={`cursor-pointer ${
                unit === "°C" ? "active text-white" : ""
              }`}
              onClick={() => handleClick("°C")}
            >
              °C
            </span> |
            <span
              className={`cursor-pointer ${
                unit === "°F" ? "active text-white" : ""
              }`}
              onClick={() => handleClick("°F")}
            >
              °F
            </span>
            
          </h1>
        </div>
        <div className="text-xs text-gray-500">
          <p>
            Yağış : <span>{weather?.current?.precip_mm}</span>%
          </p>
          <p>
            Nem : <span>{weather?.current?.humidity}</span>%
          </p>
          <p>
            Rüzgar : <span>{weather?.current?.wind_kph}</span>km/s
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end text-xs text-gray-400">
        <p>{formattedDate} </p>
        <p>{formattedTime}</p>
        <p>{translate}</p>
      </div>
    </div>
  );
};

export default Header;
