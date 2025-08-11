import { Outlet, useLocation, useParams } from "react-router-dom";
import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import { useState } from "react";
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

  return (
    <div className="max-w-full px-full scrollbar-hidden">
      {/* ledgerId가 있을 때만 헤더와 탭을 렌더링 */}
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

      {/* Outlet은 조건 없이 항상 렌더링*/}
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

      {/* 추가 버튼은 ledgerId가 있을 때만 렌더링 */}
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
