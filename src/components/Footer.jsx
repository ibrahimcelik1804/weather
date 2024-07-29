import React from "react";

const Footer = ({ weather }) => {
  const formatDate = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", options);
  };

  return (
    <div className="">
      <div className="weather-card flex justify-between gap-3 px-12 ">
        {weather?.forecast?.forecastday.map((day) => (
          <div className="border rounded px-4 py-2 text-white flex justify-center flex-col w-[100px] ">
            <h2 className="text-xl flex justify-center">
              {formatDate(day.date)}
            </h2>
            <img src={day.day.condition.icon} />
            <div className="flex gap-3 justify-center items-center">
              <h1>{day.day.maxtemp_c}</h1>
              <h1 className="text-gray-500">{day.day.mintemp_c}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
