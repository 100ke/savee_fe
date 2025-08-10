export default function LedgerAddButton() {
  return (
    <div className="ledger-button fixed bottom-10 right-10 z-50">
      <div className="dropdown dropdown-top dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="add-btn w-12 h-12 m-1 text-base bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center"
        >
          +
        </div>
        <ul tabIndex={0} className="dropdown-content menu w-56 p-2 space-y-2">
          {/* 공유 가계부 추가 */}
          <div
            onClick={console.log("test")}
            className="flex items-center justify-between ml-7 cursor-pointer"
          >
            <span className=" text-right">공유 가계부 추가</span>
            <button className="btn btn-neutral w-12 h-12 m-1 text-base bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
              +
            </button>
          </div>

          {/* 수입/지출 내역 추가 */}
          <div
            onClick={console.log("test")}
            className="flex items-center justify-between ml-7 cursor-pointer"
          >
            <span className=" text-right">수입/지출 내역 추가</span>
            <button className="btn btn-neutral  w-12 h-12 m-1 text-base bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
              +
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
