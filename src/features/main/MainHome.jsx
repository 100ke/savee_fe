import { useEffect, useState } from "react";
import { getUserInfo } from "../user/userApi";
import MainButton from "./Button";
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
      label: "소비 입력",
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
    <div className="flex flex-col justify-center gap-2 w-3/4">
      <h1>
        {isLoggedIn ? (
          <p>
            <span className="text-[var(--accent-color)] font-bold">
              {userName}
            </span>{" "}
            님의 가계부
          </p>
        ) : (
          <p>환영합니다. Savee입니다. 로그인 후 이용해주세요.</p>
        )}
      </h1>
      <hr className="w-full" />
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
    </div>
  );
}
