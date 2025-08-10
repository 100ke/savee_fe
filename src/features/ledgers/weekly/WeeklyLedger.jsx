import { useEffect, useState } from "react";
import "../Ledgers.css";
import TransactionChart from "./TransactionChart";
import {
  fetchWeeklyTransactions,
  getPersonalLedgerId,
} from "../TransactionApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../Ledgers.css";
import TransactionAccordion from "./TransactionAccordion";

function WeeklyLedger() {
  const [ledgerId, setLedgerId] = useState(null);
  const {
    selectedDate,
    setSelectedDate,
    summary,
    setSummary,
    transactions,
    setTransactions,
    error,
    setError,
    weeklyDatas, // 전체 주차 데이터
    setWeeklyDatas,
    selectedWeeks, // 아코디언 선택 주차
    setSelectedWeeks,
  } = useOutletContext();

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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

        const peersonalLedgerId = await getPersonalLedgerId(token);
        setLedgerId(peersonalLedgerId.id);

        const { datas, weeklyTotalExpense, weeklyTotalIncome } =
          await fetchWeeklyTransactions(ledgerId, selectedDate, token);

        if (!datas) {
          setError("데이터가 없습니다.");
          setWeeklyDatas([]);
          setSelectedWeeks(null);
        } else {
          setWeeklyDatas(datas);
          setSummary({
            totalIncome: weeklyTotalIncome,
            totalExpense: weeklyTotalExpense,
          });
          setError(null);
        }
      } catch (error) {
        const message = error.response?.data?.message;
        console.error(error);
        // axios response status를 사용해 토큰이 없는 상태에 따른 에러 메시지 설정
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 404) {
          if (
            typeof message === "string" &&
            message.includes("입력한 내역이 없습니다.")
          ) {
            setError("데이터가 없습니다.");
          } else {
            setError("데이터를 불러오는 데 실패했습니다.");
          }
        }

        setWeeklyDatas([]);
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
      ) : weeklyDatas === null ? (
        <div className="text-center text-[var(--black70)] mt-10">
          로딩 중 ...{" "}
        </div>
      ) : (
        <div>
          <TransactionChart weeklyDatas={weeklyDatas} />
          <TransactionAccordion weeklyDatas={weeklyDatas} />
        </div>
      )}
    </div>
  );
}

export default WeeklyLedger;
