import { createContext, useContext, useEffect, useState } from "react";
import { getSummary } from "../features/analysis/analysisApi";

const AnalysisHighlightContext = createContext();

export const AnalysisHighlightProvider = ({ children }) => {
  const [highlight, setHighlight] = useState(null);

  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadCached = () => {
      const cached = localStorage.getItem("cachedHighlight");
      const lastFetchDate = localStorage.getItem("lastFetchDate");

      if (cached) setHighlight(JSON.parse(cached));
      return lastFetchDate;
    };
    const lastFetchDate = loadCached();

    const fetchAndCache = async () => {
      try {
        const summaryData = await getSummary();
        console.log(summaryData);

        const totalChange = summaryData.summary.totalChange;

        setHighlight(totalChange);

        localStorage.setItem("cachedHighlight", JSON.stringify(totalChange));
        localStorage.setItem("lastFetchDate", TODAY);
      } catch (error) {
        console.log("소비 요약 멘트 로드 실패: ", error);
      }
    };
    if (!lastFetchDate || lastFetchDate !== TODAY || !highlight) {
      fetchAndCache();
      console.log(highlight);
    }
  }, []);

  return (
    <AnalysisHighlightContext.Provider value={{ highlight }}>
      {children}
    </AnalysisHighlightContext.Provider>
  );
};

export const useAnalysisHighlight = () => useContext(AnalysisHighlightContext);
