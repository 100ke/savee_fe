import React from "react";

function Strategy({ data }) {
  if (!data) {
    return (
      <div>
        <h3 className="text-2xl font-semibold">코칭 전략</h3>
        <p>로딩 중...</p>
      </div>
    );
  }
  return (
    <div className="strategy">
      <h3 className="text-2xl font-semibold">코칭 전략</h3>
      {/* 1. 절약할 수 있는 구체적인 전략 3가지
      2. 주의가 필요한 소비 영역
      3. 긍정적인 소비 습관 */}
      <div className="tip">
        <div className="title flex gap-2 items-center">
          <h4 className="text-2xl font-bold accent">TIP</h4>
          <span>절약할 수 있는 구체적인 전략 3가지!</span>
        </div>
        <p>1. {data.strategy.tips[0].item1}</p>
        <p>2. {data.strategy.tips[1].item2}</p>
        <p>3. {data.strategy.tips[2].item3}</p>
      </div>
      <div className="content text-xl card bg-base-100 shadow-md border p-5 flex flex-cols gap-2 mb-3">
        <p>주의가 필요한 소비 영역</p>
        <p>1. {data.strategy.cautions[0].item1}</p>
        <p>2. {data.strategy.cautions[1].item2}</p>
        <p>3. {data.strategy.cautions[2].item3}</p>
      </div>
      <div className="positive">
        <p>긍정적인 소비 습관</p>
        <p>1. {data.strategy.positiveHabits[0].item1}</p>
        <p>2. {data.strategy.positiveHabits[1].item2}</p>
        <p>3. {data.strategy.positiveHabits[2].item3}</p>
      </div>
    </div>
  );
}

export default Strategy;
