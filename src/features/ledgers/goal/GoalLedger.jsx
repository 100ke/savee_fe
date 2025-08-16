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

export default function GoalLedger() {
  const [ledgerId, setLedgerId] = useState(null);
  const { ledgerId: sharedLedgerIdFromURL } = useParams();
  const {
    isShared,
    selectedDate,
    setSummary,
    transactions,
    setTransactions,
    error,
    setError,
  } = useOutletContext();
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
          const owner = await fetchFindLedger(id, token);
          const members = owner.ledger_ledgermembers || [];

          const personalLedgerInfo = await getPersonalLedgerId(token);
          const currentUserId = personalLedgerInfo.userId;

          const memberInfo = members.find(
            (member) => member.userId === currentUserId
          );
          const role = memberInfo?.role;

          setRole(role);

          if (role !== "owner") {
            setError("권한이 없습니다.");
            alert("목표는 가계부의 소유자만 관리할 수 있습니다.");
          }
        } else {
          const personalLedgerId = await getPersonalLedgerId(token);
          id = personalLedgerId.id;
          setRole("owner");
        }

        setLedgerId(id);

        const data = await fetchGetGoal(id, token);

        if (!data) {
          setError("목표가 없습니다.");
          setGoals([]);
        } else {
          setError(null);
          setGoals(data);
        }

        // summary 값 받아오기
        const summary = await fetchDailyTransactions(id, selectedDate, token);

        setSummary(summary.summary);

        // goal range bar & summary를 위한 데이터 가져오기
        const goalsTrs = await fetchGetGoalsTransactions(
          id,
          token,
          data[0].start_date,
          data[0].end_date
        );

        setGoalsTransactions(goalsTrs);
      } catch (error) {
        setSummary({ totalIncome: 0, totalExpense: 0 });
        const message = error.response?.data?.message;
        console.log(error);
        if (ledgerId === null) {
          setError("아직 가계부가 없습니다. 가계부를 만들어 주세요.");
        }

        setSummary({ totalIncome: 0, totalExpense: 0 });
      }
    };
    fetchGoals();
  }, [isShared, sharedLedgerIdFromURL, selectedDate, token, goalsTransactions]);

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
