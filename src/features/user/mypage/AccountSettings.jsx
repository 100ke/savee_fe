import React, { useState } from "react";
import ChangeName from "../modal/ChangeName";
import ChangePassword from "../modal/ChangePassword";

function AccountSettings({ onInfoChange }) {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);

  return (
    <div className="account-settings mb-5">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <h2 className="card-title text-xl">계정 설정</h2>
          <div className="btn-group flex gap-30 text-lg">
            <button
              className="cursor-pointer text-gray-400"
              onClick={() => setIsNameModalOpen(true)}
            >
              이름 변경
            </button>
            <button
              className="cursor-pointer text-gray-400"
              onClick={() => setIsPwModalOpen(true)}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
        {isNameModalOpen && (
          <ChangeName
            isOpen={isNameModalOpen}
            onSuccess={() => {
              onInfoChange();
              setIsNameModalOpen(false);
            }}
            onClose={() => setIsNameModalOpen(false)}
          />
        )}
        {isPwModalOpen && (
          <ChangePassword
            isOpen={isPwModalOpen}
            onSuccess={() => {
              onInfoChange();
              setIsPwModalOpen(false);
            }}
            onClose={() => setIsPwModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AccountSettings;
