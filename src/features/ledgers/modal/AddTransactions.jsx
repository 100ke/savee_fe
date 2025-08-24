import { useEffect, useState, useRef } from "react";
import { BiRefresh } from "react-icons/bi";

const expenseCategories = [
  "식비",
  "취미",
  "여가",
  "병원",
  "카페",
  "교육",
  "쇼핑",
  "주거/통신",
  "편의점",
  "교통",
  "이체",
];

const incomeCategories = ["월급", "용돈", "기타 부수입"];

const categoryMap = {
  식비: 1,
  취미: 2,
  여가: 3,
  병원: 4,
  카페: 5,
  교육: 6,
  쇼핑: 7,
  "주거/통신": 8,
  편의점: 9,
  교통: 10,
  이체: 11,
  월급: 12,
  용돈: 13,
  "기타 부수입": 14,
};

const today = new Date().toISOString().split("T")[0];
const now = new Date();
const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 16);

export default function AddTransactions({
  ledgers,
  onSave,
  tabType,
  onClose,
  open,
}) {
  // console.log(tabType);
  const dialogRef = useRef(null);
  const [tab, setTab] = useState(tabType || "expense");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(localDatetime);
  const [selectedLedgerId, setSelectedLedgerId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);
  const handleClose = () => {
    if (dialogRef.current) dialogRef.current.close();
    if (onClose) onClose(); // 부모(Main)에게 modalOpen false 알리기
  };

  useEffect(() => {
    setTab(tabType || "expense");
  }, [tabType]);

  // 숫자 입력 시 0,000 형태로 보이게 포맷
  const formatNumber = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    if (!onlyNumbers) return "";

    return Number(onlyNumbers).toLocaleString();
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(formatNumber(value));
  };

  const handleReset = () => {
    setMemo("");
    setAmount("");
    setSelectedLedgerId(null);
    setSelectedCategory("");
    setTab(tabType ? tabType : "expense");
    setDate(
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!selectedLedgerId || !memo || !amount || !date || !selectedCategory) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    // categoryId 추출
    const categoryId = categoryMap[selectedCategory];
    const cleanedAmount = Number(amount.replace(/,/g, ""));

    onSave({
      ledgerId: selectedLedgerId,
      token: localStorage.getItem("accessToken"),
      type: tab,
      memo,
      amount: cleanedAmount,
      date,
      categoryId,
    });

    // 250824 백혜윤 - 수입/지출 입력시 소비분석 데이터 캐시 무효화
    localStorage.setItem("ledgerUpdated", Date.now());

    // 폼 초기화
    handleReset();
    document.getElementById("add-transactions-modal").close();
    handleClose();
  };

  return (
    <div className="add-transactions">
      <dialog ref={dialogRef} id="add-transactions-modal" className="modal">
        <div className="modal-box max-w-2xl">
          {/* 탭 */}
          <div className="relative flex justify-between text-lg gap-10 mb-6 border-b border-[var(--black30)]">
            <button
              className={`w-1/2 py-2 font-semibold z-10 ${
                tab === "income"
                  ? "text-[var(--accent-color)]"
                  : "text-[var(--black30)]"
              }`}
              onClick={() => setTab("income")}
            >
              수입
            </button>
            <button
              className={`w-1/2 py-2 font-semibold z-10 ${
                tab === "expense"
                  ? "text-[var(--accent-color)]"
                  : "text-[var(--black30)]"
              }`}
              onClick={() => setTab("expense")}
            >
              지출
            </button>

            {/* 밑줄 바 */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full w-1/2 bg-[var(--accent-color)] transition-all duration-300 ${
                  tab === "income" ? "left-0" : "left-1/2"
                } absolute`}
              ></div>
            </div>
          </div>

          {/* 폼 */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 text-sm"
          >
            <div className="form-control col-span-2">
              <label className="label font-semibold text-base">가계부</label>
              <select
                className="select select-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
                value={selectedLedgerId || ""}
                onChange={(e) => setSelectedLedgerId(e.target.value)}
              >
                <option disabled value="">
                  가계부를 선택해 주세요
                </option>
                {ledgers?.map((ledger) => (
                  <option key={ledger.id} value={ledger.id}>
                    {ledger.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold text-base">
                {tab === "income" ? "수입명" : "지출명"}
              </label>
              <input
                type="text"
                placeholder={`${
                  tab === "income"
                    ? "수입명을 입력해 주세요"
                    : "지출명을 입력해 주세요"
                }`}
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            <div className="form-control relative w-full">
              <label className="label font-semibold text-base">
                {tab === "income" ? "수입 금액" : "지출 금액"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder={`${
                  tab === "income"
                    ? "수입 금액을 입력해 주세요"
                    : "지출 금액을 입력해 주세요"
                }`}
                className="input input-bordered w-full focus:outline-none border-0 border-b border-[var(--black30)] rounded-none"
                onChange={handleAmountChange}
                value={amount}
              />
              <span className="absolute right-3 bottom-2 text-base text-[var(--black70)] pointer-events-none select-none">
                원
              </span>
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">
                {tab === "income" ? "수입 일시" : "지출 일시"}
              </label>
              <input
                type="datetime-local"
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">
                {tab === "income" ? "수입 카테고리" : "지출 카테고리"}
              </label>
              <select
                className="select w-full border-0 border-b border-[var(--black30)] rounded-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option disabled value="">
                  카테고리를 선택하세요
                </option>
                {(tab === "income" ? incomeCategories : expenseCategories).map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </div>
          </form>

          {/* 버튼 영역 */}
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn bg-[var(--accent-color)] text-white px-30 rounded text-base"
            >
              저장
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline btn-sm text-[var(--black30)] hover:bg-transparent hover:shadow-none flex items-center gap-1 border-none"
            >
              <BiRefresh size={20} />
              새로고침
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop" onClick={handleClose}>
          <button>닫기</button>
        </form>
      </dialog>
    </div>
  );
}
