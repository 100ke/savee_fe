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

export default function TransactionChart({
  weeklyDatas,
  activeWeekIndex,
  onWeekClick,
}) {
  console.log(weeklyDatas);
  if (!weeklyDatas || weeklyDatas.length === 0)
    return (
      <div className="p-4 col-span-full text-center text-[var(--black70)] px-4 mt-6">
        데이터가 없습니다.
      </div>
    );

  // x축: 주차 정보, y축: 수입/지출
  const labels = weeklyDatas.map((_, index) => `${index + 1}주차`);

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "지출",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
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
            return value.toLocaleString(); // 숫자에 콤마 찍기
          },
        },
      },
    },
    plugins: {
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

  return <Bar data={data} options={options} />;
}
