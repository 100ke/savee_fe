import "./../Board.css";
import Pagination from "../Pagination";
import Search from "../Search";
import { useNavigate } from "react-router-dom";
import SupportSearchBar from "../searchBar/SupportSearchBar";
import { getSupportPosts } from "../SupportApi";
export default function SupportList() {
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
  } = Search(getSupportPosts);
  if (error) return <div className="alert alert-danger">{error}</div>;
  console.log(data);
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

      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="w-1/5">분류</th>
              <th className="w-3/5">제목</th>
              <th className="w-1/5">날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((post, idx) => (
              <tr
                key={post.id}
                className="cursor-pointer"
                onClick={() =>
                  navigate(
                    `/support/${post.id}?page=${currentPage}&keyword=${searchKeyword}`
                  )
                }
              >
                <th>{post.post_type}</th>
                <td>{post.title}</td>
                <td>{post.createdAt.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={pageParam}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
}
