import React, { useState } from "react";
import { signup, verifyCode, verifyEmail } from "../userApi";

function InfoStep({ onBack, onNext, onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifyErrorMsg, setBackErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const sendEmail = async () => {
    try {
      await verifyEmail(email);
      alert("이메일이 발송되었습니다.");
      setBackErrorMsg("");
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      setBackErrorMsg(message);
      console.log("메일 발송 오류: ", message);
      alert(message);
    }
  };

  const handleVerify = async () => {
    try {
      await verifyCode(email, code);
      alert("인증번호가 일치합니다.");
      setIsVerified(true);
      setBackErrorMsg("");
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      setBackErrorMsg(message);
      console.log("인증 오류: ", message);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await signup(email, name, password);
      setBackErrorMsg("");
      onNext();
      onSignupSuccess({ name, email });
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      setBackErrorMsg(message);
      console.log("회원 가입 오류: ", message);
    }
  };

  return (
    <div className="w-3/4 md:w-2/3 lg:w-1/2 mx-auto max-w-lg min-w-[320px]">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <input
              type="email"
              placeholder="mail@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <p className="validator-hint">유효한 이메일 형식이 아닙니다.</p>
        </div>
        <button className="btn btn-primary join-item" onClick={sendEmail}>
          인증
        </button>
      </div>
      <div className="input-verify-code flex mb-3">
        <p className="w-30 mt-2">
          인증번호 확인 <span className="text-red-500">*</span>
        </p>
        <div className="flex-1">
          <label
            className={`input flex w-full ${
              isVerified ? "input-success" : verifyErrorMsg ? "input-error" : ""
            }`}
          >
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
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <p className="text-error text-xs mt-1 min-h-[1.25rem]">
            {verifyErrorMsg ? "인증번호가 일치하지 않습니다." : ""}
          </p>
        </div>
        <button className="btn btn-primary join-item" onClick={handleVerify}>
          확인
        </button>
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
          <label
            className={`input flex w-full ${
              isPasswordMatch
                ? "input-success"
                : isPasswordMismatch
                ? "input-error"
                : ""
            }`}
          >
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
          <p className="text-error text-xs mt-1 min-h-[1.25rem]">
            {isPasswordMismatch ? "비밀번호가 일치하지 않습니다." : ""}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="btn btn-soft btn-primary w-1/3" onClick={onBack}>
          이용 약관
        </button>
        <button className="btn btn-primary w-1/3" onClick={handleSignup}>
          가입하기
        </button>
      </div>
    </div>
  );
}

export default InfoStep;
