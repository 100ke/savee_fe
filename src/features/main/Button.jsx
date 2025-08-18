import { useState } from "react";
import { fetchCreateTransactions } from "../ledgers/TransactionApi";

export default function MainButton({
  bgColor,
  borderColor,
  border,
  label,
  icon,
  amount,
  color,
  handleClick,
}) {
  return (
    <>
      <div className="card p-1 card flex-col w-1/2 min-w-[154px]">
        <button
          style={{
            "--btn-color": `${bgColor}`,
            "--border-color": `${borderColor}`,
            "--border": `${border}`,
          }}
          className="h-32 rounded-[12px] bg-[var(--btn-color)] border-[var(--border-color)] btn flex flex-col text-lg w-full font-bold"
          onClick={handleClick}
        >
          <span
            style={{ "--text-color": `${color}` }}
            className="self-end text-[var(--text-color)] flex-1"
          >
            {icon}
          </span>
          <div className="bt-1 self-start flex-1 mb-5 ml-1 text-left">
            <p
              style={{ "--text-color": `${color}` }}
              className="mb-2 text-[var(--text-color)]"
            >
              {label}
            </p>
            {amount && (
              <p className="text-basic font-normal">총 지출 : {amount}</p>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
