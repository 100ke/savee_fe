import React from "react";
import { FaUserAlt } from "react-icons/fa";

function Profile() {
  return (
    <div className="profile my-3 flex">
      <div className="avatar avatar-placeholder">
        <div className="profile-circle text-neutral-content w-24 rounded-full">
          <span className="text-6xl user">
            <FaUserAlt />
          </span>
        </div>
      </div>
      <div className="user-info ml-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-1">홍길동</h2>
        <p>hong@example.com</p>
      </div>
    </div>
  );
}

export default Profile;
