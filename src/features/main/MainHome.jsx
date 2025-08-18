import { useEffect, useState, useRef } from "react";
import { getUserInfo } from "../user/userApi";
import MainButton from "./Button";
import MainStats from "./MainStats";
import MainAnalysis from "./MainAnalysis";
import MainSurpports from "./MainSupport";
import MainTransaction from "./MainTransaction";
import { useNavigate } from "react-router-dom";

import AddTransactions from "../ledgers/modal/AddTransactions";

import {
  fetchCreatePersoalLedger,
  fetchCreateTransactions,
  fetchGetLedgers,
} from "../ledgers/TransactionApi";
import AddPeronalLedger from "../ledgers/modal/AddPersonalLedger";
export default function Main() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTabType, setModalTabType] = useState("expense");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [ledgers, setLedgers] = useState(null);
  const [hasLedger, setHasLedger] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (token) {
          const userInfo = await getUserInfo();
          setIsLoggedIn(true);
          // console.log(userInfo.name);
          setUserName(userInfo.name);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGetLedgers(token);
        setLedgers(data);
      } catch (error) {
        setError("내역을 저장하지 못했습니다.");
      }
    };

    load();
  }, []);
  useEffect(() => {
    if (open) {
      document.getElementById("add-transactions-modal")?.showModal();
    }
  }, [open]);
  const handleAddTransactions = async (tabType) => {
    console.log("a");
    setModalTabType(tabType); // 버튼에서 tabType 전달
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      await fetchCreateTransactions(
        formData.ledgerId,
        formData.token,
        formData.type,
        formData.memo,
        formData.amount,
        formData.date,
        formData.categoryId
      );
      alert("저장 완료");
      setOpen(false);
    } catch (error) {
      setError("내역을 저장하지 못했습니다.");
    }
  };

  const handleCreateLedger = async (formData) => {
    try {
      const newLedger = await fetchCreatePersoalLedger(
        formData.token,
        formData.name
      );

      setHasLedger(true);
      alert("생성 완료");
    } catch (error) {
      setError("가계부 생성에 실패했습니다.");
    }
  };

  const btns = [
    {
      bgColor: "var(--accent-color)",
      borderColor: "var(--accent-color)",
      label: "수입 입력",
      icon: "+",
      color: "white",
      tabType: "income",
    },
    {
      bgColor: "var(--main-color)",
      borderColor: "var(--main-color)",
      label: "지출 입력",
      icon: "+",
      color: "white",
      tabType: "expense",
    },
    {
      bgColor: "white",
      borderColor: "var(--main-color)",
      label: "내 가계부",
      icon: ">",
      color: "var(--main-color)",
      tabType: "",
      amount: "1000",
      link: "/ledger",
    },
    {
      bgColor: "white",
      borderColor: "var(--accent-color)",
      label: "공유 가계부",
      icon: ">",
      color: "var(--accent-color)",
      tabType: "",
      amount: "1000",
      link: "/sharedLedger",
    },
  ];
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;
  return (
    <div className="flex flex-col justify-center gap-6 w-3/4">
      <>
        <div>
          <h1 className="mb-1">
            {isLoggedIn ? (
              <p>
                <span className="text-[var(--accent-color)] font-bold">
                  {userName}
                </span>{" "}
                님의 가계부
              </p>
            ) : (
              <button
                className="font-semibold cursor-pointer ml-2 mb-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                환영합니다. Savee 입니다. 로그인 후 이용해주세요.{" "}
                <span className="text-[var(--main-color)] font-bold ml-1">
                  &gt;
                </span>
              </button>
            )}
          </h1>
          <hr className="w-full" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="w-1/2 flex flex-wrap">
            {btns.map((btn, idx) => (
              <MainButton
                key={idx}
                bgColor={btn.bgColor}
                borderColor={btn.borderColor}
                label={btn.label}
                icon={btn.icon}
                color={btn.color}
                amount={btn.amount}
                handleClick={
                  btn.tabType
                    ? () => handleAddTransactions(btn.tabType)
                    : () => navigate(btn.link)
                }
              />
            ))}
          </div>
          <MainStats />
        </div>
        <MainAnalysis />
        <div className="flex flex-wrap">
          <MainSurpports />
          <MainTransaction setHasLedgerInParent={setHasLedger} />
        </div>
        {modalOpen && (
          <AddTransactions
            ledgers={ledgers}
            onSave={handleSave}
            tabType={modalTabType}
            onClose={() => setModalOpen(false)}
            open={modalOpen}
          />
        )}
      </>
    </div>
  );
}
