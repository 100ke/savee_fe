export default function MainButton({ color, label, icon, amount }) {
  return (
    <>
      <div className="rounded-box p-4 card flex-col">
        <button
          style={{ "--btn-color": `var(${color})` }}
          className="bg-[var(--btn-color)] btn flex flex-col items-center justify-between text-lg gap-2 w-full h-40 font-bold"
        >
          <span className="self-end">{icon}</span>
          <p className="self-start ml-9 mb-3">{label}</p>
          <small className="text-sm font-normal">{amount}</small>
        </button>
      </div>
    </>
  );
}
