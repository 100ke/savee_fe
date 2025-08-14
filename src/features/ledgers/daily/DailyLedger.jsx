import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import "../Ledgers.css";
import {
  fetchCreatePersoalLedger,
  fetchDailyTransactions,
  getPersonalLedgerId,
} from "../TransactionApi";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AddPeronalLedger from "../modal/AddPersonalLedger";

function DailyLedger() {
  // 개인/공유 가계부 둘 다 daily를 사용해야 하므로 ledgerId 분리
  // sharedLedgerIdFromURL은 useParams를 사용해 url 파라미터로 오는 ledgerId
  const [ledgerId, setLedgerId] = useState(null);
  const { ledgerId: sharedLedgerIdFromURL } = useParams();
  const {
    isShared,
    selectedDate,
    setSummary,
    transactions,
    setTransactions,
    error,
    setError,
  } = useOutletContext();
  const [hasLedger, setHasLedger] = useState(true);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  // LedgerPage에서 전달한 상태, 함수 받아오기

  useEffect(() => {
    // 데이터 받아와서 각 컴포넌트(트랜잭션 카드, 헤더 등)에 뿌려주기
    const fetchTransactions = async () => {
      try {
        // 토큰이 없거나 빈 문자열인 경우 에러 메시지 설정
        if (!token || token.trim() === "") {
          // navigate("/login");
          setTransactions([]);
          setSummary({ totalIncome: 0, totalExpense: 0 });
          return;
        }

        let id;

        // 각 LedgerPage, SharedLedgerPage에서 오는 isShared를 사용해 개인/공유 구분
        if (isShared) {
          id = Number(sharedLedgerIdFromURL);
        } else {
          try {
            const personalLedgerId = await getPersonalLedgerId(token);
            id = personalLedgerId.id;
            setHasLedger(true);
          } catch (error) {
            if (error.response?.status === 404) {
              // 가계부 없음
              setHasLedger(false);
              setTransactions([]);
              setSummary({ totalIncome: 0, totalExpense: 0 });
              return;
            } else {
              throw error;
            }
          }
        }

        setLedgerId(id);
        console.log(ledgerId);
        const data = await fetchDailyTransactions(id, selectedDate, token);

        if (!data || !data.transactions) {
          setError("데이터가 없습니다.");
          setTransactions([]);
          setSummary({ totalIncome: 0, totalExpense: 0 });
        } else {
          setTransactions(data.transactions || []);
          setSummary(data.summary);
          setError(null);
        }
      } catch (error) {
        const message = error.response?.data?.message;

        // axios response status를 사용해 토큰이 없는 상태에 따른 에러 메시지 설정
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 404) {
          if (message.includes("입력한 내역이 없습니다.")) {
            setError("데이터가 없습니다.");
          } else {
            setError("데이터를 불러오는 데 실패했습니다.");
          }
        }

        setTransactions([]);
        setSummary({ totalIncome: 0, totalExpense: 0 });
      }
    };

    fetchTransactions();
  }, [isShared, sharedLedgerIdFromURL, selectedDate, token]);

  const handleCreateLedger = async (formData) => {
    try {
      const newLedger = await fetchCreatePersoalLedger(
        formData.token,
        formData.name
      );
      setHasLedger(true);
      setLedgerId(newLedger.id);
      alert("생성 완료");
      setOpen(false);
    } catch (error) {
      setError("가계부 생성에 실패했습니다.");
    }
  };

  return (
    // ledgerheader 반응형으로 줄어들도록 상위 요소 크기 설정
    <div className="max-w-full px-full scrollbar-hidden">
      {/* 에러 상황에 맞게 메시지 출력 */}
      {!hasLedger ? (
        <div className="text-center text-[var(--black70)] mt-10 flex flex-col gap-4 justify-center items-center">
          개인 가계부가 없습니다.
          <button
            onClick={() => {
              document.getElementById("add-personal-ledger-modal").showModal();
            }}
            className="create-ledger px-4 py-2 bg-[var(--accent-color)] cursor-pointer text-white rounded-md transition"
          >
            가계부 만들기
          </button>
          <AddPeronalLedger onSave={handleCreateLedger} />
        </div>
      ) : transactions === null ? (
        <div className="text-center text-[var(--black70)] mt-10">
          로딩 중 ...{" "}
        </div>
      ) : (
        <TransactionCard transactions={transactions} />
      )}
    </div>
  );
}
export default DailyLedger;
