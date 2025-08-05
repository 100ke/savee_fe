import { useEffect, useState } from "react";

function TransactionCard() {
  const [error, setError] = useState(null);
  const [ledgerId, setLedgerId] = useState(1);
  const [transaction, setTransaction] = useState(null);
  const token = process.env.REACT_APP_TOKEN;

  const fetchTransactions = async () => {
    try {
      const ledId = Number(ledgerId);
      const response = await fetch(`ledgers/${ledgerId}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transaction = await response.json();
      console.log(transaction);
      setTransaction(transaction);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [ledgerId]);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 transacinfo text-xs opacity-60 tracking-wide">
        {transaction.date}
      </li>

      <li className="list-row transac-card">
        <div className="p-4 pb-2 transacinfo text-xs opacity-60 tracking-wide">
          Most played songs this week
        </div>

        <div className="list-col-grow">
          <div>Dio Lupa</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            Remaining Reason
          </div>
        </div>
      </li>
    </ul>
  );
}

export default TransactionCard;
