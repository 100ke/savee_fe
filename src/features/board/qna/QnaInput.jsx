import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost, createPost } from "../QnaApi";
export default function QnaInput({ onRegistered, closeModal }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  // const [files, setFiles] = useState([]);
  // const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const [qna_type, setType] = useState("로그인");
  const { id } = useParams(); // id가 있으면 수정, 없으면 등록
  const isEdit = Boolean(id);
  let newPostId = null;

  //상태확인
  useEffect(() => {
    if (isEdit) {
      fetchPostById(id)
        .then((res) => {
          const qna = res.data;
          setTitle(qna.title);
          setQuestion(qna.question);
          setType(qna.qna_type || "로그인");
        })
        .catch(() => {
          alert("게시글을 불러오는 중 오류가 발생했습니다.");
          navigate("/qna");
        });
    }
  }, [id, isEdit, navigate]);

  //포커싱
  const titleRef = useRef(null); // 제목 input 참조
  const contentRef = useRef(null); // 내용 textarea 참조
  // const MAX = 10;

  //제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      titleRef.current?.focus(); // 제목에 포커스
      return;
    }

    if (!question.trim()) {
      setError("내용을 입력해주세요.");
      contentRef.current?.focus(); // 내용에 포커스
      return;
    }

    setError("");
    try {
      if (isEdit) {
        // 수정 API 호출
        await updatePost(id, { title, question, qna_type });
        alert("질문이 수정 되었습니다.");
        if (onRegistered) onRegistered();
        if (closeModal) closeModal();
      } else {
        // 등록 API 호출
        const data = await createPost({ title, question, qna_type });
        newPostId = data.data.id;
        fetchPostById(newPostId);
        alert("질문이 등록 되었습니다.");
        setTitle("");
        setQuestion("");
        setType("로그인");
        // window.location.reload();
        // createPost 호출 성공 후
        console.log("등록 성공, onRegistered 호출 직전");
        if (typeof onRegistered === "function") {
          await onRegistered();
          console.log("onRegistered 호출 완료");
        }
        closeModal();
      }
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center w-3/4">
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend text-base font-normal">
            제목
          </legend>
          <input
            ref={titleRef}
            type="text"
            className="input w-auto"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="label">필수 입력</p>
        </fieldset>
        <form onSubmit={handleSubmit} className="justify-center ml-3">
          <select
            value={qna_type}
            onChange={(e) => setType(e.target.value)}
            required
            className="rounded-box border-[var(--black70)]"
          >
            <option value="로그인">로그인</option>
            <option value="가계부">가계부</option>
            <option value="소비분석">소비분석</option>
            <option value="에러">에러</option>
            <option value="유저">유저</option>
            <option value="기타">기타</option>
          </select>
        </form>
      </div>
      <fieldset className="fieldset h-2/4 flex flex-col">
        <legend className="fieldset-legend text-base font-normal w-full">
          문의
        </legend>
        <textarea
          ref={contentRef}
          className="textarea text-base w-auto flex-1"
          placeholder="문의 내용을 입력해주세요."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <div className="label">필수 입력</div>
        {/* 에러 메시지 표시 */}
        {error && <p className="required-input text-sm mt-2">{error}</p>}
      </fieldset>
      <div className="w-auto justify-between gap-2 mt-2 flex">
        <button
          className="btn join-item rounded-box w-20 "
          onClick={() => {
            // 취소는 모달 닫기만
            if (closeModal) closeModal();
          }}
        >
          취소
        </button>
        <div
          className="modal-action rounded-box support-submit join-item"
          onClick={handleSubmit}
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">접수하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}
