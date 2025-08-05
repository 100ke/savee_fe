import React from "react";

function FindPassword() {
  return (
    <div className="find-pw">
      {/* 이메일 입력란, 인증버튼(메일발송), 인증번호 입력, 임시 비밀번호 발급 */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">비밀번호 찾기</h3>
          <p className="py-4">비밀번호를 찾고자하는 이메일을 입력해주세요.</p>
          <div className="input-email flex">
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
                <input type="email" placeholder="mail@site.com" required />
              </label>
              <p className="validator-hint">유효한 이메일 형식이 아닙니다.</p>
            </div>
            <button className="btn btn-primary join-item">인증</button>
          </div>
          <div className="input-verify-code flex">
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

                <input type="text" required placeholder="Verified Code" />
              </label>
              <p className="validator-hint">인증번호가 일치하지 않습니다.</p>
            </div>
          </div>
          <div className="temp-pw rounded-box p-3">
            <p className="">
              임시 비밀번호: <span className="code">T2MP9W</span>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default FindPassword;
