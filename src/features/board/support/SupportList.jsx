import "./../Board.css";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "../../../api/axiosInstance";
import { getSupportPosts, isAdmin } from "../SupportApi";
const ITEMS_PER_PAGE = 6;
export default function SupportList() {
  const [posts, setPosts] = useState([]); // 게시글 리스트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지 저장
  const [admin, setAdmin] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  // URL 쿼리 파라미터 읽기/쓰기 (page)
  const [searchParams, setSearchParams] = useSearchParams();
  // 쿼리에서 page 값을 받아서 숫자로 변환, 없으면 기본 1
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const keywordParam = searchParams.get("keyword") || "";
  // console.log("파람페이지", pageParam);
  // console.log("현재페이지", currentPage);
  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts();
    }
  }, [location.state]);
  useEffect(() => {
    setSearchKeyword(keywordParam);
    fetchPosts(pageParam, keywordParam);
  }, [keywordParam, pageParam]);
  useEffect(() => {
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [searchParams]);

  // 쿼리 파라미터가 바뀌면 currentPage 상태도 업데이트

  // currentPage가 바뀌면 해당 페이지 게시글을 가져옴
  useEffect(() => {
    async function checkAdmin() {
      const result = await isAdmin();
      setAdmin(result);
    }
    checkAdmin();
  }, []);
  // console.log("admin", admin);
  useEffect(() => {
    setSearchKeyword(keywordParam);
    fetchPosts(pageParam, keywordParam);
  }, [keywordParam, pageParam]);

  // 게시글 불러오는 함수 (페이지 번호 인자 받음)
  const fetchPosts = async (page, keyword = "") => {
    setLoading(true); // 로딩 시작
    try {
      // API 호출 - 페이지와 페이지당 게시글 수 전달
      const data = await getSupportPosts(page, ITEMS_PER_PAGE, keyword);
      // console.log("응답 내용:", data);

      const posts = data.data.posts; // 게시글 데이터
      const pagination = data.data.pagination; // 페이지네이션 정보
      console.log(pagination);
      setPosts(posts || []); // 게시글 상태 업데이트

      // 페이지네이션 총 페이지 수 업데이트
      setTotalPages((pagination && pagination.totalPages) || 1);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는데 실패했습니다."); // 에러 상태 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  const handleSearch = () => {
    setCurrentPage(1);
    setSearchParams({ page: "1", keyword: searchKeyword });
  };
  // 페이지 변경 함수: 페이지 버튼 클릭 시 실행됨
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // URL 쿼리 파라미터를 바꿔서 주소도 바뀌도록 함
      setSearchParams(
        { page: newPage.toString(), keyword: searchKeyword },
        { replace: true }
      );
      // currentPage는 useEffect에서 쿼리 파라미터 변화를 감지해서 변경됨
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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
        <div className="indicator">
          <button
            className="btn join-item custom-search-btn rounded-box"
            onClick={handleSearch}
          >
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
            {posts.map((post, idx) => (
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
