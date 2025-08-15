import React from "react";

function Summary({ data }) {
  if (
    !data ||
    !data.summary ||
    !data.summary.biggestChange ||
    !data.summary.totalChange
  ) {
    return <div>로딩 중...</div>;
  }
  const type1 = data.summary.biggestChange.type;
  const type2 = data.summary.totalChange.type;
  return (
    <div className="summary mb-5">
      <h3 className="text-2xl font-semibold">이번 달 소비 요약</h3>
      <div className="content text-lg">
        <p>
          이번 달은{" "}
          <span className="blue">{data.summary.biggestChange.category}</span>{" "}
          지출이{" "}
          <span className={type1 === "증가" ? "blue" : "red"}>
            {data.summary.biggestChange.percentChange}%{" "}
            {data.summary.biggestChange.type}
          </span>
          했습니다.
        </p>
        <p>
          지난 달 대비 지출이 전체적으로{" "}
          <span className={type2 === "증가" ? "blue" : "red"}>
            {data.summary.totalChange.percentChange}%{" "}
            {data.summary.totalChange.type}
          </span>
          했습니다.
        </p>
        <p>
          당신은{" "}
          <span className="accent">
            {data.summary.maxSpendingDay.dayOfWeek}
          </span>
          에 가장 많이 소비합니다.
        </p>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("summary_modal").showModal()}
      >
        자세히보기
      </button>
      <dialog id="summary_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">이번 달 소비 자세히보기</h3>
          <p className="py-4">{data.summary.summaryText}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">확인</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Summary;
