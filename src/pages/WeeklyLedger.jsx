import { useEffect, useState } from "react";
import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import TransactionCard from "../features/ledgers/transaction/TransactionCard";
import axios from "axios";
import "../features/ledgers/Ledgers.css";

function WeeklyLedger() {
  const [error, setError] = useState(null);
  const [ledgerId, setLedgerId] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyDatas, setWeeklyDatas] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    // 데이터 받아와서 각 컴포넌트(트랜잭션 카드, 헤더 등)에 뿌려주기
    const fetchTransactions = async () => {
      try {
        const ledId = Number(ledgerId);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const reDate = `${year}-${month}`;

        const response = await axios.get(
          `ledgers/${ledId}/transactions/weekly?month=${reDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data.data;

        setWeeklyDatas(data);
        setSummary({ totalIncome: data.income, totalExpense: data.expense });
        setError(null);
      } catch (error) {
        console.error(error);
        setError("데이터를 불러오는 데 실패했습니다.");
        setWeeklyDatas([]);
      }
    };

    fetchTransactions();
  }, [selectedDate]);

  return (
    // ledgerheader 반응형으로 줄어들도록 상위 요소 크기 설정
    <div className="max-w-full px-full scrollbar-hidden">
      <LedgerHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        summary={summary}
      />
      <LedgerTab />

      <TransactionCard weeklydatas={weeklyDatas} />
    </div>
  );
}

export default WeeklyLedger;
