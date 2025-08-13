import { useState } from "react";

export default function AddPeronalLedger({ onSave }) {
  const [name, setName] = useState("");

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
  };

  return (
    <dialog id="add-personal-ledger-modal" className="modal">
      <div className="modal-box max-w-xl">
        <form className="flex flex-col gap-4 text-sm mb-10 justify-center items-center text-align">
          <div className="form-control w-[80%]">
            <label className="label font-semibold text-base text-[var(--black70)] mb-6 mt-4">
              가계부 이름
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="가계부 이름을 입력해 주세요"
              className="input input-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
            />
          </div>
          <button
            type="submit"
            onClick={handleCreateSubmit}
            className="btn bg-[var(--accent-color)] text-white px-8 mt-6 rounded text-base w-[50%]"
          >
            만들기
          </button>
        </form>
        {/* 버튼 영역 */}
        <div className="flex justify-center items-center mt-6"></div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
