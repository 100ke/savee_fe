import "./../Board.css";
import Pagination from "../Pagination";
import useSearch from "../Search";
import { useNavigate } from "react-router-dom";
import SupportSearchBar from "../searchBar/SupportSearchBar";
import { getSupportPosts } from "../SupportApi";
import SupportList from "./SupportList";
const ITEMS_PER_PAGE = 6;
export default function SupportListMain() {
  const navigate = useNavigate();
  const {
    data,
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
  } = useSearch(getSupportPosts, undefined, ITEMS_PER_PAGE);
  if (error) return <div className="alert alert-danger">{error}</div>;
  // console.log(data);
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-xl text-center">공지사항</h1>
      <div className="join gap-2 justify-center">
        <SupportSearchBar
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
          handleSearch={handleSearch}
        ></SupportSearchBar>

        {admin && (
          <button
            className="btn join-item custom-search-btn rounded-box text-white"
            onClick={() => navigate(`/support/add`)}
          >
            등록
          </button>
        )}
      </div>
      <SupportList
        data={data}
        searchKeyword={searchKeyword}
        currentPage={currentPage}
        onTh={true}
        compact={false}
      ></SupportList>
      <Pagination
        totalPages={totalPages}
        currentPage={pageParam}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
}
