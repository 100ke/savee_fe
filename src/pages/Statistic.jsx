import React, { useState } from "react";
import "../features/stats/Stats.css";
import CategoryStats from "../features/stats/CategoryStats";
import MonthlyTotal from "../features/stats/MonthlyTotal";
import WeeklyTotal from "../features/stats/WeeklyTotal";
import DailyTrend from "../features/stats/DailyTrend";
import DetailList from "../features/stats/DetailList";
import {
  fetchMonthlyExpensesList,
  fetchTransactionsByCategory,
  fetchWeeklyExpensesList,
} from "../features/stats/statsApi";

function Statistic() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [active, setActive] = useState("weekly");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [detailData, setDetailData] = useState({});

  const handleSelectFilter = async (filter) => {
    setSelectedFilter(filter);
    if (filter.type === "category") {
      try {
        const data = await fetchTransactionsByCategory(active);
        setDetailData(data[filter.value] || []);
      } catch (error) {
        console.log(error);
        setDetailData(null);
      }
    }
    if (filter.type === "month") {
      try {
        const data = await fetchMonthlyExpensesList(year, month);
        setDetailData(data.expenses || []);
      } catch (error) {
        console.log(error);
        setDetailData(null);
      }
    }
    if (filter.type === "week") {
      try {
        const data = await fetchWeeklyExpensesList(filter.value);
        const weekData = data.weeklyExpenses.find(
          (w) => w.week === filter.value
        );
        setDetailData(weekData?.expenses || []);
      } catch (error) {
        console.log(error);
        setDetailData(null);
      }
    }
  };
  return (
    <div className="statspage w-3/4 h-full overflow-auto scrollbar-hidden min-w-xs">
      <div className="flex flex-col sm:flex-row mb-5 justify-between">
        <h1 className="text-3xl">통계</h1>
        <div className="date-and-btn flex items-center justify-between sm:gap-5">
          <span className="date-title text-2xl">
            {year}년 {month}월
          </span>
          <div className="toggle-wm flex rounded-full border p-1">
            <button
              onClick={() => setActive("weekly")}
              className={`w-16 h-8 rounded-full font-bold flex items-center justify-center
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
              className={`w-16 h-8 rounded-full font-bold flex items-center justify-center
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
        <CategoryStats
          type={active === "weekly" ? "weekly" : "monthly"}
          onSelectedFilter={handleSelectFilter}
          categoryName={selectedFilter?.value}
        />
        <div className="flex flex-col">
          {active === "weekly" ? (
            <WeeklyTotal onSelectedFilter={handleSelectFilter} />
          ) : (
            <MonthlyTotal onSelectedFilter={handleSelectFilter} />
          )}
          <DetailList
            detailData={detailData}
            categoryName={selectedFilter?.value}
          />
        </div>
      </div>
      <DailyTrend />
    </div>
  );
}

export default Statistic;
