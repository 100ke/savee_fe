import { useEffect, useState } from "react";
import SupportList from "../board/support/SupportListMain";
import TransactionCard from "../ledgers/daily/TransactionCard";
import {
  fetchDailyTransactions,
  getPersonalLedgerId,
} from "../ledgers/TransactionApi";
export default function MainTransaction() {
  const [ledgerId, setLedgerId] = useState("");
  const token = localStorage.getItem("accessToken");
  const today = new Date();
  useEffect(() => {
    const getLedger = async (token) => {
      const ledger = await getPersonalLedgerId(token);

      console.log(ledger.id);
      setLedgerId(ledger.id);
    };
    getLedger(token);
  }, [token]);

  useEffect(() => {
    if (!ledgerId) return;
    const getTransactions = async () => {
      const data = await fetchDailyTransactions(ledgerId, today, token);
      console.log(data);
    };
    getTransactions();
  }, [ledgerId, today, token]);

  return (
    <div className="w-2/4">
      <TransactionCard></TransactionCard>
    </div>
  );
}
