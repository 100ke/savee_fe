import { useLocation, useNavigate, useParams } from "react-router-dom";

function LedgerTab({ isShared }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 개인/공유 가계부에 따라 ledgerId 다르게 설정
  // 공유 가계부라면 파라미터에 ledgerId가 있음
  const { ledgerId } = useParams();

  // 현재 경로에 따라 basePath 설정
  const isSharedRouter = location.pathname.includes("/sharedLedger");
  const basePath =
    isSharedRouter && ledgerId ? `/sharedLedger/${ledgerId}` : "/ledger";

  // 현재 경로에 따라 active 탭 설정
  const activeTab = location.pathname;

  const tabs = [
    { name: "일일", path: `${basePath}` },
    { name: "주간", path: `${basePath}/weekly` },
    { name: "월간", path: `${basePath}/monthly` },
    { name: "목표", path: `${basePath}/goals` },
    ...(isShared ? [{ name: "코멘트", path: `${basePath}/comments` }] : []),
  ];

  return (
    <div>
      <div role="tablist" className="ledger-tab tabs tabs-border mt-[1rem]">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.name}
              role="tab"
              className={`tab ${activeTab === tab.path ? "tab-active" : ""}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
      <hr className="text-[var(--black30)]" />
    </div>
  );
}

export default LedgerTab;
