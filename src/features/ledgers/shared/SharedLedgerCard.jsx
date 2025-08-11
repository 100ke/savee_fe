export default function SharedLedgerCard({ sharedLedgers, onClick }) {
  return (
    <div className="shared-ledger grid grid-cols-3 gap-4">
      {sharedLedgers.map((ledger) => (
        <div
          key={ledger.id}
          className="card bg-[var(--main-color)] w-96 shadow-sm cursor-pointer hover:bg-[var(--main-color-light)] transition"
          onClick={() => onClick && onClick(ledger.id)}
        >
          <div className="card-body">
            <h2 className="card-title">{ledger.name}</h2>
            <p>{ledger.description || "설명이 없습니다."}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-sm">이동</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
