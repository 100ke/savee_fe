import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { last7DaysTrend } from "./statsApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DailyTrend() {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await last7DaysTrend();
        setDailyData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: dailyData.map((d) => {
      const dateObj = new Date(d.date);
      const month = dateObj.getMonth() + 1; // 0부터 시작하니 +1
      const day = dateObj.getDate();
      return `${month}월 ${day}일`;
    }),
    datasets: [
      {
        label: "지출 총합 (원)",
        data: dailyData.map((d) => d.total),
        backgroundColor: "#422ef4",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        // ticks: {
        //   stepSize: 100000,
        //   callback: (value) => `${value / 10000}만`,
        // },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="daily-trend rounded-box border p-5 mb-3">
      <h3 className="text-2xl mb-2">일일 지출 추이</h3>
      <p className="mb-2 sub-title">최근 7일간의 지출액 추이를 표시합니다.</p>
      <Line data={data} options={options} />
    </div>
  );
}

export default DailyTrend;
