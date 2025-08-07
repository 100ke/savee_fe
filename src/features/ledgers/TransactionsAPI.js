import axios from "axios";

const getAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const fetchDailyTransactions = async (ledgerId, selectedDate, token) => {
  try {
    const ledId = Number(ledgerId);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const reDate = `${year}-${month}`;

    const response = await axios.get(
      `/ledgers/${ledId}/transactions/daily?month=${reDate}`,
      getAuthHeader(token)
    );

    const { transactions, summary } = await response?.data?.data;
    return { transactions, summary };
  } catch (error) {
    // 상위에서 처리하도록 throw
    throw error;
  }
};

const fetchWeeklyTransactions = async (ledgerId, selectedDate, token) => {
  try {
    const ledId = Number(ledgerId);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1);
    const reDate = `${year}-${month}`;

    const response = await axios.get(
      `ledgers/${ledId}/transactions/weekly?month=${reDate}`,
      getAuthHeader(token)
    );

    const datas = await response.data.data;
    return datas;
  } catch (error) {
    throw error;
  }
};

export { fetchDailyTransactions, fetchWeeklyTransactions };
