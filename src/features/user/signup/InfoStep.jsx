import React, { useState } from "react";

function InfoStep({ onBack, onNext }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
      <div className="input-name flex mb-3">
        <p className="w-30 mt-2">
          이름 <span className="text-red-500">*</span>
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Username"
              minlength="2"
              maxlength="10"
            />
          </label>
          <p className="validator-hint">
            이름은 2자리 이상, 10자리 이하로 입력 가능합니다.
          </p>
        </div>
      </div>
      <div className="input-email flex mb-3">
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
      <div className="input-verify-code flex mb-3">
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
          <p className="validator-hint">
            비밀번호는 6자리 이상, 20자리 이하로 입력 가능합니다.
          </p>
        </div>
      </div>
      <div className="input-password flex mb-3">
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              minlength="6"
              maxlength="20"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </label>
          <p className="validator-hint">비밀번호가 일치하지 않습니다.</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="btn btn-soft btn-primary w-1/3" onClick={onBack}>
          이용 약관
        </button>
        <button className="btn btn-primary w-1/3" onClick={onNext}>
          가입하기
        </button>
      </div>
    </div>
  );
}

export default InfoStep;
