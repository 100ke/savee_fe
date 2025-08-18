import React from "react";

function SupportsLink() {
  return (
    <div className="supports mb-5">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <h2 className="card-title text-xl">고객 지원</h2>
          <div className="btn-group flex text-lg">
            <a href="/Qna" className="text-gray-400 flex-1">
              QnA
            </a>
            <a href="/support" className="text-gray-400 flex-1">
              고객센터
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportsLink;
