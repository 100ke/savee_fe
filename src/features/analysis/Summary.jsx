import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function Summary({ data }) {
  if (
    !data ||
    !data.summary ||
    !data.summary.biggestChange ||
    !data.summary.totalChange ||
    !data.summary.maxSpendingWeek
  ) {
    return (
      <div>
        <h3 className="text-2xl font-semibold">이번 달 소비 요약</h3>
        <p>로딩 중...</p>
      </div>
    );
  }
  const type1 = data?.summary?.biggestChange?.type;
  const type2 = data?.summary?.totalChange?.type;
  return (
    <div className="summary mb-5">
      <h3 className="text-2xl font-semibold mb-2">이번 달 소비 요약</h3>
      <p className="mb-1 align-middle">
        <span className="exclamation mr-1">
          <FaExclamationCircle className="inline mb-1" />
        </span>
        SAVEE의 소비 요약은 AI가 분석하고 있습니다. 약간의 오차가 존재할 수
        있습니다.
      </p>
      <div className="content text-xl card bg-base-100 shadow-md border p-5 flex flex-cols gap-2 mb-3">
        <p>
          이번 달은{" "}
          <span className="blue font-semibold">
            {data.summary.biggestChange.category}
          </span>{" "}
          지출이{" "}
          <span className={type1 === "증가" ? "red" : "blue"}>
            {data.summary.biggestChange.percentChange}%{" "}
            {data.summary.biggestChange.type}
          </span>
          했습니다.
        </p>
        <p>
          <span className="red font-semibold">총 지출</span>이 지난 달 대비{" "}
          <span className={type2 === "증가" ? "red" : "blue"}>
            {data.summary.totalChange.percentChange}%{" "}
            {data.summary.totalChange.type}
          </span>
          했습니다.
        </p>
        <p>
          주별로 보면,{" "}
          <span className="green font-semibold">
            {data.summary.maxSpendingWeek.week}주차
          </span>
          에 소비가 가장 많았습니다.
        </p>
        <p>
          최근 7일 중에는{" "}
          <span className="accent font-semibold">
            {data.summary.maxSpendingDay.dayOfWeek}
          </span>
          에 소비가 가장 집중되었습니다.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-primary w-1/3"
          onClick={() => document.getElementById("summary_modal").showModal()}
        >
          자세히보기
        </button>
      </div>
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
