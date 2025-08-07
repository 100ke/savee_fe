import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { getUserInfo } from "../userApi";

function Profile() {
  const [user, setUser] = useState(null);
  const fetchMyInfo = async () => {
    try {
      const data = await getUserInfo();
      setUser(data);
    } catch (error) {
      console.log("사용자 정보 조회 실패", error);
    }
  };
  useEffect(() => {
    fetchMyInfo();
  }, []);
  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="profile my-3 flex mb-10">
      <div className="avatar avatar-placeholder">
        <div className="profile-circle text-neutral-content w-24 rounded-full">
          <span className="text-6xl user">
            <FaUserAlt />
          </span>
        </div>
      </div>
      <div className="user-info ml-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
        <p className="text-xl">{user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
