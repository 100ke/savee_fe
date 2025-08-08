import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignupSuccess({ name, email }) {
  const navigate = useNavigate();
  const GoToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="card bg-base-100 w-96 shadow-md mx-auto border border-gray-100">
      <figure className="px-10 pt-10">
        <FaCheckCircle className="check-circle text-6xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">회원가입 완료</h2>
        <p className="mx-8 my-5">
          {name}님({email})의 회원가입이 성공적으로 완료되었습니다.
        </p>
        <p className="mb-3">
          *회원가입 내역 확인 및 수정은{" "}
          <span className="accent">마이페이지&gt;계정 설정</span>에서
          가능합니다.
        </p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={GoToLogin}>
            로그인 바로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccess;
