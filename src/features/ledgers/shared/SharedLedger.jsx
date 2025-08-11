import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetLedgers } from "../TransactionApi";

export default function SharedLedger() {
  const [sharedLedgers, setSharedLedgers] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedLedgers = async () => {
      try {
        const ledgers = await fetchGetLedgers(token);
        const shared = ledgers.filter((ledger) => ledger.is_shared);
        setSharedLedgers(shared);
      } catch (error) {
        alert("공유 가계부 목록을 가져오지 못했습니다.");
      }
    };

    fetchSharedLedgers();
  }, [token]);

  const handleLedgerClick = (ledgerId) => {
    navigate(`/sharedLedger/${ledgerId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">공유 가계부 선택</h2>
      <div className="grid grid-cols-3 gap-4">
        {sharedLedgers.map((ledger) => (
          <div
            key={ledger.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleLedgerClick(ledger.id)}
          >
            <h3 className="font-bold text-lg">{ledger.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
