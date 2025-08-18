import { useEffect, useState } from "react";
import SupportList from "../board/support/SupportListMain";
import TransactionCard from "../ledgers/daily/TransactionCard";
import {
  fetchDailyTransactions,
  getPersonalLedgerId,
} from "../ledgers/TransactionApi";

export default function MainTransaction({ setHasLedgerInParent }) {
  const [ledgerId, setLedgerId] = useState("");
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const token = localStorage.getItem("accessToken");
  const [hasLedger, setHasLedger] = useState(true);

  useEffect(() => {
    const now = new Date().toLocaleDateString("sv-SE").split("T")[0];
    console.log(now);
    setDate(now);
  }, []);
  useEffect(() => {
    const getLedger = async (token) => {
      const ledger = await getPersonalLedgerId(token);

      if (!ledger) {
        setHasLedger(false);
        setHasLedgerInParent(false);
        return;
      }

      // console.log(ledger.id);
      setHasLedger(true);
      setHasLedgerInParent(true);
      setLedgerId(ledger.id);
    };
    getLedger(token);
  }, [token]);

  useEffect(() => {
    if (!ledgerId) return;
    const getTransactions = async () => {
      try {
        const currentDate = new Date(date);
        console.log(date);
        const { transactions, summary } = await fetchDailyTransactions(
          ledgerId,
          currentDate,
          token
        );
        const todaysTransactions = transactions.filter((t) => t.date === date);
        setData(todaysTransactions);
        // console.log(transactions);
        // console.log(todaysTransactions);
      } catch (err) {
        console.error("트랜잭션 불러오기 실패:", err);
      }
    };
    getTransactions();
  }, [ledgerId, date, token]);

  return (
    <div className="w-2/4 h-[200px]">
      <div className="w-full h-full overflow-auto">
        <TransactionCard transactions={data} />
      </div>
    </div>
  );
}
