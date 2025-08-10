import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LedgerTab() {
  // 클릭할 때마다 값이 바뀌어야 함
  // const [activeTab, setActiveTab] = useState("일일");
  // const handleTabClick = (tabName) => {
  //   setActiveTab(tabName);
  // };

  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로에 따라 active 탭 설정
  const activeTab = location.pathname;

  const tabs = [
    { name: "일일", path: "/ledger" },
    { name: "주간", path: "/ledger/weekly" },
    { name: "월간", path: "/ledger/monthly" },
    { name: "목표", path: "/ledger/goals" },
    { name: "코멘트", path: "/ledger/comments" },
  ];

  return (
    <div>
      <div role="tablist" className="ledger-tab tabs tabs-border mt-[1rem]">
        {tabs.map((tab) => {
          return (
            <a
              key={tab.name}
              role="tab"
              className={`tab ${activeTab === tab.path ? "tab-active" : ""}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.name}
            </a>
          );
        })}
      </div>
      <hr className="text-[var(--black30)]" />
    </div>
  );
}

export default LedgerTab;
