import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { weeklyTotal } from "./statsApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function WeeklyTotal({ onSelectedFilter }) {
  const chartRef = useRef();
  const [weeklyData, setWeeklyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await weeklyTotal();
        setWeeklyData(result);
      } catch (error) {
        if (error.response?.status === 404) {
          setWeeklyData([]);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);
  const data = {
    labels: weeklyData.map((d, index) => `${d.week} (${index + 1}주)`),
    datasets: [
      {
        label: "지출 총합 (원)",
        data: weeklyData.map((d) => d.total),
        backgroundColor: "#5c92ef",
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
        ticks: {
          stepSize: 10000,
          callback: (value) => `${value / 10000}만`,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleClick = (event) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const elements = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );
    if (!elements.length) return;
    const index = elements[0].index;
    const weekNumber = weeklyData[index]?.week;
    onSelectedFilter?.({ type: "week", value: weekNumber });
  };

  return (
    <div className="weekly-trend rounded-box p-5 mb-3">
      <h3 className="text-2xl mb-2">
        <span className="blue font-semibold">주별</span> 지출 총합
      </h3>
      <Bar data={data} options={options} onClick={handleClick} ref={chartRef} />
    </div>
  );
}

export default WeeklyTotal;
