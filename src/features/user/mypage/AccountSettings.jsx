import React from "react";
import ChangeName from "../modal/ChangeName";
import ChangePassword from "../modal/ChangePassword";

function AccountSettings({ onInfoChange }) {
  return (
    <div className="account-settings mb-5">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <h2 className="card-title text-xl">계정 설정</h2>
          <div className="btn-group flex gap-30 text-lg">
            <a
              className="text-gray-400"
              onClick={() =>
                document.getElementById("change-name-modal").showModal()
              }
            >
              이름 변경
            </a>
            <a
              className="text-gray-400"
              onClick={() =>
                document.getElementById("change-pw-modal").showModal()
              }
            >
              비밀번호 변경
            </a>
          </div>
        </div>
        <ChangeName onSuccess={onInfoChange} />
        <ChangePassword onSuccess={onInfoChange} />
      </div>
    </div>
  );
}

export default AccountSettings;
