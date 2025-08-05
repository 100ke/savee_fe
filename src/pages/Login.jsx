import React from "react";

function Login() {
  return (
    <div className="login-page">
      <h3 className="text-2xl text-center mb-4">로그인</h3>
      <fieldset className="fieldset rounded-box w-xs p-4 mx-auto">
        <label className="label text-base">아이디</label>
        <input type="email" className="input mb-2" placeholder="Email" />

        <label className="label text-base">비밀번호</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-primary mt-4">Login</button>
      </fieldset>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center text-sm">
          <a href="" className="text-gray-400">
            비밀번호 찾기
          </a>
          <div className="divider divider-horizontal" />
          <a href="" className="text-gray-400">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
