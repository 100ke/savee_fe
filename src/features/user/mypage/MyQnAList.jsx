import React, { useEffect, useState } from "react";
import { getMyQnAList } from "../userApi";
import QnaTab from "../../board/qna/QnaTabs";
import QnaList from "../../board/qna/QnaList";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../board/Search";
const ITEMS_PER_PAGE = 6;
function MyQnAList() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  // 커스텀 훅은 무조건 최상단에서 호출
  const {
    data = [],
    searchKeyword,
    setSearchKeyword,
    admin,
    currentPage,
    loading,
    error,
    handleSearch,
    handlePageChange,
    totalPages,
    pageParam,
    category,
    setSearchParams,
  } = useSearch(getMyQnAList, refreshFlag, ITEMS_PER_PAGE);

  const handleRefresh = () => {
    setSearchParams({
      page: "1",
      keyword: "", // 필요에 따라 초기화
      qna_type: "", // 카테고리도 전체로 초기화
    });
    setRefreshFlag((prev) => !prev); // 값 토글 → QnaList에서 useEffect로 감지
  };

  const filteredData =
    category && category !== ""
      ? data.filter((post) => post.qna_type === category)
      : data;

  return (
    <section className="flex flex-col gap-6 mb-10 w-3/4">
      <h1 className="text-3xl">내가 작성한 질문</h1>
      <div className="flex flex-col gap-1">
        <QnaTab category={category} />
        <QnaList
          data={filteredData}
          loading={loading}
          error={error}
          admin={admin}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          refreshFlag={refreshFlag} // 선택적, 필요에 따라 사용
          pageParam={pageParam}
          onRefresh={() => setRefreshFlag((prev) => !prev)}
        ></QnaList>
      </div>
    </section>
  );
}

export default MyQnAList;
