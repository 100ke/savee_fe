import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import TransactionList from "./TransactionList";
import { useEffect, useState } from "react";
import {
  fetchFindLedger,
  fetchGetCommentsAndTransactions,
  getPersonalLedgerId,
} from "../TransactionApi";
import { jwtDecode } from "jwt-decode";

export default function CommentLedger() {
  const { isShared, selectedDate, setSummary, error, setError } =
    useOutletContext();

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [ledgerId, setLedgerId] = useState(null);
  const { ledgerId: sharedLedgerIdFromURL } = useParams();
  const [comments, setComments] = useState(null);
  const [content, setContent] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchComments = async () => {
    try {
      if (!token || token.trim() === "") {
        navigate("/login");
        setSummary({ totalIncome: 0, totalExpense: 0 });
        return;
      }

      let id = Number(sharedLedgerIdFromURL);

      // 현재 로그인한 사용자가 owner인지 member인지 알아내서 role에 저장
      const ledgerInfo = await fetchFindLedger(id, token);
      const members = ledgerInfo.ledger_ledgermembers || [];

      let currentUserId;
      let personalLedgerInfo = null;

      try {
        personalLedgerInfo = await getPersonalLedgerId(token); // 404 발생 가능
      } catch (err) {
        console.error("개인가계부 요청 실패:", err.message);
      }

      if (!personalLedgerInfo) {
        const decoded = jwtDecode(token);
        currentUserId = decoded.userId || decoded.id || decoded.sub; // 구조에 맞게 조정
      } else {
        currentUserId = personalLedgerInfo.userId;
      }

      setUserId(currentUserId);
      setLedgerId(id);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const totalDate = `${year}-${month}`;

      const data = await fetchGetCommentsAndTransactions(id, totalDate, token);

      if (!data || data.length === 0) {
        setError("데이터가 없습니다.");
        setComments(null);
        setSummary({ totalIncome: 0, totalExpense: 0 });
      } else {
        setComments(data || null);

        const totalIncome = data.reduce((sum, tx) => {
          const incomes = tx.users
            .flatMap((user) => user.transactions)
            .filter((t) => t.type === "income")
            .reduce((s, t) => s + t.amount, 0);
          return sum + incomes;
        }, 0);

        const totalExpense = data.reduce((sum, tx) => {
          const expenses = tx.users
            .flatMap((user) => user.transactions)
            .filter((t) => t.type === "expense")
            .reduce((s, t) => s + t.amount, 0);
          return sum + expenses;
        }, 0);

        setSummary({ totalIncome, totalExpense });
        setError(null);
      }
    } catch (error) {
      setSummary({ totalIncome: 0, totalExpense: 0 });
      const message = error.response?.data?.message;
      console.log(error);
      if (error.response?.status === 404) {
        setError("선택하신 월에 등록된 내역이 없습니다.");
        setComments(null);
        setSummary({ totalIncome: 0, totalExpense: 0 });
      } else {
        // 그 외 에러는 일반 에러 처리
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setComments(null);
        setSummary({ totalIncome: 0, totalExpense: 0 });
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, [isShared, sharedLedgerIdFromURL, selectedDate, token]);

  return (
    <div className="max-w-full px-full scrollbar-hidden">
      {/* 에러 상황에 맞게 메시지 출력 */}
      {error ? (
        <div className="text-center text-[var(--black70)] mt-10">{error}</div>
      ) : comments === null ? (
        <div className="text-center text-[var(--black70)] mt-10">
          로딩 중 ...{" "}
        </div>
      ) : (
        <>
          <TransactionList
            comments={comments}
            setComments={setComments}
            ledgerId={ledgerId}
            content={content}
            setContent={setContent}
            onReload={fetchComments}
            currentUserId={userId}
          />
        </>
      )}
    </div>
  );
}
