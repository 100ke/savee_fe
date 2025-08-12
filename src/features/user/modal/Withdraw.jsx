import React, { useState } from "react";
import { deleteUser } from "../userApi";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleWithdraw = async () => {
    try {
      await deleteUser(email, password);
      localStorage.removeItem("accessToken");
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      console.log("회원 조회 오류: ", message);
      alert(`${message} 다시 시도해 주세요.`);
    }
  };
  return (
    <div className="withdraw">
      {/* 이메일, 비밀번호 입력, 탈퇴 버튼 */}
      <dialog id="withdraw-modal" className="modal">
        <div className="modal-box  max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">회원 탈퇴</h3>
          <p className="py-4">
            본인 확인을 위해 이메일과 비밀번호를 입력해주세요.
          </p>
          <div className="input-email flex mb-2">
            <p className="w-30 mt-2">
              이메일 <span className="text-red-500">*</span>
            </p>
            <div className="flex-1">
              <label className="input validator w-full">
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
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </label>
              <p className="validator-hint">유효한 이메일 형식이 아닙니다.</p>
            </div>
          </div>
          <div className="input-password flex mb-2">
            <p className="w-30 mt-2">
              비밀번호 <span className="text-red-500">*</span>
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <p className="validator-hint">비밀번호를 다시 확인해주세요.</p>
            </div>
          </div>
          <div className="notice rounded-box p-5 mb-3">
            <p className="text-error mb-2">
              회원 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다. <br />
              계정과 연결된 서비스 이용 기록, 저장된 정보이 모두 영구적으로
              삭제됩니다. <br />
              탈퇴 이후에는 동일한 이메일로 재가입하더라도 기존 데이터는
              복구되지 않습니다.
            </p>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span>위 내용을 모두 확인하였으며, 탈퇴에 동의합니다.</span>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary"
              disabled={!isChecked}
              onClick={handleWithdraw}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Withdraw;
