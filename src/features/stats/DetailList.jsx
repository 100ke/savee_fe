import React from "react";

function DetailList({ detailData, categoryName, filterType }) {
  if (!detailData || !Array.isArray(detailData) || detailData.length === 0) {
    return (
      <div className="detail-area rounded-box p-5 mb-3">
        <p className="text-center text-gray-500">
          차트를 클릭하면 해당 통계에 대한 상세 리스트가 표시됩니다.
        </p>
      </div>
    );
  }
  return (
    <div className="detail-area flex-grow overflow-auto rounded-box p-5 mb-3">
      <h3 className="text-2xl mb-2 flex justify-between">
        상세 내역{" "}
        <span className="accent mr-3">
          {categoryName &&
            (filterType === "category"
              ? ` ${categoryName} 카테고리`
              : filterType === "week"
              ? ` ${categoryName} 주`
              : filterType === "month"
              ? ` ${categoryName} 월`
              : "")}
        </span>
      </h3>
      <ul className="detail-list">
        {detailData.map((tx) => (
          <li
            key={tx.id}
            className="transaction-item flex justify-between py-1"
          >
            <span className="description">{tx.memo || "내역 없음"}</span>
            <div className="">
              <span className="amount text-right font-semibold">
                {Number(tx.amount).toLocaleString()}원
              </span>
              <span className="date text-gray-500 text-sm ml-5">
                {tx.date ? new Date(tx.date).toLocaleDateString() : ""}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailList;
