import React from "react";

function DetailList({ detailData, categoryName }) {
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
    <div className="detail-area rounded-box p-5 mb-3">
      <h3 className="text-2xl mb-2">
        상세 내역 <span>{categoryName ? `- ${categoryName}` : ""}</span>
      </h3>
      <ul className="detail-list">
        {detailData.map((tx) => (
          <li
            key={tx.id}
            className="transaction-item flex justify-between py-1"
          >
            <span className="description">{tx.memo || "내역 없음"}</span>
            <span className="amount text-right font-semibold">
              {Number(tx.amount).toLocaleString()}원
            </span>
            <span className="date text-gray-500 text-sm ml-4">
              {tx.date ? new Date(tx.date).toLocaleDateString() : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailList;
