import axios from "axios";
import instance from "../../api/axiosInstance";

const getAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ledgerId 가져오는 함수
const getPersonalLedgerId = async (token) => {
  try {
    const response = await instance.get(
      `/ledgers/personal`,
      getAuthHeader(token)
    );

    const peersonalLedgerId = await response.data.data;
    return peersonalLedgerId;
  } catch (error) {
    throw error;
  }
};

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
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const reDate = `${year}-${month}`;

    const response = await instance.get(
      `ledgers/${ledId}/transactions/weekly?month=${reDate}`,
      getAuthHeader(token)
    );

    const datas = await response.data.data;

    // header에 보낼 summary 추출
    const weeklyTotalIncome = datas.reduce((sum, week) => sum + week.income, 0);
    const weeklyTotalExpense = datas.reduce(
      (sum, week) => sum + week.expense,
      0
    );
    return { datas, weeklyTotalExpense, weeklyTotalIncome };
  } catch (error) {
    throw error;
  }
};

const fetchMonthlyTransactions = async (ledgerId, selectedDate, token) => {
  try {
    const ledId = Number(ledgerId);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const reDate = `${year}-${month}`;

    const response = await instance.get(
      `ledgers/${ledId}/transactions/monthly?month=${reDate}`,
      getAuthHeader(token)
    );

    const data = await response.data.data;

    // header에 보낼 summary 추출
    const monthlyTotalIncome = data.reduce(
      (sum, month) => sum + Number(month.totalIncome),
      0
    );
    const monthlyTotalExpense = data.reduce(
      (sum, month) => sum + Number(month.totalExpense),
      0
    );

    return { data, monthlyTotalExpense, monthlyTotalIncome };
  } catch (error) {
    throw error;
  }
};

const fetchGetLedgers = async (token) => {
  try {
    const response = await instance.get(`ledgers`, getAuthHeader(token));

    const ledgers = await response.data.data;
    return ledgers;
  } catch (error) {
    throw error;
  }
};

const fetchCreateTransactions = async (
  ledgerId,
  token,
  type,
  memo,
  amount,
  date,
  categoryId
) => {
  try {
    const ledId = Number(ledgerId);

    const data = {
      type,
      amount,
      memo,
      categoryId,
      ledgerId: ledId,
      date,
    };

    const response = await instance.post(
      `ledgers/${ledId}/transactions`,
      data,
      getAuthHeader(token)
    );

    const transaction = await response.data.data;
    return transaction;
  } catch (error) {
    throw error;
  }
};

const fetchCreateSharedLedgers = async (name, token) => {
  const is_shared = true;
  try {
    const data = { name, is_shared };

    const response = await instance.post(`ledgers`, data, getAuthHeader(token));

    const ledger = await response.data.data;
    return ledger;
  } catch (error) {
    throw error;
  }
};

const fetchInviteLedgerMembers = async (ledgerId, token, email) => {
  try {
    const ledId = Number(ledgerId);
    const data = {
      email,
      ledgerId: ledId,
    };

    const response = await instance.post(
      `ledgers/${ledId}/members`,
      data,
      getAuthHeader(token)
    );

    const inviteMember = await response.data.data;
    return inviteMember;
  } catch (error) {
    throw error;
  }
};

const fetchAcceptCodes = async (ledgerId, token, code, email) => {
  try {
    const ledId = Number(ledgerId);
    const data = {
      code,
      email,
    };

    const response = await instance.post(
      `invites/accept/${code}`,
      data,
      getAuthHeader(token)
    );

    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
};

const fetchGetLedgersByMembership = async (token) => {
  try {
    const response = await instance.get(
      `ledgers/membership`,
      getAuthHeader(token)
    );

    const memberLedgers = await response.data.data;
    return memberLedgers;
  } catch (error) {
    throw error;
  }
};

export {
  getPersonalLedgerId,
  fetchDailyTransactions,
  fetchWeeklyTransactions,
  fetchMonthlyTransactions,
  fetchGetLedgers,
  fetchCreateTransactions,
  fetchCreateSharedLedgers,
  fetchInviteLedgerMembers,
  fetchAcceptCodes,
  fetchGetLedgersByMembership,
};
