import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "./SupportHeader";

export default function SupportInput(isEdit = false) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  //포커싱
  const titleRef = useRef(null); // 제목 input 참조
  const contentRef = useRef(null); // 내용 textarea 참조
  const MAX = 10;

  //제출
  const handleSubmit = () => {
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      titleRef.current?.focus(); // 제목에 포커스
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      contentRef.current?.focus(); // 내용에 포커스
      return;
    }

    setError("");

    alert("공지사항이 등록 되었습니다.");
  };
  //파일 첨부
  const handleFileChange = (e) => {
    //이미지 미리보기
    const selectedFiles = Array.from(e.target.files);

    // 모든 파일 허용

    const futureFiles = [...files, ...selectedFiles];
    console.log(futureFiles.length);
    if (futureFiles.length > MAX) {
      alert(`파일은 최대 ${MAX}개까지 첨부할 수 있어요.`);
      return;
    }

    // 기존 파일에 새 파일 추가
    setFiles(futureFiles);

    // 🔍 미리보기는 "이미지"인 경우만
    const newPreviews = selectedFiles
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };
  //파일 삭제
  const handleRemoveFile = (fileName) => {
    // files 배열에서 제거
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    // previews 배열에서도 제거
    setPreviews((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <PostHeader></PostHeader>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base font-normal">제목</legend>
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
      <fieldset className="fieldset h-2/4 flex flex-col">
        <legend className="fieldset-legend text-base font-normal w-full">
          내용
        </legend>
        <textarea
          ref={contentRef}
          className="textarea text-base w-auto flex-1"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="label">필수 입력</div>
        {/* 에러 메시지 표시 */}
        {error && <p className="required-input text-sm mt-2">{error}</p>}
      </fieldset>
      <div className="container flex flex-col">
        <div className="mb-3 flex gap-2 flex-wrap mt-3">
          <label htmlFor="files" className="text-base">
            첨부파일
          </label>
          {/* 커스텀 업로드 버튼 */}
          <label
            htmlFor="files"
            className="btn btn-xs join-item rounded-box w-18 cursor-pointer text-xs custom-card2 bg-white"
          >
            파일 선택
          </label>
          <input
            type="file"
            className="text-base rounded-box hidden"
            id="files"
            name="files"
            multiple
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            지원 가능한 파일: 이미지, PDF, Word, HWP 등 / 최대 10개
          </p>
          <p className="text-sm text-gray-500 mt-1">
            첨부된 파일: {files.length} / {MAX}
          </p>
        </div>
        {/* 이미지 미리보기 */}
        {files.length > 0 && (
          <ul className="mt-2 flex ">
            <div className="flex flex-wrap gap-2 ">
              {previews.map((file, idx) => (
                <div key={idx} className="flex flex-col items-center relative">
                  {/* 삭제 버튼 */}
                  <button
                    className="absolute top-0 right-0 text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                    onClick={() => handleRemoveFile(file.name)}
                    type="button"
                  >
                    ×
                  </button>
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                  <p className="text-xs mt-1 text-gray-600 w-20 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </ul>
        )}
        {files
          .filter((file) => !file.type.startsWith("image/"))
          .map((file, idx) => (
            <p key={idx} className="text-sm text-gray-600">
              📎 {file.name}
            </p>
          ))}
      </div>
      <div className="w-auto justify-between gap-2 mt-2 flex">
        <button
          className="btn join-item rounded-box w-20 "
          onClick={() => navigate(`/support`)}
        >
          취소
        </button>
        <button
          className="btn join-item rounded-box w-20 support-submit"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </div>
  );
}
