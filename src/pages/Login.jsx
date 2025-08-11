import React, { useState } from "react";
import "../features/user/User.css";
import FindPassword from "../features/user/modal/FindPassword.jsx";
import { login } from "../features/user/userApi.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("로그인 성공");
    } catch (error) {
      console.log("로그인 실패", error);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };
  return (
    <div className="login-page">
      <h3 className="text-2xl text-center mb-4">로그인</h3>
      <fieldset className="fieldset rounded-box w-xs lg:w-md p-4 mx-auto">
        <label className="label text-base">아이디</label>
        <input
          type="email"
          className="input mb-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-base">비밀번호</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center text-sm">
          <button
            className="text-gray-400"
            onClick={() => document.getElementById("find-pw-modal").showModal()}
          >
            비밀번호 찾기
          </button>
          <div className="divider divider-horizontal" />
          <a href="/signup" className="text-gray-400">
            회원가입
          </a>
        </div>
      </div>
      <FindPassword />
    </div>
  );
}

export default Login;
