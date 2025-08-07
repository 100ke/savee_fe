import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import "../Ledgers.css";
import { fetchDailyTransactions } from "../TransactionsAPI";
import { useNavigate, useOutletContext } from "react-router-dom";

function DailyLedger() {
  const [ledgerId, setLedgerId] = useState(1);
  const {
    selectedDate,
    setSelectedDate,
    summary,
    setSummary,
    transactions,
    setTransactions,
    error,
    setError,
  } = useOutletContext();
  const token = process.env.REACT_APP_TOKEN;
  const navigate = useNavigate();
  // LedgerPage에서 전달한 상태, 함수 받아오기

  useEffect(() => {
    // 데이터 받아와서 각 컴포넌트(트랜잭션 카드, 헤더 등)에 뿌려주기
    const fetchTransactions = async () => {
      try {
        // 토큰이 없거나 빈 문자열인 경우 에러 메시지 설정
        if (!token || token.trim() === "") {
          navigate("/login");
          setTransactions([]);
          setSummary({ totalIncome: 0, totalExpense: 0 });
          return;
        }

        const data = await fetchDailyTransactions(
          ledgerId,
          selectedDate,
          token
        );

        if (!data || !data.transactions) {
          setError("데이터가 없습니다.");
          setTransactions([]);
          setSummary({ totalIncome: 0, totalExpense: 0 });
        } else {
          setTransactions(data.transactions || []);
          setSummary(data.summary);
          setError(null);
        }
      } catch (error) {
        const message = error.response?.data?.message;

        // axios response status를 사용해 토큰이 없는 상태에 따른 에러 메시지 설정
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 404) {
          if (message.includes("입력한 내역이 없습니다.")) {
            setError("데이터가 없습니다.");
          } else {
            setError("데이터를 불러오는 데 실패했습니다.");
          }
        }

        setTransactions([]);
        setSummary({ totalIncome: 0, totalExpense: 0 });
      }
    };

    fetchTransactions();
  }, [selectedDate, ledgerId, token, navigate]);

  return (
    // ledgerheader 반응형으로 줄어들도록 상위 요소 크기 설정
    <div className="max-w-full px-full scrollbar-hidden">
      {/* 에러 상황에 맞게 메시지 출력 */}
      {error ? (
        <div className="text-center text-[var(--black70)] mt-10">{error}</div>
      ) : transactions === null ? (
        <div className="text-center text-[var(--black70)] mt-10">
          로딩 중 ...{" "}
        </div>
      ) : (
        <TransactionCard transactions={transactions} />
      )}
    </div>
  );
}
export default DailyLedger;
