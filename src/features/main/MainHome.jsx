import { useEffect, useState } from "react";
import { getUserInfo } from "../user/userApi";
import MainButton from "./Button";
export default function Main() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const btns = [{ color: "--accent-color", label: "지출 입력", icon: "+" }];
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
      <div>
        {btns.map((btn, idx) => (
          <MainButton
            key={idx}
            color={btn.color}
            label={btn.label}
            icon={btn.icon}
          ></MainButton>
        ))}
      </div>
    </div>
  );
}
