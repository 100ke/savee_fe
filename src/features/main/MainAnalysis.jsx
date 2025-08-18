import { useAnalysisHighlight } from "../../context/AnalysisHighlightContext";

export default function MainAnalysis() {
  const { highlight } = useAnalysisHighlight();

  if (!highlight) {
    return (
      <div>
        <div className="w-1/5"></div>
        <div className="container bg-[var(--main-color-lightest)] justify-between flex flex-row p-3 rounded-box">
          <p className="ml-4 font-bold">AI 분석 소비 리포트</p>
          <p className="">
            로딩 중...
            <span className="text-[var(--error-color)] ml-2">&gt;</span>
          </p>
        </div>
      </div>
    );
  }

  const { percentChange, type } = highlight;

  return (
    <div>
      <div className="w-1/5"></div>
      <div className="container bg-[var(--main-color-lightest)] justify-between flex flex-row p-3 rounded-box">
        <p className="ml-4 font-bold">AI 분석 소비 리포트</p>
        <p className="">
          <span className="mr-2 text-[var(--error-color)]"> New</span>
          <a href="/analysis">
            총 지출이 지난 달 대비 {percentChange}% {type}했습니다.
          </a>
          <span className="text-[var(--error-color)] ml-2">&gt;</span>
        </p>
      </div>
    </div>
  );
}
