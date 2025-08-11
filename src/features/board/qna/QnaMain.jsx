import QnaTab from "./QnaTabs";
import QnaList from "./QnaList";
import QnaSearchBar from "../searchBar/QnaSearchBar";
import React, { useEffect, useState } from "react";
import QnaModal from "./QnaModal";
import { getQnaPosts } from "../QnaApi";
import useSearch from "../Search";

export default function QnaMain() {
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
  } = useSearch(getQnaPosts, refreshFlag);
  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev); // 값 토글 → QnaList에서 useEffect로 감지
  };
  return (
    <div className="pb-10 overflow-auto">
      <section className="flex flex-col gap-6 mb-7">
        <h1 className="text-xl text-center">Qna</h1>
        <QnaModal onRegistered={handleRefresh}></QnaModal>
        <div className="flex flex-col gap-6">
          <QnaSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            handleSearch={handleSearch}
            category={category}
          ></QnaSearchBar>
          <QnaTab category={category}></QnaTab>
          <QnaList
            data={data}
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
    </div>
  );
}
