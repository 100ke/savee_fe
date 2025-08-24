import React from "react";

function Strategy({ data, summaryExists, loading }) {
  if (loading) {
    return (
      <div>
        <h3 className="text-2xl font-semibold">코칭 전략</h3>
        <p>로딩 중...</p>
      </div>
    );
  }
  if (!summaryExists) {
    return (
      <div>
        <h3 className="text-2xl font-semibold">코칭 전략</h3>
        <div className="alert alert-vertical p-10">
          <p className="text-lg">
            소비 요약 데이터가 없어 코칭 전략을 표시할 수 없습니다.
          </p>
        </div>
      </div>
    );
  }
  if (
    !data ||
    !data.strategy ||
    !data.strategy.tips ||
    !data.strategy.cautions ||
    !data.strategy.positiveHabits
  ) {
    return (
      <div>
        <h3 className="text-2xl font-semibold">코칭 전략</h3>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
  return (
    <div className="strategy">
      <h3 className="text-2xl font-semibold mb-2">코칭 전략</h3>
      <div className="tip mb-5">
        <div className="title flex gap-2 items-center">
          <h4 className="text-2xl font-bold accent">TIP</h4>
          <span>절약할 수 있는 구체적인 전략 3가지!</span>
        </div>
        <div className="tip-list text-lg">
          {data?.strategy?.tips?.map((tip, i) => (
            <div
              key={i}
              className="collapse bg-base-100 border-base-300 border"
            >
              <input type="checkbox" />
              <div className="collapse-title font-semibold">{tip.item}</div>
              <div className="collapse-content text-base">
                {tip.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="mb-5" />
      <div className="content flex flex-row xl:flex-col gap-2">
        <div className="caution flex-1 card bg-base-100 shadow-md border p-5 flex flex-cols gap-2 mb-3">
          <p className="text-xl font-semibold">
            <span className="red">주의</span>가 필요한 소비 영역
          </p>
          {data?.strategy?.cautions?.map((caution, i) => (
            <div
              key={i}
              className="tooltip tooltip-bottom"
              data-tip={caution.description}
            >
              <p>
                {i + 1}. {caution.item}
              </p>
            </div>
          ))}
        </div>
        <div className="positive flex-1 card bg-base-100 shadow-md border p-5 flex flex-cols gap-2 mb-3">
          <p className="text-xl font-semibold">
            <span className="blue">긍정</span>적인 소비 습관
          </p>
          {data?.strategy?.positiveHabits?.map((positiveHabit, i) => (
            <div
              key={i}
              className="tooltip tooltip-bottom"
              data-tip={positiveHabit.description}
            >
              <p>
                {i + 1}. {positiveHabit.item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Strategy;
