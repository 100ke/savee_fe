import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { isAdmin } from "./SupportApi";

export default function useSearch(fetchFunction, refreshFlag, items_amount) {
  const [data, setData] = useState([]); // 게시글 리스트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지 저장
  const [admin, setAdmin] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const ITEMS_PER_PAGE = items_amount;
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리에서 page 값을 받아서 숫자로 변환, 없으면 기본 1
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const keywordParam = searchParams.get("keyword") || "";
  const categoryParam = searchParams.get("qna_type") || "";
  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts(pageParam, keywordParam);
    }
  }, [location.state]);

  useEffect(() => {
    setSearchKeyword(keywordParam);
    setCurrentPage(pageParam);
    fetchPosts(pageParam, keywordParam, categoryParam);
  }, [keywordParam, pageParam, refreshFlag, categoryParam]);

  useEffect(() => {
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [searchParams]);

  // admin 여부 체크
  useEffect(() => {
    async function checkAdmin() {
      const result = await isAdmin();
      setAdmin(result);
    }
    checkAdmin();
  }, []);
  // console.log("admin", admin);

  // 게시글 불러오는 함수 (페이지 번호 인자 받음)
  const fetchPosts = async (page, keyword = "", category = "") => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetchFunction(
        page,
        ITEMS_PER_PAGE,
        keyword,
        category
      );
      const { pagination, data } = response.data;

      setData(Array.isArray(data) ? data : []);

      // console.log(pagination);
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
    setSearchParams({
      page: "1",
      keyword: searchKeyword,
      qna_type: categoryParam,
    });
  };
  // 페이지 변경 함수: 페이지 버튼 클릭 시 실행됨
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // URL 쿼리 파라미터를 바꿔서 주소도 바뀌도록 함
      setSearchParams(
        {
          page: newPage.toString(),
          keyword: searchKeyword,
          qna_type: categoryParam,
        },
        { replace: true }
      );
      // currentPage는 useEffect에서 쿼리 파라미터 변화를 감지해서 변경됨
    }
  };
  return {
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
    category: categoryParam,
    setSearchParams,
  };
}
