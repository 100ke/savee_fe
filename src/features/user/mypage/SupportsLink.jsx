import React from "react";

function SupportsLink() {
  return (
    <div className="supports mb-10">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <h2 className="card-title text-xl">고객 지원</h2>
          <div className="btn-group flex gap-30 text-lg">
            <a href="" className="text-gray-400">
              QnA
            </a>
            <a href="" className="text-gray-400">
              고객센터
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportsLink;
