import QnaTab from "./QnaTabs";
import QnaList from "./QnaList";
import QnaSearchBar from "../searchBar/QnaSearchBar";
import { useState } from "react";
import QnaModal from "./QnaModal";

const [refreshFlag, setRefreshFlag] = useState(false);
const handleRefresh = () => {
  setRefreshFlag((prev) => !prev); // 값 토글 → QnaList에서 useEffect로 감지
};
export default function QnaMain() {
  return (
    <div className="pb-10">
      <section className="flex flex-col gap-6 mb-7">
        <h1 className="text-xl text-center">Qna</h1>
        <QnaModal onRegistered={handleRefresh}></QnaModal>
        <div className="flex flex-col gap-6">
          {/* <QnaSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            handleSearch={handleSearch}
          ></QnaSearchBar> */}
          <QnaTab></QnaTab>
          <QnaList refreshFlag={refreshFlag}></QnaList>
        </div>
      </section>
    </div>
  );
}
