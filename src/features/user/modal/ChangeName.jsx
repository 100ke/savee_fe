import React, { useState } from "react";
import { changeName } from "../userApi";

function ChangeName({ onSuccess }) {
  const [name, setName] = useState("");

  const handleChangeName = async () => {
    try {
      await changeName(name);
      alert("이름이 변경되었습니다.");
      onSuccess();
    } catch (error) {}
  };
  return (
    <div className="change-name">
      {/* 이름 입력란, 변경 버튼 */}
      <dialog id="change-name-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">이름 변경</h3>
          <p className="py-4">변경하고 싶은 이름을 입력해주세요.</p>
          <div className="input-name flex">
            <p className="w-30 mt-2">
              이름 <span className="text-red-500">*</span>
            </p>
            <div className="flex-1">
              <label className="input validator p-0 w-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input"
                  min="2"
                  max="10"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </label>
              <p className="validator-hint">
                이름은 2자리 이상, 10자리 이하로 입력 가능합니다.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleChangeName}>
              변경
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChangeName;
