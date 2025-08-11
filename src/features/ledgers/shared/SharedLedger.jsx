import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  fetchAcceptCodes,
  fetchCreateSharedLedgers,
  fetchGetLedgers,
  fetchInviteLedgerMembers,
} from "../TransactionApi";
import AddSharedLedger from "../modal/AddSahredLedger";

export default function SharedLedger() {
  const [sharedLedgers, setSharedLedgers] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { error, setError } = useOutletContext();
  const [open, setOpen] = useState(false);

  const handleSave = async (formData) => {
    try {
      if (formData.name) {
        await fetchCreateSharedLedgers(formData.name, formData.token);
        alert("공유 가계부 생성 완료");
        setOpen(true);
      }

      if (formData.email) {
        await fetchInviteLedgerMembers(
          formData.ledgerId,
          formData.token,
          formData.email
        );
        alert("멤버 초대 완료");
        setOpen(false);
      }

      if (formData.code) {
        await fetchAcceptCodes(
          formData.ledgerId,
          formData.token,
          formData.code,
          formData.email
        );
      }
    } catch (error) {
      setError("내역을 저장하지 못했습니다.");
    }
  };

  useEffect(() => {
    if (
      !token ||
      token.trim() === "" ||
      token === "null" ||
      token === "undefined"
    ) {
      navigate("/login");
      setSharedLedgers(null);
      return;
    }

    const fetchSharedLedgers = async () => {
      try {
        const ledgers = await fetchGetLedgers(token);
        const shared = ledgers.filter((ledger) => ledger.is_shared);
        setSharedLedgers(shared);
      } catch (error) {
        setError("공유 가계부 목록을 가져오지 못했습니다.");
      }
    };

    fetchSharedLedgers();
  }, [token, navigate]);

  if (
    !token ||
    token.trim() === "" ||
    token === "null" ||
    token === "undefined"
  ) {
    return null; // 렌더링 차단
  }

  const handleLedgerClick = (ledgerId) => {
    navigate(`/sharedLedger/${ledgerId}`);
  };

  return (
    <div className="shared-ledgers-list p-6">
      <div className="shared-ledger grid grid-cols-3 gap-4">
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
      <div
        onClick={() => {
          document.getElementById("add-shared-ledger-modal").showModal();
        }}
        className="add-shared-ledger bg-[var(--color-sub3-40)] w-50 h-70 rounded-[1rem] cursor-pointer flex justify-center items-center"
      >
        <button className="add-ledgers text-3xl text-[var(--main-color-dark)] bg-[var(--color-sub3)] p-4 rounded-full w-17 cursor-pointer">
          +
        </button>
      </div>
      <AddSharedLedger onSave={handleSave} sharedLedgers={sharedLedgers} />
    </div>
  );
}
