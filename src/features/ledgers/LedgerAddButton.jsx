import { useEffect, useState } from "react";
import AddTransactions from "./modal/AddTransactions";
import { fetchCreateTransactions, fetchGetLedgers } from "./TransactionApi";

export default function LedgerAddButton({ ledgers, setLedgers, setError }) {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGetLedgers(token);
        setLedgers(data);
      } catch (error) {
        setError("내역을 저장하지 못했습니다.");
      }
    };

    load();
  }, []);

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
    <div className="ledger-button fixed bottom-10 right-10 z-50">
      <div className="dropdown dropdown-top dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="add-btn cursor-pointer w-12 h-12 m-1 text-base bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center"
        >
          +
        </div>
        <ul tabIndex={0} className="dropdown-content menu w-56 p-2 space-y-2">
          {/* 수입/지출 내역 추가 */}
          <div
            onClick={() => {
              document.getElementById("add-transactions-modal").showModal();
            }}
            className="flex items-center justify-between ml-7 cursor-pointer"
          >
            <span className=" text-right">수입/지출 내역 추가</span>
            <button className="btn btn-neutral  w-12 h-12 m-1 text-base bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
              +
            </button>
          </div>
        </ul>
      </div>
      <AddTransactions ledgers={ledgers} onSave={handleSave} />
    </div>
  );
}
