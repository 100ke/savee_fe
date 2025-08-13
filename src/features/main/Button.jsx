export default function MainButton({
  bgColor,
  borderColor,
  border,
  label,
  icon,
  amount,
  color,
}) {
  return (
    <>
      <div className="card p-4 card flex-col w-2/4">
        <button
          style={{
            "--btn-color": `${bgColor}`,
            "--border-color": `${borderColor}`,
            "--border": `${border}`,
          }}
          className="rounded-[12px] bg-[var(--btn-color)] border-[var(--border-color)] btn flex flex-col items-center justify-between text-lg gap-2 w-full h-40 font-bold"
        >
          <span
            style={{ "--text-color": `${color}` }}
            className="self-end text-[var(--text-color)]"
          >
            {icon}
          </span>
          <p
            style={{ "--text-color": `${color}` }}
            className="self-start ml-9 mb-3 text-[var(--text-color)]"
          >
            {label}
          </p>
          {amount && (
            <small className="text-sm font-normal">총 지출 : {amount}</small>
          )}
        </button>
      </div>
    </>
  );
}
