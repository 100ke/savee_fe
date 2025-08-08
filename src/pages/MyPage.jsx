import React, { useEffect, useState } from "react";
import "../features/user/User.css";
import Profile from "../features/user/mypage/Profile";
import AccountSettings from "../features/user/mypage/AccountSettings";
import Supports from "../features/user/mypage/SupportsLink";
import Withdraw from "../features/user/modal/Withdraw";
import { getUserInfo } from "../features/user/userApi";

function MyPage() {
  const [user, setUser] = useState(null);
  const fetchMyInfo = async () => {
    try {
      const data = await getUserInfo();
      setUser(data);
    } catch (error) {
      const message = error.response?.data?.error || "오류가 발생했습니다.";
      console.log("회원 조회 오류: ", message);
    }
  };
  useEffect(() => {
    fetchMyInfo();
  }, []);
  return (
    <div className="mypage w-3/4">
      <h1 className="text-3xl mb-10">내 정보</h1>
      <Profile user={user} />
      <AccountSettings onInfoChange={fetchMyInfo} />
      <Supports />
      <div className="flex justify-end">
        <button
          className="btn btn-link withdrawal"
          onClick={() => document.getElementById("withdraw-modal").showModal()}
        >
          회원 탈퇴
        </button>
      </div>
      <Withdraw />
    </div>
  );
}

export default MyPage;
