import { useState } from "react";
import { fetchGetLedgers } from "../TransactionApi";

export default function AddSharedLedger({ onSave, sharedLedgers }) {
  const [tab, setTab] = useState("create");
  const [name, setName] = useState("");
  const [ledgerId, setLedgerId] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  // 생성한 공유 가계부의 목록을 바로 받아와야하기 때문에 비동기 함수 -> async/await 사용
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!name) {
      alert("가계부 이름을 입력해 주세요.");
      return;
    }

    onSave({
      name,
      token: localStorage.getItem("accessToken"),
    });

    setLedgerId(ledgerId);
    await fetchGetLedgers(localStorage.getItem("accessToken"));
  };

  // 메일을 보내기 때문에 비동기 함수 -> async/await 사용
  const handleInviteSubmit = async (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!email) {
      alert("가계부 이름을 입력해 주세요.");
      return;
    }

    await onSave({
      email,
      ledgerId,
      token: localStorage.getItem("accessToken"),
    });

    handleReset();
    document.getElementById("add-shared-ledger-modal").close();
  };

  const handleAcceptCodeSubmit = async (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!code) {
      alert("초대 코드를 입력해 주세요.");
      return;
    }

    try {
      await onSave({
        ledgerId,
        token: localStorage.getItem("accessToken"),
        code,
        email,
      });
    } catch (error) {
      alert("초대 코드 등록 실패");
    }

    handleReset();
    document.getElementById("add-shared-ledger-modal").close();
  };

  const handleReset = () => {
    setName("");
    setEmail("");
  };

  return (
    <dialog id="add-shared-ledger-modal" className="modal">
      <div className="modal-box max-w-2xl">
        {/* 탭 */}
        <div className="relative flex justify-between text-lg gap-10 mb-6 border-b border-[var(--black30)]">
          <button
            className={`w-1/2 py-2 font-semibold z-10 ${
              tab === "create"
                ? "text-[var(--accent-color)]"
                : "text-[var(--black30)]"
            }`}
            onClick={() => setTab("create")}
          >
            가계부 생성
          </button>
          <button
            className={`w-1/2 py-2 font-semibold z-10 ${
              tab === "accept"
                ? "text-[var(--accent-color)]"
                : "text-[var(--black30)]"
            }`}
            onClick={() => setTab("accept")}
          >
            코드 등록
          </button>

          {/* 밑줄 바 */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full w-1/2 bg-[var(--accent-color)] transition-all duration-300 ${
                tab === "create" ? "left-0" : "left-1/2"
              } absolute`}
            ></div>
          </div>
        </div>

        {/* 공통 폼 : 이름 or 코드 입력 */}
        <form className="grid grid-cols-3 gap-4 text-sm mb-10">
          <div className="form-control col-span-2">
            <label className="label font-semibold text-base">
              {tab === "create" ? "가계부 이름" : "코드"}
            </label>
            <input
              type="text"
              name={tab === "create" ? "name" : "code"}
              value={tab === "create" ? name : code}
              placeholder={`${
                tab === "create"
                  ? "가계부 이름을 입력해 주세요"
                  : "이메일로 전송된 초대 코드를 입력해 주세요"
              }`}
              onChange={(e) => {
                if (tab === "create") {
                  setName(e.target.value);
                } else {
                  setCode(e.target.value);
                }
              }}
              className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
            />
          </div>

          <button
            type="submit"
            onClick={
              tab === "create" ? handleCreateSubmit : handleAcceptCodeSubmit
            }
            className="btn bg-[var(--accent-color)] text-white px-8 mt-6 rounded text-base"
          >
            {tab === "create" ? "만들기" : "코드 등록"}
          </button>
        </form>

        {tab === "create" && (
          <form className="grid grid-cols-3 gap-4 text-sm mb-10">
            <div className="form-control col-span-1 mb-10">
              <label className="label font-semibold text-base">멤버 초대</label>
              <select
                value={ledgerId || ""}
                onChange={(e) => setLedgerId(e.target.value)}
                className="select w-full border-0 border-b border-[var(--black30)] rounded-none"
              >
                <option disabled value="">
                  가계부를 선택하세요
                </option>
                {sharedLedgers?.map((ledger) => (
                  <option key={ledger.id} value={ledger.id}>
                    {ledger.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control col-span-1 mt-6 mb-10">
              <label className="label font-semibold text-base"></label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="초대할 멤버의 이메일을 입력해 주세요   ex) email@example.com"
                className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
              />
            </div>

            <button
              onClick={handleInviteSubmit}
              className="btn bg-[var(--accent-color)] text-white px-8 mt-6 rounded text-base"
            >
              보내기
            </button>
          </form>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-center items-center mt-6"></div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
