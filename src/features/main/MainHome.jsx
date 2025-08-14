import { useEffect, useState } from "react";
import { getUserInfo } from "../user/userApi";
import MainButton from "./Button";
import MainStats from "./MainStats"
import MainAnalysis from "./MainAnalysis";
import MainSurpports from "./MainSupport";
import MainTransaction from "./MainTransaction";
export default function Main() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const btns = [
    {
      bgColor: "var(--accent-color)",
      borderColor: "var(--accent-color)",
      label: "지출 입력",
      icon: "+",
      color: "white",
    },
    {
      bgColor: "var(--main-color)",
      borderColor: "var(--main-color)",
      label: "소비 입력",
      icon: "+",
      color: "white",
    },
    {
      bgColor: "white",
      borderColor: "var(--main-color)",
      label: "내 가계부",
      icon: ">",
      color: "var(--main-color)",
      amount: "1000",
    },
    {
      bgColor: "white",
      borderColor: "var(--accent-color)",
      label: "공유 가계부",
      icon: ">",
      color: "var(--accent-color)",
      amount: "1000",
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

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
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;
  return (
    <div className="flex flex-col justify-center gap-6 w-3/4">
      <div>
      <h1>
        {isLoggedIn ? (
          <p>
            <span className="text-[var(--accent-color)] font-bold">
              {userName}
            </span>{" "}
            님의 가계부
          </p>
        ) : (
          <button className="font-semibold cursor-pointer ml-2">환영합니다. Savee 입니다. 로그인 후 이용해주세요. <span className="text-[var(--main-color)] font-bold ml-1">&gt;</span></button>
        )}
      </h1>
      <hr className="w-full" />
      </div>
      <div className="flex flex-row gap-5">
      <div className="w-2/4 flex flex-wrap">
        {btns.map((btn, idx) => (
          <MainButton
            key={idx}
            bgColor={btn.bgColor}
            borderColor={btn.borderColor}
            label={btn.label}
            icon={btn.icon}
            color={btn.color}
            amount={btn.amount}
          ></MainButton>
        ))}
      </div>
      <MainStats></MainStats>
      </div>
      <MainAnalysis></MainAnalysis>
      <div className="flex flex-wrap">
        <MainSurpports></MainSurpports>
        <MainTransaction></MainTransaction>
      </div>
    </div>
  );
}
