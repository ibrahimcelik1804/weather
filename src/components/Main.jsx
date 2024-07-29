import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Main = ({ weather }) => {
  // Şu anki tarih ve saati alma
  const now = new Date();
  // Labels dizisini oluşturma
  const labels = [];
  for (let i = 0; i < 8; i++) {
    const hour = (now.getHours() + i * 3) % 24; // Her 3 saatte bir
    labels.push(`${hour}:00`);
  }
  // API'den alınan hava durumu verilerini kullanarak data kısmını oluşturma
  const data = {
    labels: labels,
    datasets: [
      {
        id: 1,
        label: "Sıcaklık (°C)",
        data: weather?.forecast?.forecastday[0].hour
          .slice(0, 8)
          .map((hour) => hour.temp_c), // İlk günün 8 saatlik sıcaklık verisi
        borderColor: "red", // Çizgi rengi (isteğe bağlı)
        backgroundColor: "yellow", // Arka plan rengi (isteğe bağlı)
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sıcaklık (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Saat",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "start",
        color: "black",
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className="flex justify-center h-[280px] w-3/5 ">
      <Line
        data={data}
        options={options}
        style={{ height: "250px", width: "100%" }}
      />
    </div>
  );
};

export default Main;
