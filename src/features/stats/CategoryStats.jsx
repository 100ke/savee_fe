import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  elements,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { categoryTotal } from "./statsApi";

ChartJS.register(ArcElement, Tooltip, Legend, elements);

function CategoryStats({ type, onSelectedFilter }) {
  const chartRef = useRef();
  const [cateData, setCateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await categoryTotal(type);
        setCateData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);

  if (!cateData || cateData.length === 0) {
    return <div className="p-5">데이터 로딩중...</div>;
  }

  // 차트 데이터
  const data = {
    labels: cateData.map((d) => d.category),
    datasets: [
      {
        data: cateData.map((d) => d.total),
        backgroundColor: [
          "#422ef4",
          "#5c92ef",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255,  206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "#5cb0ff",
          "#9fec85",
          "#ea6262",
          "#80bdff",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 옵션 (틀)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const total = cateData.reduce((sum, d) => sum + d.total, 0);

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
    const category = data.labels[index];
    onSelectedFilter?.({ type: "category", value: category });
  };

  return (
    <div className="category-stats rounded-box p-5 mb-3">
      <h3 className="text-2xl mb-2">카테고리별 지출</h3>
      <div className="dnchart w-2/3 mx-auto">
        <Doughnut
          data={data}
          options={options}
          onClick={handleClick}
          ref={chartRef}
        />
      </div>
      <div className="legend-area mt-5 flex flex-col items-center sm:mx-5">
        {cateData.map((item, i) => {
          const percent = ((item.total / total) * 100).toFixed(0) + "%";
          return (
            <div
              className="legend-item w-full flex justify-between my-2 text-lg"
              key={item.category + i}
            >
              <div className="area flex gap-2 items-center">
                <div
                  className="w-5 h-5 legend-color rounded-full"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[i],
                  }}
                />
                <span className="legend-label">{item.category}</span>
                <div className="badge">
                  <span className="legend-percent font-semibold">
                    {percent}
                  </span>
                </div>
              </div>
              <span className="legend-amount">
                {item.total.toLocaleString()}원
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStats;
