export default function GoalRange({ goals }) {
  // 먼저 goals 존재 여부 확인
  if (
    !goals ||
    goals.current_amount == null ||
    goals.target_amount == null ||
    isNaN(goals.current_amount) ||
    isNaN(goals.target_amount)
  ) {
    return (
      <div className="goal-null-message mt-5 text-base text-[var(--black70)] text-center">
        아직 목표가 설정되지 않았습니다.
      </div>
    );
  }

  const current_amount = Number(goals.current_amount);
  const target_amount = Number(goals.target_amount);

  // 목표가 0이면 division by zero 방지
  if (target_amount === 0) {
    return (
      <div className="goal-null-message mt-5 text-base text-[var(--black70)] text-center">
        목표 금액이 0원으로 설정되어 있습니다.
      </div>
    );
  }

  const percentage = Math.min(
    Math.round((current_amount / target_amount) * 100),
    100
  );

  return (
    <div className="goal-range-bar p-4 flex flex-col justify-center items-center mt-5">
      <div className="goals-title">{goals.title}</div>
      <input
        type="range"
        min={0}
        value={current_amount}
        max={target_amount}
        className="range w-[80%] range-[var(--accent-color)]"
      />

      <div className="goals-amount">
        <span className="current-amount">
          {current_amount.toLocaleString()}원
        </span>
        <span className="target-amount">
          {target_amount.toLocaleString()}원
        </span>
      </div>

      <p className="text-right text-sm mt-1 text-green-600">
        {percentage}% 달성
      </p>
    </div>
  );
}
