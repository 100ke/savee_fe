import { createContext, useContext, useEffect, useState } from "react";
import { getSummary } from "../features/analysis/analysisApi";
import { AuthContext } from "./AuthContext";

const AnalysisHighlightContext = createContext();

export const AnalysisHighlightProvider = ({ children }) => {
  const [highlight, setHighlight] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);
  const userId = user?.id;

  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // 로그인 사용자마다 다른 캐시 키
    const cacheKey = userId ? `cachedHighlight_${userId}` : null;
    const dateKey = userId ? `lastFetchDate_${userId}` : null;

    const loadCached = () => {
      if (!cacheKey || !dateKey) return null; // 비로그인 시 캐시 무시
      const cached = localStorage.getItem(cacheKey);
      const lastFetchDate = localStorage.getItem(dateKey);

      if (cached) setHighlight(JSON.parse(cached));
      return lastFetchDate;
    };
    const lastFetchDate = loadCached();

    const fetchAndCache = async () => {
      try {
        const summaryData = await getSummary();
        const totalChange = summaryData.summary.totalChange;

        setHighlight(totalChange);

        if (cacheKey && dateKey) {
          localStorage.setItem(cacheKey, JSON.stringify(totalChange));
          localStorage.setItem(dateKey, TODAY);
        }
      } catch (error) {
        console.log("소비 요약 멘트 로드 실패: ", error);
      }
    };
    if (
      isLoggedIn &&
      userId &&
      (!lastFetchDate || lastFetchDate !== TODAY || !highlight)
    ) {
      fetchAndCache();
    }
    // 비로그인의 경우 멘트 초기화
    if (!userId) {
      setHighlight(null);
    }
  }, [userId, isLoggedIn]);

  return (
    <AnalysisHighlightContext.Provider value={{ highlight }}>
      {children}
    </AnalysisHighlightContext.Provider>
  );
};

export const useAnalysisHighlight = () => useContext(AnalysisHighlightContext);
