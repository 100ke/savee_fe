import "./../Board.css";
import Pagination from "../Pagination";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QnaDetail from "./QnaDetail";

export default function QnaList({
  data,
  loading,
  error,
  admin,
  currentPage,
  totalPages,
  onPageChange,
  pageParam,
  onRefresh,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleAfterChange = () => {
    if (onRefresh) onRefresh();
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data.length) return <div>게시글이 없습니다.</div>;

  // Hook 호출이 끝난 뒤에 조건부 렌더링(조기 반환)을 해도 안전
  if (error) return <div className="alert alert-danger">{error}</div>;

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index));

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

      <div>
        <table className="table">
          <tbody>
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
                  <td>{post.createdAt?.split("T")[0]}</td>
                  <td>{post.iscommpleted ? "답변완료" : "답변없음"}</td>
                </tr>

                <tr>
                  <td colSpan={5} className="p-0">
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openIndex === idx ? "max-h-96 p-5" : "max-h-0 p-0"
                      }`}
                    >
                      <QnaDetail
                        question={post.question}
                        answer={post.answer}
                      />
                      {/* {admin && (
                        <div className="mt-3">
                          {post.iscommpleted ? (
                            <button onClick={() => handleDeleteAnswer(post.id)}>
                              답변 삭제
                            </button>
                          ) : (
                            <button onClick={() => handleRegister(post.id)}>
                              답변 등록(완료 처리)
                            </button>
                          )}
                        </div>
                      )} */}
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
        onPageChange={onPageChange}
      />
    </section>
  );
}
