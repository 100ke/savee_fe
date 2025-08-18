import { useState } from "react";
import QnaAnswerForm from "./AnswerInput";
export default function QnaDetail({ post, admin, onAnswerSubmit }) {
  // const answerContent = answer;

  const data = post;
  // console.log(data.question);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex gap-2 flex-col">
      <div className="break-words whitespace-normal max-h-60 overflow-auto whitespace-pre-wrap">
        {data.question}
      </div>
      <hr className="border-[var(--black30)]" />
      <div className="flex">
        <span className="text-[var(--error-color)] text-lg mr-2">A</span>
        <div className="mt-1 break-words whitespace-normal w-full">
          {data.answer}

          {isEditing ? (
            <QnaAnswerForm
              onSubmit={(answer) => {
                onAnswerSubmit(data.id, answer);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              {admin && (
                <button
                  className="btn btn-sm mt-3 self-end"
                  onClick={() => setIsEditing(true)}
                >
                  {!data?.iscompleted ? "답변 등록" : "답변 수정"}
                </button>
              )}
            </>
          )}
        </div>
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
    </div>
  );
}
