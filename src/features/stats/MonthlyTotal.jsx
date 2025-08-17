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
import { monthlyTotal } from "./statsApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function MonthlyTotal({ onSelectedFilter }) {
  const chartRef = useRef();
  const [monthlydata, setMonthlyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await monthlyTotal();
        setMonthlyData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const data = {
    labels: monthlydata.map((d) => `${d.month}월`),
    datasets: [
      {
        label: "지출 총합 (원)",
        data: monthlydata.map((d) => d.total),
        backgroundColor: "#5cb0ff",
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
          stepSize: 50000,
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
    const month = data.labels[index];
    const monthNum = Number(month.replace("월", ""));
    onSelectedFilter?.({ type: "month", month: monthNum });
  };

  return (
    <div className="monthly-trend rounded-box p-5 mb-3">
      <h3 className="text-2xl mb-2">
        <span className="blue font-semibold">월별</span> 지출 총합
      </h3>
      <Bar data={data} options={options} onClick={handleClick} ref={chartRef} />
    </div>
  );
}

export default MonthlyTotal;
