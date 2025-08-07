import { useState } from "react";

function LedgerTab() {
  // 클릭할 때마다 값이 바뀌어야 함
  const [activeTab, setActiveTab] = useState("일일");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div>
      <div role="tablist" className="tabs tabs-border mt-[1rem]">
        <a
          role="tab"
          className={`tab ${activeTab === "일일" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("일일")}
        >
          일일
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "주간" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("주간")}
        >
          주간
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "월간" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("월간")}
        >
          월간
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "목표" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("목표")}
        >
          목표
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "코멘트" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("코멘트")}
        >
          코멘트
        </a>
      </div>
      <hr className="text-[var(--black30)]" />
    </div>
  );
}

export default LedgerTab;
