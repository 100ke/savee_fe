import axios from "../../api/axiosInstance";

export const categoryTotal = async (type) => {
  try {
    const response = await axios.get(`/statistics/categories?type=${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 지출 추이 1. 총합 추이
// 월간
export const monthlyTotal = async () => {
  try {
    const response = await axios.get("/statistics/trend/total/monthly");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 주간
export const weeklyTotal = async () => {
  try {
    const response = await axios.get("/statistics/trend/total/weekly");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 지출 추이 2. 최근 7일의 일일추이
export const last7DaysTrend = async () => {
  try {
    const response = await axios.get("/statistics/trend/daily");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상세 내역 조회
// 카테고리별 지출 내역
export const fetchTransactionsByCategory = async (type) => {
  try {
    const response = await axios.get(
      `/statistics/categories/expenses?type=${type}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 월별 지출 내역
export const fetchMonthlyExpensesList = async (year, month) => {
  try {
    const response = await axios.get(
      `/statistics/trend/total/monthly/expenses/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 주별 지출 내역
export const fetchWeeklyExpensesList = async () => {
  try {
    const response = await axios.get("/statistics/trend/total/weekly/expenses");
    return response.data;
  } catch (error) {
    throw error;
  }
};
