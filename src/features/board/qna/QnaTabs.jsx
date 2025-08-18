import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function QnaTab({ category }) {
  // 클릭할 때마다 값이 바뀌어야 함
  // const [activeTab, setActiveTab] = useState("일일");
  // const handleTabClick = (tabName) => {
  //   setActiveTab(tabName);
  // };

  const location = useLocation();
  // const navigate = useNavigate();

  // 현재 경로에 따라 active 탭 설정
  // const activeTab = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    { name: "전체", qna_type: "" },
    { name: "로그인", qna_type: "로그인" },
    { name: "가계부", qna_type: "가계부" },
    { name: "소비분석", qna_type: "소비분석" },
    { name: "에러", qna_type: "에러" },
    { name: "유저", qna_type: "유저" },
    { name: "기타", qna_type: "기타" },
  ];
  const currentQnaType = searchParams.get("qna_type") || "";
  const onTabClick = (qna_type) => {
    const newParams = new URLSearchParams(searchParams);

    if (qna_type) {
      newParams.set("qna_type", qna_type);
    } else {
      newParams.delete("qna_type");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };
  return (
    <div>
      <div role="tablist" className="tabs tabs-border mt-[1rem]">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.name}
              role="tab"
              className={`tab ${
                currentQnaType === tab.qna_type ? "tab-active" : ""
              }`}
              onClick={() => onTabClick(tab.qna_type)}
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
