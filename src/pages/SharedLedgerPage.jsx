import { Outlet, useLocation, useParams } from "react-router-dom";
import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import { useState } from "react";
import DailyLedger from "../features/ledgers/daily/DailyLedger";
import WeeklyLedger from "../features/ledgers/weekly/WeeklyLedger";
import MonthlyLedger from "../features/ledgers/monthly/MonthlyLedger";
import LedgerAddButton from "../features/ledgers/LedgerAddButton";
import SharedLedger from "../features/ledgers/shared/SharedLedger";

export default function SharedLedgerPage() {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [transactions, setTransactions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weeklyDatas, setWeeklyDatas] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState(null);

  const [monthlyDatas, setMonthlyDatas] = useState(null);

  const [ledgers, setLedgers] = useState([]);

  // 선택된 공유 가계부 id
  const [selectedSharedLedgerId, setSelectedSharedLedgerId] = useState(null);

  // 공유 가계부 id가 있을 때만 탭 렌더링
  const { ledgerId } = useParams();
  console.log("렌더링됨: SharedLedgerPage");
  console.log("ledgerId:", ledgerId);
  return (
    <div className="max-w-full px-full scrollbar-hidden">
      {/* 1️⃣ ledgerId가 있을 때만 헤더와 탭을 렌더링합니다. */}
      {ledgerId && (
        <>
          <LedgerHeader
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            summary={summary}
          />
          <LedgerTab />
        </>
      )}

      {/* 2️⃣ Outlet은 조건 없이 항상 렌더링되어야 합니다.
          SharedLedger 컴포넌트나 DailyLedger 컴포넌트가 이 위치에 렌더링됩니다. */}
      <Outlet
        context={{
          isShared: true,
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
      <div>제발 아무거나 나와 좀\</div>
      {/* 3️⃣ 추가 버튼은 ledgerId가 있을 때만 렌더링합니다. */}
      {ledgerId && (
        <div className="fixed bottom-10 right-10 z-50">
          <LedgerAddButton
            ledgers={ledgers}
            setLedgers={setLedgers}
            error={error}
            setError={setError}
          />
        </div>
      )}
    </div>
  );
}
