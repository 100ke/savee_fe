import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  fetchAcceptCodes,
  fetchCreateSharedLedgers,
  fetchGetLedgers,
  fetchGetLedgersByMembership,
  fetchInviteLedgerMembers,
} from "../TransactionApi";
import AddSharedLedger from "../modal/AddSahredLedger";
import SharedLedgerCard from "./SharedLedgerCard";

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

        const updatedLedgers = await fetchGetLedgers(formData.token);
        const shared = updatedLedgers.filter((ledger) => ledger.is_shared);
        setSharedLedgers(shared);
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

      // 리스트 갱신
      await viewSharedLedgers();
    } catch (error) {
      setError("내역을 저장하지 못했습니다.");
    }
  };

  // 공유 가계부 추가 후 화면에 바로 출력
  const viewSharedLedgers = async () => {
    try {
      const ledgers = await fetchGetLedgers(token);
      const shared = ledgers.filter((ledger) => ledger.is_shared);
      const memberLedgers = await fetchGetLedgersByMembership(token);

      // 소유한 가계부 + 참여한 가계부 합치고 중복 제거
      const mergeLedgers = [...shared, ...memberLedgers].filter(
        (ledger, index, self) =>
          index === self.findIndex((l) => l.id === ledger.id)
      );

      setSharedLedgers(mergeLedgers);
    } catch (error) {
      setError("공유 가계부 목록을 가져오지 못했습니다.");
    }
  };

  useEffect(() => {
    // 공유 가계부 생성 및 초대 시 사용 - owner 전용
    const fetchSharedLedgers = async () => {
      try {
        const ledgers = await fetchGetLedgers(token);
        const shared = ledgers.filter((ledger) => ledger.is_shared);
        setSharedLedgers(shared);
      } catch (error) {
        setError("공유 가계부 목록을 가져오지 못했습니다.");
      }
    };

    // 공유 가계부에 참여한 멤버 전용
    const fetchMembershipLedgers = async () => {
      try {
        const memberLedgers = await fetchGetLedgersByMembership(token);
        setSharedLedgers(memberLedgers);
      } catch (error) {
        setError("공유 가계부 목록을 가져오지 못했습니다.");
      }
    };

    fetchSharedLedgers();
    fetchMembershipLedgers();
  }, [token, navigate]);

  return (
    <div className="shared-ledgers-list p-6 flex">
      <SharedLedgerCard sharedLedgers={sharedLedgers}>
        <div
          onClick={() => {
            document.getElementById("add-shared-ledger-modal").showModal();
          }}
          className="add-shared-ledger bg-[var(--color-sub3-40)] w-50 h-70 rounded-[1.5rem] shadow-lg cursor-pointer flex justify-center items-center"
        >
          <button className="add-ledgers text-3xl text-[var(--main-color-dark)] bg-[var(--color-sub3)] p-4 rounded-full w-17 cursor-pointer">
            +
          </button>
        </div>
      </SharedLedgerCard>
      <AddSharedLedger onSave={handleSave} sharedLedgers={sharedLedgers} />
    </div>
  );
}
