import React, { useContext, useEffect, useState } from "react";
import Summary from "../features/analysis/Summary";
import Strategy from "../features/analysis/Strategy";
import { getStrategy, getSummary } from "../features/analysis/analysisApi";
import "../features/analysis/Analysis.css";
import { AuthContext } from "../context/AuthContext";

function Analysis() {
  const [summary, setSummary] = useState(null);
  const [strategy, setStrategy] = useState(null);

  const TODAY = new Date().toISOString().split("T")[0];

  const { user } = useContext(AuthContext);
  const userId = user?.id;

  // 로컬 스토리지에서 캐시 가져오기
  const loadCachedData = () => {
    if (!userId) return;
    const cachedSummary = localStorage.getItem(`cachedSummary_${userId}`);
    const cachedStrategy = localStorage.getItem(`cachedStrategy_${userId}`);
    const lastFetchDate = localStorage.getItem(`lastFetchDate_${userId}`);

    if (cachedSummary) setSummary(JSON.parse(cachedSummary));
    if (cachedStrategy) setStrategy(JSON.parse(cachedStrategy));

    return lastFetchDate;
  };

  // api 호출 및 캐시에 데이터 저장
  const fetchAndCachedData = async () => {
    if (!userId) return;
    try {
      const summaryData = await getSummary();
      const strategyData = await getStrategy(summaryData);
      // 에러 체크
      if (summaryData?.error || strategyData?.error) {
        console.log("소비 분석 결과 호출 에러, 재시도 중...");
        setTimeout(() => fetchAndCachedData(userId), 1500);
        return;
      }

      setSummary(summaryData);
      setStrategy(strategyData);

      localStorage.setItem(
        `cachedSummary_${userId}`,
        JSON.stringify(summaryData)
      );
      localStorage.setItem(
        `cachedStrategy_${userId}`,
        JSON.stringify(strategyData)
      );
      localStorage.setItem(`lastFetchDate_${userId}`, TODAY);
    } catch (error) {
      console.log("코칭 전략 로드 실패: ", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const lastFetchDate = loadCachedData();

    if (lastFetchDate !== TODAY || !summary || !strategy) {
      fetchAndCachedData(userId);
    } else {
      console.log("캐시 데이터 사용");
    }
  }, [userId]);

  // 기존) 페이지 로드마다 데이터 불러오는 방식
  // useEffect(() => {
  //   if (!summary) {
  //     const fetchData = async () => {
  //       try {
  //         const summaryData = await getSummary();
  //         setSummary(summaryData);
  //         // 코칭 전략
  //         const strategyData = await getStrategy(summaryData);
  //         setStrategy(strategyData);
  //       } catch (error) {
  //         console.log("코칭 전략 로드 실패: ", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [summary]);

  return (
    <div className="analysis w-3/4">
      <h1 className="text-3xl mb-5">소비분석</h1>
      <div className="flex flex-col xl:flex-row gap-5 xl:gap-10">
        <div className="flex-1">
          <Summary data={summary} />
        </div>
        <div className="flex-1">
          <Strategy data={strategy} />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
