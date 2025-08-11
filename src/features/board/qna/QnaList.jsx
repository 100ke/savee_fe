import "./../Board.css";
import Pagination from "../Pagination";
import Search from "../Search";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQnaPosts } from "../QnaApi";
import QnaDetail from "./QnaDetail";
export default function QnaList() {
  const [openIndex, setOpenIndex] = useState(null);
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
  } = Search(getQnaPosts);
  if (error) return <div className="alert alert-danger">{error}</div>;
  console.log(data);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // 이미 열려있으면 닫기
    } else {
      setOpenIndex(index); // 열기
    }
  };
  return (
    <section className="flex flex-col gap-5">
      <div className="join gap-2 justify-center">
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
          <tbody>
            {/* row 1 */}
            <colgroup>
              <col className="1/4" />
              <col className="1/4" />
              <col className="1/4" />
              <col className="1/4" />
            </colgroup>
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
                </tr>
                <tr>
                  <td colSpan={4} className="p-0">
                    <div
                      className={`overflow-hidden transition-all duration-20 ${
                        openIndex === idx ? "max-h-96 p-5" : "max-h-0 p-0"
                      }`}
                    >
                      <QnaDetail content={post.question} />
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
