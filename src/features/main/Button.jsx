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
      <div className="card p-1 card flex-col w-2/4 ">
        <button
          style={{
            "--btn-color": `${bgColor}`,
            "--border-color": `${borderColor}`,
            "--border": `${border}`,
          }}
          className="h-[120px] rounded-[12px] bg-[var(--btn-color)] border-[var(--border-color)] btn flex flex-col text-lg gap-2 w-full h-40 font-bold"
        >
          <span
            style={{ "--text-color": `${color}` }}
            className="self-end text-[var(--text-color)]"
          >
            {icon}
          </span>
          <div className="bt-1 self-start">
          <p
            style={{ "--text-color": `${color}` }}
            className="self-start ml-1 mb-2 text-[var(--text-color)]"
          >
            {label}
          </p>
          {amount && (
            <p className="text-basic font-normal pl-2">총 지출 : {amount}</p>
          )}
          </div>
        </button>
      </div>
    </>
  );
}
