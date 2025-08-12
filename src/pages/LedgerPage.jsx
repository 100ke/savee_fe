import { Outlet, useLocation } from "react-router-dom";
import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import { useState } from "react";
import DailyLedger from "../features/ledgers/daily/DailyLedger";
import WeeklyLedger from "../features/ledgers/weekly/WeeklyLedger";
import MonthlyLedger from "../features/ledgers/monthly/MonthlyLedger";
import LedgerAddButton from "../features/ledgers/LedgerAddButton";

export default function LedgerPage() {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [transactions, setTransactions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weeklyDatas, setWeeklyDatas] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState(null);

  const [monthlyDatas, setMonthlyDatas] = useState(null);

  const [ledgers, setLedgers] = useState([]);

  return (
    <div className="max-w-full px-full scrollbar-hidden">
      <LedgerHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        summary={summary}
      />
      <LedgerTab />

      <Outlet
        context={{
          isShared: false,
          selectedDate,
          setSelectedDate,
          summary,
          setSummary,
          transactions,
          setTransactions,
          error,
          setError,
          weeklyDatas,
          setWeeklyDatas,
          selectedWeeks,
          setSelectedWeeks,
          monthlyDatas,
          setMonthlyDatas,
        }}
      />
      <div className="fixed bottom-10 right-10 z-50">
        <LedgerAddButton
          ledgers={ledgers}
          setLedgers={setLedgers}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
}
