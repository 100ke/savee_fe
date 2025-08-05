import LedgerHeader from "../features/ledgers/LedgerHeader";
import LedgerTab from "../features/ledgers/LedgerTab";
import TransactionCard from "../features/ledgers/transaction/TransactionCard";

function DailyLedger() {
  return (
    // ledgerheader 반응형으로 줄어들도록 상위 요소 크기 설정
    <div className="max-w-full px-full">
      <LedgerHeader />
      <LedgerTab />
      <TransactionCard />
    </div>
  );
}

export default DailyLedger;
