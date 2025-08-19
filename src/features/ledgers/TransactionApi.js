import instance from "../../api/axiosInstance";

// header에 token 추가 함수
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
    // 가계부가 없어도 null 반환
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// 일일 데이터(수입/지출 내역) 가져오는 함수
const fetchDailyTransactions = async (ledgerId, selectedDate, token) => {
  try {
    const ledId = Number(ledgerId);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const reDate = `${year}-${month}`;

    const response = await instance.get(
      `/ledgers/${ledId}/transactions/daily?month=${reDate}`,
      getAuthHeader(token)
    );

    const data = response?.data?.data;

    if (!data || !Array.isArray(data.transactions)) {
      return { transactions: [], summary: { totalIncome: 0, totalExpense: 0 } };
    }

    const { transactions, summary } = data;
    return { transactions, summary };
  } catch (error) {
    if (error.response?.status === 404) {
      return { transactions: [], summary: { totalIncome: 0, totalExpense: 0 } };
    }
    // 상위에서 처리하도록 throw
    throw error;
  }
};

// 주간 데이터(한 달의 주별 내역과 총액) 가져오는 함수
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

// 월간 데이터(한 달의 내역과 각 일자별 총금액) 가져오는 함수
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

// 가계부 목록 가져오는 함수
const fetchGetLedgers = async (token) => {
  try {
    const response = await instance.get(`ledgers`, getAuthHeader(token));

    const ledgers = await response.data.data;
    return ledgers;
  } catch (error) {
    throw error;
  }
};

// 수입/지출 내역 추가
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

// 공유 가계부 생성
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

// 공유 가계부에 멤버 초대(이메일로 초대 코드 발송)
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

// 공유 가계부 초대 수락(코드 등록)
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

// 현재 로그인한 멤버가 참여중인 공유 가계부의 데이터(멤버 정보, 목표, 예산)
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

// 가계부 id 가져오기 위한 함수
const fetchFindLedger = async (ledgerId, token) => {
  try {
    const ledId = Number(ledgerId);
    const response = await instance.get(
      `ledgers/${ledId}`,
      getAuthHeader(token)
    );

    const ledgerInfo = await response.data.data;
    return ledgerInfo;
  } catch (error) {
    throw error;
  }
};

// 개인 가계부 생성
const fetchCreatePersoalLedger = async (token, name) => {
  try {
    const data = {
      name,
      is_shared: false,
    };

    const response = await instance.post(`ledgers`, data, getAuthHeader(token));
    const ledger = await response.data.data;

    return ledger;
  } catch (error) {
    throw error;
  }
};

// 목표 생성
const fetchCreateGoals = async (
  ledgerId,
  token,
  categoryId,
  title,
  target_amount,
  current_amount,
  start_date,
  end_date,
  type,
  status
) => {
  try {
    const ledId = Number(ledgerId);

    const data = {
      ledgerId: ledId,
      categoryId,
      title,
      target_amount,
      current_amount,
      start_date,
      end_date,
      type,
      status,
    };

    const response = await instance.post(
      `ledgers/${ledId}/goals`,
      data,
      getAuthHeader(token)
    );

    const goal = await response.data.data;
    return goal;
  } catch (error) {
    throw error;
  }
};

// 목표 데이터 가져오는 함수
const fetchGetGoal = async (ledgerId, token) => {
  try {
    const ledId = Number(ledgerId);

    const response = await instance.get(
      `ledgers/${ledId}/goals`,
      getAuthHeader(token)
    );

    const resultGoal = await response.data.data;
    console.log(resultGoal);
    return resultGoal;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 목표의 카테고리와 기간에 부합하는 데이터(수입/지출 내역, 각 총금액, 수입 + 지출 총 금액) 가져오는 함수
const fetchGetGoalsTransactions = async (
  ledgerId,
  token,
  start_date,
  end_date
) => {
  try {
    const ledId = Number(ledgerId);

    const response = await instance.get(
      `ledgers/${ledId}/transactions/goals-progress`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          start_date,
          end_date,
        },
      }
    );

    const goalsTrs = await response.data.data;
    return goalsTrs;
  } catch (error) {
    throw error;
  }
};

// 목표 수정(상태 변경)
const fetchUpdateGoal = async (ledgerId, token, goalId, newStatus, current) => {
  try {
    const ledId = Number(ledgerId);

    const response = await instance.put(
      `ledgers/${ledId}/goals/${goalId}`,
      { status: newStatus, current_amount: current },
      getAuthHeader(token)
    );

    const newGoalStatus = await response.data.data;
    return newGoalStatus;
  } catch (error) {
    throw error;
  }
};

// 개인 + 공유(참여중 포함) 가계부 모두 가져오기
const fetchGetAllAccessLedgers = async (token) => {
  try {
    const response = await instance.get(`ledgers/all`, getAuthHeader(token));

    const allLedgers = await response.data.data;
    return allLedgers;
  } catch (error) {
    throw error;
  }
};

// 공유 가계부의 내역 + 코멘트 불러오기
const fetchGetCommentsAndTransactions = async (ledgerId, totalDate, token) => {
  try {
    const ledId = Number(ledgerId);

    const response = await instance.get(
      `ledgers/${ledId}/comments?date=${totalDate}`,
      getAuthHeader(token)
    );

    const comments = await response.data.data;
    return comments;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 댓글 추가
const fetchCreateComment = async (ledgerId, commentDate, content, token) => {
  try {
    const ledId = Number(ledgerId);

    const response = await instance.post(
      `ledgers/${ledId}/comments`,
      { content, comment_date: commentDate },
      getAuthHeader(token)
    );

    const result = await response.data.data;
    return result;
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
  fetchFindLedger,
  fetchCreateGoals,
  fetchGetGoal,
  fetchCreatePersoalLedger,
  fetchGetGoalsTransactions,
  fetchUpdateGoal,
  fetchGetAllAccessLedgers,
  fetchGetCommentsAndTransactions,
  fetchCreateComment,
};
