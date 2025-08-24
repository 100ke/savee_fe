import axios from "../../api/axiosInstance";

export const getSummary = async () => {
  try {
    const response = await axios.get("/analysis/summary");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // 가계부의 데이터가 없는 경우 null로 처리하기
      return { summary: null };
    }
    throw error;
  }
};

export const getStrategy = async (summary) => {
  if (!summary?.summary) return null; // summary 없으면 전략도 없음
  try {
    const response = await axios.post("/analysis/strategy", {
      summary,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
