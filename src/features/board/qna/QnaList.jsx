import "./../Board.css";
import Pagination from "../Pagination";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import QnaDetail from "./QnaDetail";
import { updateanswer } from "../QnaApi";

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

  // const navigate = useNavigate();

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data.length) return <div>게시글이 없습니다.</div>;

  // Hook 호출이 끝난 뒤에 조건부 렌더링(조기 반환)을 해도 안전
  if (error) return <div className="alert alert-danger">{error}</div>;

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  const handleAnswerSubmit = async (id, answer) => {
    try {
      await updateanswer(id, answer);
      onRefresh();
    } catch (error) {
      console.error();
    }
  };
  return (
    <section className="flex flex-col gap-3 overflow-auto scrollbar-hidden max-h-[500px]">
      <div>
        <table className="table">
          <tbody>
            {data.map((post, idx) => (
              <React.Fragment key={post.id}>
                <tr
                  className="accordion-title cursor-pointer accordion-item"
                  onClick={() => toggle(idx)}
                >
                  <td className="break-words max-w-xs">
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
                  {/* {console.log(post.iscompleted)} */}
                  <td>{post?.iscompleted ? "답변완료" : "답변없음"}</td>
                </tr>

                <tr>
                  <td colSpan={5} className="p-0 break-words max-w-[200px]">
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openIndex === idx ? "max-h-96 p-5" : "max-h-0 p-0"
                      }`}
                    >
                      <QnaDetail
                        post={post}
                        admin={admin}
                        onAnswerSubmit={handleAnswerSubmit}
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
        onPageChange={onPageChange}
      />
    </section>
  );
}
