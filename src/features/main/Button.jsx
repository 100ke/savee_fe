import { useState } from "react";
import { fetchCreateTransactions } from "../ledgers/TransactionApi";
import { useOutletContext } from "react-router-dom";

import AddTransactions from "../ledgers/modal/AddTransactions";
export default function MainButton({
  bgColor,
  borderColor,
  border,
  label,
  icon,
  amount,
  color,
  handleClick,
  tabType,
  ledgers,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (formData) => {
    try {
      await fetchCreateTransactions(
        formData.ledgerId,
        formData.token,
        formData.type,
        formData.memo,
        formData.amount,
        formData.date,
        formData.categoryId
      );
      alert("저장 완료");
      setOpen(false);
    } catch (error) {
      setError("내역을 저장하지 못했습니다.");
    }
  };
  return (
    <>
      <AddTransactions
        ledgers={ledgers}
        // onSave={handleSave}
        tabType={tabType}
        // onClose={() => setModalOpen(false)}
      />
      <div className="card p-1 card flex-col w-2/4 ">
        <button
          style={{
            "--btn-color": `${bgColor}`,
            "--border-color": `${borderColor}`,
            "--border": `${border}`,
          }}
          className="h-[120px] rounded-[12px] bg-[var(--btn-color)] border-[var(--border-color)] btn flex flex-col text-lg gap-2 w-full h-40 font-bold"
          onClick={handleClick}
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
