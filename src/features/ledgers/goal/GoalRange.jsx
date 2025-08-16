import { useRef, useEffect, useState } from "react";
import AddGoal from "../modal/AddGoal";
import { fetchCreateGoals, fetchUpdateGoal } from "../TransactionApi";
import { isAfter } from "date-fns";

export default function GoalRange({
  goals,
  role,
  ledgerId,
  error,
  setError,
  setGoals,
  goalsTransactions,
}) {
  useEffect(() => {
    if (
      goalsTransactions &&
      goalsTransactions.totalIncome === 0 &&
      goalsTransactions.totalExpense === 0
    ) {
      setError("아직 등록된 수입/지출 내역이 없습니다.");
    }
  }, [goalsTransactions]);

  const goal = Array.isArray(goals) ? goals[0] : goals;
  const rangeRef = useRef(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const isValidGoal =
    goal &&
    typeof goal === "object" &&
    goal.target_amount != null &&
    !isNaN(goal.target_amount);

  const current_amount = isValidGoal ? Number(goal.current_amount) : 0;
  const target_amount = isValidGoal ? Number(goal.target_amount) : 1;

  // status 가 성공 혹은 실패일 때 고정값 사용, 변동x
  const isGoalCompleted =
    goal?.status === "achieved" || goal?.status === "failed";

  const current = isGoalCompleted
    ? Number(goal.current_amount ?? 0)
    : goal?.type === "saving"
    ? goalsTransactions?.totalIncome ?? 0
    : goal?.type === "spending_cut"
    ? goalsTransactions?.totalExpense ?? 0
    : 0;

  const target = isValidGoal ? Number(goal.target_amount) : 1;

  const percentage =
    isValidGoal && target > 0
      ? goal?.type === "spending_cut"
        ? Math.max(100 - Math.round((current / target) * 100), 0)
        : Math.min(Math.round((current / target) * 100), 100)
      : 0;

  const hasGoal = Array.isArray(goals) && goals.length > 0;

  // 기간 만료 혹은 퍼센테이지 달성률에 따른 목표 상태 변경
  const [goalStatus, setGoalStatus] = useState(goal?.status || "");
  const goalEndDate = new Date(goal?.end_date);
  const today = new Date();
  const isGoalEnded = isAfter(today, goalEndDate);

  const showStatusSelect =
    isGoalEnded ||
    (goal?.type !== "spending_cut" && percentage === 100) ||
    (goal?.type === "spending_cut" && percentage === 0);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setGoalStatus(newStatus);

    // 성공/실패일 때 현재 수입/지출 금액을 고정값으로 저장
    const fixedCurrent =
      goal?.type === "saving"
        ? goalsTransactions?.totalIncome ?? 0
        : goal?.type === "spending_cut"
        ? goalsTransactions?.totalExpense ?? 0
        : 0;
    console.log(fixedCurrent);
    try {
      const updateGoal = await fetchUpdateGoal(
        ledgerId,
        localStorage.getItem("accessToken"),
        goal.id,
        newStatus,
        fixedCurrent
      );
      console.log(goal);
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.id === updateGoal.id ? updateGoal : g))
      );
      alert("목표 상태가 변경되었습니다.");
    } catch (error) {
      setError("목표 상태를 변경하지 못했습니다.");
      console.log(error);
    }
  };

  // current 값에 따라 range thumb 이동
  useEffect(() => {
    if (!isValidGoal || !rangeRef.current) return;
    const rangeWidth = rangeRef.current.offsetWidth;
    const percent = current / target;
    const offset = percent * rangeWidth;
    setThumbPosition(offset);
  }, [isValidGoal, current_amount, target_amount, goals]);

  // 목표 생성
  const handleSave = async (formData) => {
    try {
      const newGoals = await fetchCreateGoals(
        formData.ledgerId,
        formData.token,
        formData.categoryId,
        formData.title,
        formData.target_amount,
        formData.current_amount,
        formData.start_date,
        formData.end_date,
        formData.type,
        formData.status
      );
      setGoals([newGoals]);
      alert("저장 완료");
    } catch (error) {
      const message = error.response?.data?.message;
      if (message.includes("목표가 설정되어 있습니다.")) {
        alert("이미 해당 가계부에 목표가 설정되어 있습니다.");
      } else {
        setError("내역을 저장하지 못했습니다.");
      }
    }
  };

  return (
    <div className="goal-range-container">
      {!isValidGoal || !hasGoal ? (
        <div className="text-center mt-10 text-[var(--black70)] flex flex-col justify-center items-center">
          아직 목표가 설정되지 않았습니다.
          {(role === null || role === "owner") && (
            <button
              onClick={() => {
                document.getElementById("add-goal-modal").showModal();
              }}
              className="mt-4 px-4 py-2 bg-[var(--accent-color)] text-white rounded cursor-pointer"
            >
              목표 설정하기
            </button>
          )}
        </div>
      ) : (
        <div className="goal-range-bar p-4 flex flex-col items-center mt-5 w-full relative">
          <div className="goal-title mb-6 flex flex-row gap-2 text-align justify-center items-center w-full">
            <div className="goals-title text-lg font-semibold mb-2">
              {goal.title}
            </div>
            <div className="goal-category font-normal mb-1.5 text-sm text-[var(--main-color)]">
              {goal.category_goals?.name}
            </div>
          </div>
          <div className="relative w-[80%]">
            <input
              ref={rangeRef}
              type="range"
              min={0}
              max={target}
              value={Math.min(current, target)}
              className="range range-primary goal-range w-full accent-[var(--accent-color)] pointer-events-none"
              readOnly
            />
            <div
              className="absolute -bottom-6 text-xs text-[var(--accent-color)] font-medium whitespace-nowrap"
              style={{
                left: `calc(${
                  target !== 0 ? (current / target) * 100 : 0
                }% - 30px)`,
                transition: "left 0.3s ease",
                top: "-1.5rem",
              }}
            >
              {current.toLocaleString()}원
            </div>
          </div>
          <div className="goals-amount flex justify-between w-[80%] mt-2 text-sm text-[var(--black90)]">
            <span>0원</span>
            <span>{target_amount.toLocaleString()}원</span>
          </div>
          <p className="text-right text-sm mt-1 text-[var(--main-color-dark)]">
            {goal?.type === "spending_cut"
              ? `${percentage}% 절약 성공`
              : `${percentage}% 달성`}
          </p>
        </div>
      )}
      {showStatusSelect && (
        <div className="show-status flex flex-row gap-1 mt-5 justify-center items-center text-align">
          <label htmlFor="mr-2 text-sm font-medium">목표 상태 설정</label>
          <select
            name="goalStatus"
            id="goal-status"
            value={goalStatus}
            onChange={handleStatusChange}
            className="p-1 text-sm outline-none border-0 border-b border-[var(--black30)] "
          >
            <option value="">상태 선택</option>
            <option value="achieved">성공</option>
            <option value="failed">실패</option>
            <option value="ongoing">진행중</option>
          </select>
        </div>
      )}
      <AddGoal onSave={handleSave} ledgerId={ledgerId} />
    </div>
  );
}
