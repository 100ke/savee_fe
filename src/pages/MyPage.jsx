import React from "react";
import "../features/user/User.css";
import Profile from "../features/user/mypage/Profile";
import AccountSettings from "../features/user/mypage/AccountSettings";
import Supports from "../features/user/mypage/Supports";

function MyPage() {
  return (
    <div className="mypage w-3/4">
      <h1 className="text-3xl mb-5">내 정보</h1>
      <Profile />
      <AccountSettings />
      <Supports />
      <div className="flex justify-end">
        <button className="btn btn-link withdrawal">회원 탈퇴</button>
      </div>
    </div>
  );
}

export default MyPage;
