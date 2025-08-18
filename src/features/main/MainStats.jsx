import { useNavigate } from "react-router-dom";
// import Statistic from "../../pages/Statistic";
import { categoryTotal } from "../stats/MonthlyTotal";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import Statistic from "../../pages/Statistic";
import MainChart from "./MainStatsChart";

export default function MainStats() {
  const navigate = useNavigate();
  //   const monthlyData = categoryTotal();
  const [active, setActive] = useState("weekly");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return (
    <div className="card border w-2/4 p-3 main-chart-box">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="">
          <a
            className="cursor-pointer font-bold text-lg"
            onClick={() => navigate("/statistics")}
          >
            카테고리별 지출 &gt;
          </a>
        </div>
        <div className="flex items-center justify-between sm:gap-5">
          <span className="date-title">
            {year}년 {month}월
          </span>
          <div className="toggle-wm flex rounded-full border p-1">
            <button
              onClick={() => setActive("weekly")}
              className={`w-8 h-4 rounded-full font-bold flex items-center justify-center text-sm
               ${
                 active === "weekly"
                   ? "bg-primary text-white"
                   : "bg-white text-black"
               }
              `}
            >
              주간
            </button>
            <button
              onClick={() => setActive("monthly")}
              className={`w-8 h-4 rounded-full font-bold flex items-center justify-center text-sm
               ${
                 active === "monthly"
                   ? "bg-primary text-white"
                   : "bg-white text-black"
               }
              `}
            >
              월간
            </button>
          </div>
        </div>
      </div>
      <MainChart
        type={active === "weekly" ? "weekly" : "monthly"}
        onSelectedFilter={Statistic.handleSelectFilter}
        categoryName={selectedFilter?.value}
      />
    </div>
  );
}
