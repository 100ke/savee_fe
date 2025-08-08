import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// activeWeekIndex는 강조할 주차 (0부터 시작), onWeekClick은 클릭시 처리 함수
export default function TransactionChart({ weeklyDatas }) {
  if (!weeklyDatas || weeklyDatas.length === 0)
    return (
      <div className="p-4 col-span-full text-center text-[var(--black70)] px-4 mt-6">
        데이터가 없습니다.
      </div>
    );

  // x축: 주차 정보, y축: 수입/지출
  const labels = weeklyDatas.map((_, index) => `${index + 1}주차`);

  // 현재 날짜 기준 주차 찾기
  const currentWeekIndex = getCurrentWeekIndex(weeklyDatas);

  // 현재 날짜가 포함된 주차 찾기
  function getCurrentWeekIndex(weeks) {
    const today = new Date();

    return weeks.findIndex((week) => {
      // week은 "2025-08-08 ~ 2025-08-14" 형태
      const [start, end] = week.week.split(" ~ ");
      const startDate = new Date(start);
      const endDate = new Date(end);

      return today >= startDate && today <= endDate;
    });
  }

  // incomeData 색상 배열
  const incomeColors = weeklyDatas.map((_, index) => {
    return currentWeekIndex === index
      ? "rgba(92, 176, 255, 0.9)"
      : "rgba(176, 176, 176, 0.7)";
  });

  // expenseData 색상 배열
  const expenseColors = weeklyDatas.map((_, index) => {
    return currentWeekIndex === index
      ? "rgba(234, 98, 98, 0.9)"
      : "rgba(51, 51, 51, 0.7)";
  });

  // 긱 주차의 수입, 지출을 플로팅바 형식으로 변환
  const incomeData = weeklyDatas.map((week, index) => ({
    x: `${index + 1}주차`,
    y: [0, week.income], // 양수 방향
  }));

  const expenseData = weeklyDatas.map((week, index) => ({
    x: `${index + 1}주차`,
    y: [0, week.expense],
  }));

  const data = {
    labels,
    datasets: [
      {
        label: "수입",
        data: incomeData,
        backgroundColor: incomeColors,
        hoverBackgroundColor: "rgba(92, 176, 255, 0.9)",
        borderColor: "rgba(92, 176, 255, 0.9)",
      },
      {
        label: "지출",
        data: expenseData,
        backgroundColor: expenseColors,
        hoverBackgroundColor: "rgba(234, 98, 98, 0.9)",
        borderColor: "rgba(234, 98, 98, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    parsing: {
      // 플로팅바 설정
      yAxisKey: "y",
    },
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          callback: function (value) {
            return (value / 10000).toLocaleString() + " 만원"; // 숫자에 콤마 찍기
          },
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 14 },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black",
          useBorderColor: true,
          // 범례 아이콘 색상 고정
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle:
                dataset.label === "수입"
                  ? "rgba(92, 176, 255, 0.9)"
                  : "rgba(234, 98, 98, 0.9)",
              strokeStyle:
                dataset.label === "수입"
                  ? "rgba(92, 176, 255, 0.9)"
                  : "rgba(234, 98, 98, 0.9)",
              index: i,
              hidden: !chart.isDatasetVisible(i),
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw.y[1];
            return `${context.dataset.label}: ${Math.abs(
              value
            ).toLocaleString()}원`;
          },
        },
      },
    },
  };

  return (
    <div className="chart w-full max-w-4xl mx-auto flex justify-center">
      <Bar data={data} options={options} className="mt-5" />
    </div>
  );
}
