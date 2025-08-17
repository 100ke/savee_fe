import { useState } from "react";
import { BiRefresh } from "react-icons/bi";

const categories = [
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
  "월급",
  "용돈",
  "기타 부수입",
];

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

export default function AddGoal({ onSave, ledgerId }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("0");
  const [currentAmount, setCurrentAmount] = useState("0");
  const [startDate, setStartDate] = useState(localDatetime);
  const [endDate, setEndDate] = useState(localDatetime);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const formatNumber = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    if (!onlyNumbers) return "";

    return Number(onlyNumbers).toLocaleString();
  };

  const handleAmountChange = (e, type) => {
    const value = e.target.value;
    if (type === "target") {
      setTargetAmount(formatNumber(value));
    } else if (type === "current") {
      setCurrentAmount(formatNumber(value));
    }
  };

  const handleReset = () => {
    setTitle("");
    setTargetAmount("0");
    setCurrentAmount("0");
    setStartDate(
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    );
    setEndDate(
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    );
    setSelectedType("");
    setSelectedStatus("");
    setSelectedCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수값 체크
    if (
      !title ||
      targetAmount === "" ||
      currentAmount === "" ||
      !startDate ||
      !endDate ||
      !selectedType ||
      !selectedStatus
    ) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    // categoryId 추출
    const categoryId = categoryMap[selectedCategory];
    const cleanedTargetAmount = Number(targetAmount.replace(/,/g, ""));
    const cleanedCurrentAmount = Number(currentAmount.replace(/,/g, ""));

    onSave({
      token: localStorage.getItem("accessToken"),
      ledgerId,
      categoryId,
      title,
      target_amount: cleanedTargetAmount,
      current_amount: cleanedCurrentAmount,
      start_date: startDate,
      end_date: endDate,
      type: selectedType,
      status: selectedStatus,
    });

    // 폼 초기화
    handleReset();
    document.getElementById("add-goal-modal").close();
  };

  return (
    <div className="add-goal">
      <dialog id="add-goal-modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="relative flex justify-between text-lg gap-10 mb-6 border-b border-[var(--black30)]">
            <div className="w-full py-2 font-semibold z-10 justify-center text-center items-center">
              목표 설정
            </div>

            {/* 밑줄 바 */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-[var(--accent-color)] transition-all duration-300"></div>
            </div>
          </div>

          {/* 폼 */}
          <form className="grid grid-cols-2 gap-4 text-sm">
            <div className="grid grid-cols-3 gap-4 col-span-2">
              <div className="form-control col-span-2">
                <label className="label font-semibold text-base">목표</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="목표를 입력해 주세요"
                  className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
                />
              </div>

              <div className="form-control col-span-1">
                <label className="label font-semibold text-base">
                  카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select w-full border-0 outline-none border-b border-[var(--black30)] rounded-none"
                >
                  <option disabled value="">
                    카테고리 선택
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label font-semibold text-base">목표 금액</label>
              <input
                type="text"
                placeholder="목표 금액을 입력해 주세요"
                name="target-amount"
                value={targetAmount}
                onChange={(e) => handleAmountChange(e, "target")}
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
              />
              <span className="absolute left-75 bottom-64 text-base text-[var(--black70)] pointer-events-none select-none">
                원
              </span>
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">타입</label>
              <select
                name="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select w-full border-0 border-b outline-none border-[var(--black30)] rounded-none"
              >
                <option disabled value="">
                  목표 타입 선택
                </option>
                <option value="saving">저축</option>
                <option value="spending_cut">절약</option>
              </select>
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">시작일</label>
              <input
                type="datetime-local"
                name="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                defaultValue={localDatetime}
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">종료일</label>
              <input
                type="datetime-local"
                name="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                defaultValue={localDatetime}
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label font-semibold text-base">상태</label>
              <div className="flex flex-row gap-2 mt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="ongoing"
                    checked={selectedStatus === "ongoing"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="radio radio-sm accent-[var(--accent-color)]"
                  />
                  <span className="text-sm">진행중</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="achieved"
                    checked={selectedStatus === "achieved"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="radio radio-sm accent-[var(--accent-color)]"
                  />
                  <span className="text-sm">성공</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="failed"
                    checked={selectedStatus === "failed"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="radio radio-sm accent-[var(--accent-color)]"
                  />
                  <span className="text-sm">실패</span>
                </label>
              </div>
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

        <form method="dialog" className="modal-backdrop">
          <button>닫기</button>
        </form>
      </dialog>
    </div>
  );
}
