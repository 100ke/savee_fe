import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  fetchDailyTransactions,
  fetchFindLedger,
  fetchGetGoal,
  fetchGetGoalsTransactions,
  getPersonalLedgerId,
} from "../TransactionApi";
import GoalRange from "./GoalRange";
import { jwtDecode } from "jwt-decode";

export default function GoalLedger() {
  const [ledgerId, setLedgerId] = useState(null);
  const { ledgerId: sharedLedgerIdFromURL } = useParams();
  const { isShared, selectedDate, setSummary, error, setError } =
    useOutletContext();
  const [goals, setGoals] = useState(null);
  const [role, setRole] = useState(null);
  const [goalsTransactions, setGoalsTransactions] = useState(null);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        if (!token || token.trim() === "") {
          navigate("/login");
          setSummary({ totalIncome: 0, totalExpense: 0 });
          return;
        }

        let id;

        // 각 LedgerPage, SharedLedgerPage에서 오는 isShared를 사용해 개인/공유 구분
        if (isShared) {
          id = Number(sharedLedgerIdFromURL);

          // 현재 로그인한 사용자가 owner인지 member인지 알아내서 role에 저장
          const ledgerInfo = await fetchFindLedger(id, token);
          const members = ledgerInfo.ledger_ledgermembers || [];
          let currentUserId;
          let personalLedgerInfo = null;

          try {
            personalLedgerInfo = await getPersonalLedgerId(token); // 404 발생 가능
          } catch (err) {
            console.error("개인가계부 요청 실패:", err.message);
          }

          if (!personalLedgerInfo) {
            const decoded = jwtDecode(token);
            currentUserId = decoded.userId || decoded.id || decoded.sub; // 구조에 맞게 조정
          } else {
            currentUserId = personalLedgerInfo.id;
          }

          const memberInfo = members.find(
            (member) => member.userId === currentUserId
          );
          const role = memberInfo?.role;

          setRole(role);
        } else {
          const personalLedgerId = await getPersonalLedgerId(token);
          id = personalLedgerId.id;
          setRole("owner");
        }

        setLedgerId(id);

        // summary 값 받아오기
        let dailyData;
        try {
          dailyData = await fetchDailyTransactions(id, selectedDate, token);
        } catch (e) {
          console.warn(
            "일일 내역이 없습니다.",
            e?.response?.data?.message || e.message
          );
          dailyData = {
            transactions: [],
            summary: { totalIncome: 0, totalExpense: 0 },
          };
        }
        setSummary(dailyData.summary);

        const data = await fetchGetGoal(id, token);

        if (!Array.isArray(data) || data.length === 0) {
          setGoals([]);
          return;
        }

        setError(null);
        setGoals(data);

        const { start_date, end_date } = data[0];
        if (start_date && end_date) {
          const goalsTrs = await fetchGetGoalsTransactions(
            id,
            token,
            start_date,
            end_date
          );
          setGoalsTransactions(goalsTrs);
        }
      } catch (error) {
        const message = error.response?.data?.message;
        console.log(error);
        console.error(error);
        if (
          typeof message === "string" &&
          message.includes("내역이 없습니다.")
        ) {
          setError("내역이 없습니다.");
        }
      }
    };
    fetchGoals();
  }, [isShared, sharedLedgerIdFromURL, selectedDate, token]);

  return (
    <div className="max-w-full px-full scrollbar-hidden">
      {/* 에러 상황에 맞게 메시지 출력 */}
      {error ? (
        <div className="text-center text-[var(--black70)] mt-10">{error}</div>
      ) : goals === null ? (
        <div className="text-center text-[var(--black70)] mt-10">
          로딩 중 ...{" "}
        </div>
      ) : (
        <>
          <GoalRange
            goals={goals}
            role={role}
            ledgerId={ledgerId}
            error={error}
            setError={setError}
            setGoals={setGoals}
            goalsTransactions={goalsTransactions}
          />
        </>
      )}
    </div>
  );
}
