import React, { useState } from "react";
import { changePassword } from "../userApi";

function ChangePassword({ onSuccess }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleChangePw = async () => {
    if (
      newPw.length < 6 ||
      newPw.length > 20 ||
      confirmPw.length < 6 ||
      confirmPw.length > 20
    ) {
      alert("비밀번호는 6~20자 사이여야 합니다.");
      return;
    }
    if (!currentPw || !newPw || !confirmPw) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("새 비밀번호와 비밀번호 확인값이 일치하지 않습니다.");
      return;
    }
    try {
      await changePassword(currentPw, newPw);
      alert("비밀번호가 변경되었습니다.");
      onSuccess();
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      console.log("비밀번호 변경 오류: ", message);
      alert(message);
    }
  };

  return (
    <div className="change-pw">
      {/* 현재 비밀번호 입력(버튼 확인), 새 비밀번호, 재입력, 변경버튼 */}
      <dialog id="change-pw-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">비밀번호 변경</h3>
          <p className="py-4">
            비밀번호는 최소 6자리 이상, 최대 20자리까지 입력 가능합니다.
          </p>
          <div className="input-password flex mb-3">
            <p className="w-30 mt-2">
              기존 비밀번호 <span className="text-red-500">*</span>
            </p>
            <div className="flex-1">
              <label className="input validator flex w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minlength="6"
                  maxlength="20"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                />
              </label>
              <p className="validator-hint">비밀번호를 다시 확인해주세요.</p>
            </div>
          </div>
          <div className="input-password flex mb-3">
            <p className="w-30 mt-2">
              새 비밀번호 <span className="text-red-500">*</span>
            </p>
            <div className="flex-1">
              <label className="input validator flex w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minlength="6"
                  maxlength="20"
                  value={newPw}
                  onChange={(e) => {
                    setNewPw(e.target.value);
                  }}
                />
              </label>
              <p className="validator-hint">
                비밀번호는 6자리 이상, 20자리 이하로 입력 가능합니다.
              </p>
            </div>
          </div>
          <div className="input-password-check flex mb-3">
            <p className="w-30 mt-2">
              비밀번호 확인 <span className="text-red-500">*</span>
            </p>
            <div className="flex-1">
              <label className="input validator flex w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  minlength="6"
                  maxlength="20"
                  value={confirmPw}
                  onChange={(e) => {
                    setConfirmPw(e.target.value);
                  }}
                />
              </label>
              <p className="validator-hint">
                비밀번호는 6자리 이상, 20자리 이하로 입력 가능합니다.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleChangePw}>
              변경
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChangePassword;
