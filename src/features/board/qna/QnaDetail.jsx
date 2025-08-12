import { useState } from "react";
export default function QnaDetail({ question, admin, onAnswerSubmit }) {
  const questionContent = question;
  // const answerContent = answer;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex gap-2 flex-col">
      <div className="break-words whitespace-normal max-h-60 overflow-auto whitespace-pre-wrap">
        {questionContent}
      </div>
      <hr className="border-[var(--black30)]" />
      <div className="flex">
        <span className="text-[var(--error-color)] text-lg mr-2">A</span>
        <div className="mt-1 break-words whitespace-normal">
          {/* {answerContent} */}
        </div>
        {/* {isEditing ? (
          <QnaAnswerForm
            onSubmit={(answer) => {
              onAnswerSubmit(post.id, answer);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <QnaDetail question={post.question} answer={post.answer} />
            {admin && !post.iscommpleted && (
              <button
                className="btn btn-sm mt-3"
                onClick={() => setIsEditing(true)}
              >
                답변 등록
              </button>
            )}
          </>
        )} */}
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
