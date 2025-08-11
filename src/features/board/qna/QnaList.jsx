import "./../Board.css";
import Pagination from "../Pagination";
import Search from "../Search";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQnaPosts } from "../QnaApi";
import QnaDetail from "./QnaDetail";
import QnaModal from "./QnaModal";
export default function QnaList({ refreshFlag }) {
  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();
  //조회 데이터
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
  } = Search(getQnaPosts);
  if (error) return <div className="alert alert-danger">{error}</div>;

  useEffect(() => {
    handleSearch();
  }, [refreshFlag]);

  //토글
  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // 이미 열려있으면 닫기
    } else {
      setOpenIndex(index); // 열기
    }
  };

  //답변 등록
  const handleRegister = async (id) => {
    try {
      await fetch(`/:id/answer`, { method: "PATCH" });
      handleSearch(); // 데이터 다시 로드
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="flex flex-col gap-5">
      <div className="join gap-2 justify-center">
        {admin && (
          <button
            className="btn join-item custom-search-btn rounded-box text-white"
            onClick={() => navigate(`/qna/add`)}
          >
            등록
          </button>
        )}
      </div>

      <div className="">
        <table className="table">
          <tbody>
            {/* row 1 */}

            {data.map((post, idx) => (
              <React.Fragment key={post.id}>
                <tr
                  className="accordion-title cursor-pointer accordion-item"
                  onClick={() => toggle(idx)}
                >
                  <td>
                    <span className="text-[var(--accent-color)] text-lg">
                      Q
                    </span>
                  </td>
                  <td>
                    <div className="bg-[var(--accent-color)] p-1 text-center w-15 text-xs rounded-box text-white">
                      {post.qna_type}
                    </div>
                  </td>
                  <td>{post.title}</td>
                  <td>{post.createdAt.split("T")[0]}</td>
                  {console.log(post.iscommpleted)}
                  <td>{post.iscommpleted ? "답변완료" : "답변없음"}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-0">
                    <div
                      className={`overflow-hidden transition-all duration-20 ${
                        openIndex === idx ? "max-h-96 p-5" : "max-h-0 p-0"
                      }`}
                    >
                      <QnaDetail
                        question={post.question}
                        answer={post.answer}
                      />
                    </div>
                  </td>
                </tr>
              </React.Fragment>
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
