import "./../Board.css";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;
export default function Support() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`/support`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${token}`,
        },
      });

      const data = await response.json(); // 임시로 JSON 대신 text

      // console.log("응답 내용:", data);

      if (!response.ok) {
        throw new Error(data.message || "게시글을 불러오는데 실패했습니다.");
      }
      const posts = data.data.posts;
      console.log(posts);
      setPosts(data.data.posts || []);
      setTotalPages(
        (data.data.pagination && data.data.pagination.totalPages) || 1
      );
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
    <div className="flex justify-center w-3/4 flex-col">
      <section className="flex flex-col gap-6 mb-10">
        <h1 className="text-xl text-center">고객센터</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="card basis-1/2 custom-card1 rounded-box h-32 grow gap-3 justify-center p-10 shadow-md">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              02-000-0000
            </p>

            <a href="mailto:savee@savee.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              savee@savee.com
            </a>
          </div>
          <div className="card basis-1/2 cursor-pointer custom-card2 border rounded-box grid h-32 grow place-items-center shadow-md">
            <p>Qna</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
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
                  className="cursor-pointer"
                  onClick={() => navigate(`/support/${post.id}`)}
                >
                  <th>{post.post_type}</th>
                  <td>{post.title}</td>
                  <td>{post.createdAt.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination></Pagination>
      </section>
    </div>
  );
}
