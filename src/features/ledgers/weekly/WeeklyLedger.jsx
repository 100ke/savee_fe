import { useEffect, useState } from "react";
import LedgerHeader from "../LedgerHeader";
import LedgerTab from "../LedgerTab";
import axios from "axios";
import "../Ledgers.css";
import TransactionChart from "./TransactionChart";
import { fetchWeeklyTransactions } from "../TransactionsAPI";
import { useNavigate } from "react-router-dom";

function WeeklyLedger() {
  const [error, setError] = useState(null);
  const [ledgerId, setLedgerId] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyDatas, setWeeklyDatas] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  // 전체 주차 데이터
  const [weeklyData, setWeeklyData] = useState([]);
  // 아코디언 선택 주차
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const navigate = useNavigate();
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // 토큰이 없거나 빈 문자열인 경우 에러 메시지 설정
        if (!token || token.trim() === "") {
          navigate("/login");
          // setTransactions([]);
          setSummary({ totalIncome: 0, totalExpense: 0 });
          return;
        }

        const datas = await fetchWeeklyTransactions(
          ledgerId,
          selectedDate,
          token
        );

        if (!datas) {
        }
        setWeeklyDatas(datas);
        setSummary({ totalIncome: datas.income, totalExpense: datas.expense });
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
      <TransactionChart />
    </div>
  );
}

export default WeeklyLedger;
