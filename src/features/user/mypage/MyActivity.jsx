import React from "react";

function MyActivity() {
  return (
    <div className="activity mb-10">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <h2 className="card-title text-xl">내 활동 관리</h2>
          <div className="btn-group flex text-lg">
            <a href="/myqna" className="text-gray-400 flex-1">
              내가 작성한 QnA
            </a>
            {/* <a href="/support" className="text-gray-400 flex-1">
              내가 작성한 코멘트
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyActivity;
