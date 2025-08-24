import React, { useContext, useEffect, useState } from "react";
import Summary from "../features/analysis/Summary";
import Strategy from "../features/analysis/Strategy";
import { getStrategy, getSummary } from "../features/analysis/analysisApi";
import "../features/analysis/Analysis.css";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Analysis() {
  const { user, isLoggedIn, loading: authLoading } = useContext(AuthContext);
  const userId = user?.id;

  const TODAY = new Date().toISOString().split("T")[0];

  // 캐시에서 초기 상태 세팅
  const cachedSummary = userId
    ? localStorage.getItem(`cachedSummary_${userId}`)
    : null;
  const cachedStrategy = userId
    ? localStorage.getItem(`cachedStrategy_${userId}`)
    : null;

  const [summary, setSummary] = useState(
    cachedSummary ? JSON.parse(cachedSummary) : null
  );
  const [strategy, setStrategy] = useState(
    cachedStrategy ? JSON.parse(cachedStrategy) : null
  );
  const [loading, setLoading] = useState(!cachedSummary || !cachedStrategy);

  // api 호출 및 캐시에 데이터 저장
  const fetchAndCachedData = async () => {
    if (!userId) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const lastFetchDate = localStorage.getItem(`lastFetchDate_${userId}`);
    // 수입/지출 내역 추가가 있었다면 fetch 하도록 코드 수정
    const ledgerUpdated = localStorage.getItem("ledgerUpdated");

    // 캐시 날짜가 오늘이 아님, 가계부에 수정 존재 -> 백그라운드 fetch
    if (lastFetchDate !== TODAY || !summary || !strategy || ledgerUpdated) {
      fetchAndCachedData(userId);
      // 가계부 변경 반영 후 플래그 초기화
      if (ledgerUpdated) localStorage.removeItem("ledgerUpdated");
    } else {
      setLoading(false);
      console.log("캐시 데이터 사용");
    }
  }, [userId]);

  if (authLoading) {
    return (
      <div className="analysis w-3/4">
        <h1 className="text-3xl mb-5">소비분석</h1>
        <div className="flex flex-col xl:flex-row gap-5 xl:gap-10">
          <div className="flex-1">
            <div>
              <h3 className="text-2xl font-semibold">이번 달 소비 요약</h3>
              <p>로딩 중...</p>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <h3 className="text-2xl font-semibold">코칭 전략</h3>
              <p>로딩 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="analysis w-3/4">
      <h1 className="text-3xl mb-5">소비분석</h1>
      <div className="flex flex-col xl:flex-row gap-5 xl:gap-10">
        <div className="flex-1">
          <Summary data={summary} loading={loading} />
        </div>
        <div className="flex-1">
          <Strategy
            data={strategy}
            summaryExists={!!summary?.summary}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
