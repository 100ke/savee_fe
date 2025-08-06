import { useEffect, useState } from "react";
import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import TransactionCard from "../features/ledgers/transaction/TransactionCard";
import axios from "axios";
import "../features/ledgers/Ledgers.css";

function DailyLedger() {
  const [error, setError] = useState(null);
  const [ledgerId, setLedgerId] = useState(1);
  const [transactions, setTransactions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    console.log(selectedDate);
    // 데이터 받아와서 각 컴포넌트(트랜잭션 카드, 헤더 등)에 뿌려주기
    const fetchTransactions = async () => {
      try {
        const ledId = Number(ledgerId);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const reDate = `${year}-${month}`;

        const response = await axios.get(
          `ledgers/${ledId}/transactions/daily?month=${reDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { transactions, summary } = await response.data.data;

        setTransactions(transactions);
        setSummary(summary);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("데이터를 불러오는 데 실패했습니다.");
        setTransactions([]);
        setSummary({ totalIncome: 0, totalExpense: 0 });
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

      <TransactionCard transactions={transactions} />
    </div>
  );
}
export default DailyLedger;
