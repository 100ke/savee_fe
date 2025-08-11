import { useEffect, useState } from "react";
import { getPersonalLedgerId } from "./TransactionApi";

// 모든 가계부 관련 컴포넌트가 개인/공유 가계부를 같이 사용할 수 있도록
// ledgerId 관리
export const UseLedgerId = (isShared, sharedLedgerId, token) => {
  const [ledgerId, setLedgerId] = useState(null);

  useEffect(() => {
    const fetchLedgerId = async () => {
      if (!token || token.trim() === "") return;

      if (isShared) {
        setLedgerId(sharedLedgerId);
      } else {
        const response = await getPersonalLedgerId(token);
        setLedgerId(response.id);
      }
    };

    fetchLedgerId();
  }, [isShared, sharedLedgerId, token]);

  return ledgerId;
};
