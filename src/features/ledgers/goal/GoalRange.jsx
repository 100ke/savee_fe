import { useRef, useEffect, useState } from "react";
import AddGoal from "../modal/AddGoal";
import { fetchCreateGoals } from "../TransactionApi";

export default function GoalRange({ goals, role, ledgerId, setError }) {
  const goal = Array.isArray(goals) ? goals[0] : goals;
  const rangeRef = useRef(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const isValidGoal =
    goal &&
    goal.current_amount != null &&
    goal.target_amount != null &&
    !isNaN(goal.current_amount) &&
    !isNaN(goal.target_amount);

  const current_amount = isValidGoal ? Number(goal.current_amount) : 0;
  const target_amount = isValidGoal ? Number(goal.target_amount) : 1;
  const percentage = isValidGoal
    ? Math.min(Math.round((current_amount / target_amount) * 100), 100)
    : 0;

  const hasGoal = Array.isArray(goals) && goals.length > 0;

  useEffect(() => {
    if (!isValidGoal || !rangeRef.current) return;
    const rangeWidth = rangeRef.current.offsetWidth;
    const percent = current_amount / target_amount;
    const offset = percent * rangeWidth;
    setThumbPosition(offset);
  }, [isValidGoal, current_amount, target_amount]);

  const handleSave = async (formData) => {
    try {
      await fetchCreateGoals(
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
        <div className="text-center mt-10 text-gray-500 flex flex-col justify-center items-center">
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
          <div className="goals-title text-lg font-semibold mb-2">
            {goal.title}
            <span className="goal-category">{goal.category_goals?.name}</span>
          </div>
          <div className="relative w-[80%]">
            <input
              ref={rangeRef}
              type="range"
              min={0}
              max={target_amount}
              value={current_amount}
              className="range w-full accent-[var(--accent-color)] pointer-events-none"
              readOnly
            />
            <div
              className="absolute -bottom-6 text-xs text-[var(--accent-color)] font-medium whitespace-nowrap"
              style={{
                left: `calc(${(current_amount / target_amount) * 100}% - 30px)`,
                transition: "left 0.3s ease",
              }}
            >
              {current_amount.toLocaleString()}원
            </div>
          </div>
          <div className="goals-amount flex justify-between w-[80%] mt-2 text-sm text-[var(--black90)]">
            <span>0원</span>
            <span>{target_amount.toLocaleString()}원</span>
          </div>
          <p className="text-right text-sm mt-1 text-[var(--main-color)]">
            {percentage}% 달성
          </p>
        </div>
      )}
      <AddGoal onSave={handleSave} ledgerId={ledgerId} />
    </div>
  );
}
