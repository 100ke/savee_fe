import "./../Board.css";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosInstance";
import { getSupportPosts } from "../SupportApi";
const ITEMS_PER_PAGE = 6;
export default function SupportList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const page = searchParams.get("page") || 1;

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(pageParam); // 쿼리 변경될 때 state도 갱신
  }, [pageParam]);
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const data = await getSupportPosts(page, ITEMS_PER_PAGE);
      console.log("응답 내용:", data);

      const posts = data.data.posts;
      const pagination = data.data.pagination;
      console.log(pagination);
      setPosts(posts || []);

      //페이지네이션
      setTotalPages((pagination && pagination.totalPages) || 1);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (error) return <div className="alert alert-danger">{error}</div>;
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-xl text-center">공지사항</h1>
      <div className="join gap-2 justify-center">
        <div>
          <div>
            <input
              className="input join-item rounded-box w-120"
              placeholder="검색어를 입력하세요."
            />
          </div>
        </div>
        <div className="indicator">
          <button className="btn join-item custom-search-btn rounded-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <button
          className="btn join-item custom-search-btn rounded-box text-white"
          onClick={() => navigate(`/support/add`)}
        >
          등록
        </button>
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
            {posts.map((post, idx) => (
              <tr
                key={post.id}
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/support/${post.id}?page=${currentPage}`)
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
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
}
