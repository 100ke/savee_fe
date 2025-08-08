import React, { useState } from "react";
import { findPasswordMail, resetPassword, verifyCode } from "../userApi";

function FindPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [tempPw, setTempPw] = useState("");
  const [name, setName] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const sendEmail = async () => {
    try {
      await findPasswordMail(email);
      alert("이메일이 발송되었습니다.");
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      console.log("메일 발송 오류: ", message);
      alert(message);
    }
  };

  const VerifyCode = async (email, code) => {
    try {
      await verifyCode(email, code);
      alert("인증번호가 일치합니다.");
      setIsVerified(true);
      const result = await resetPassword(email);
      setTempPw(result.tempPassword);
      setName(result.name);
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      console.log("인증 오류: ", message);
      alert(message);
    }
  };

  return (
    <div className="find-pw">
      {/* 이메일 입력란, 인증버튼(메일발송), 인증번호 입력, 임시 비밀번호 발급 */}
      <dialog id="find-pw-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">비밀번호 찾기</h3>
          <p className="py-4">비밀번호를 찾고자하는 이메일을 입력해주세요.</p>
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
            <button className="btn btn-primary join-item" onClick={sendEmail}>
              인증번호 발송
            </button>
          </div>
          <div className="input-verify-code flex mb-2">
            <p className="w-30 mt-2">
              인증번호 확인 <span className="text-red-500">*</span>
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
                    <path d="M5 13l4 4L19 7" />
                  </g>
                </svg>

                <input
                  type="text"
                  required
                  placeholder="Verified Code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </label>
              <p className="validator-hint">인증번호를 입력해주세요.</p>
            </div>
            <div
              className="btn btn-primary"
              onClick={() => VerifyCode(email, code)}
            >
              인증
            </div>
          </div>
          {isVerified && (
            <div className="hidden-area">
              <p className="mb-2">
                {name}님의 비밀번호가 아래와 같이 초기화 되었습니다.
              </p>
              <div className="temp-pw rounded-box p-4">
                <p className="text-center text-xl">
                  임시 비밀번호:{" "}
                  <span className="code font-bold">{tempPw}</span>
                </p>
              </div>
              <p className="mt-3 notice text-sm">
                임시 비밀번호로 로그인 한 후 반드시 비밀번호를 변경해주세요.
              </p>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default FindPassword;
