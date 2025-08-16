import React, { useEffect, useState } from "react";
import Summary from "../features/analysis/Summary";
import Strategy from "../features/analysis/Strategy";
import { getStrategy, getSummary } from "../features/analysis/analysisApi";
import "../features/analysis/Analysis.css";

function Analysis() {
  const [summary, setSummary] = useState(null);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    if (!summary) {
      const fetchData = async () => {
        try {
          const summaryData = await getSummary();
          setSummary(summaryData);
          // 코칭 전략
          const strategyData = await getStrategy(summaryData);
          setStrategy(strategyData);
        } catch (error) {
          console.log("코칭 전략 로드 실패: ", error);
        }
      };

      fetchData();
    }
  }, [summary]);

  return (
    <div className="analysis w-3/4">
      <h1 className="text-3xl mb-5">소비분석</h1>
      <Summary data={summary} />
      <Strategy data={strategy} />
    </div>
  );
}

export default Analysis;
