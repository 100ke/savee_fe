import { useRef, useEffect, useState } from "react";

export default function GoalRange({ goals }) {
  const goal = Array.isArray(goals) ? goals[0] : goals;
  const rangeRef = useRef(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const current_amount = Number(goal.current_amount);
  const target_amount = Number(goal.target_amount);
  const percentage = Math.min(
    Math.round((current_amount / target_amount) * 100),
    100
  );

  useEffect(() => {
    if (rangeRef.current) {
      const rangeWidth = rangeRef.current.offsetWidth;
      const percent = current_amount / target_amount;
      const offset = percent * rangeWidth;
      setThumbPosition(offset);
    }
  }, [current_amount, target_amount]);

  if (
    !goal ||
    goal.current_amount == null ||
    goal.target_amount == null ||
    isNaN(goal.current_amount) ||
    isNaN(goal.target_amount)
  ) {
    return (
      <div className="goal-null-message mt-5 text-base text-[var(--black70)] text-center">
        아직 목표가 설정되지 않았습니다.
      </div>
    );
  }

  return (
    <div className="goal-range-bar p-4 flex flex-col items-center mt-5 w-full relative">
      <div className="goals-title text-lg font-semibold mb-2">
        {goal.title}
        <span className="goal-category">{goal.category_goals.name}</span>
      </div>

      {/* 바와 current_amount 따라다니는 값 */}
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

        {/* 따라다니는 금액 표시 */}
        <div
          className="absolute -bottom-6 text-xs text-[var(--accent-color)] font-medium whitespace-nowrap"
          style={{
            left: `calc(${(current_amount / target_amount) * 100}% - 30px)`, // 중간 정렬
            transition: "left 0.3s ease",
          }}
        >
          {current_amount.toLocaleString()}원
        </div>
      </div>

      {/* 아래 min/max 표시 */}
      <div className="goals-amount flex justify-between w-[80%] mt-2 text-sm text-[var(--black90)]">
        <span>0원</span>
        <span>{target_amount.toLocaleString()}원</span>
      </div>

      <p className="text-right text-sm mt-1 text-[var(--main-color)]">
        {percentage}% 달성
      </p>
    </div>
  );
}
