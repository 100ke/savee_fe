import { useState } from "react";
import "../Ledgers.css";
import AddComment from "../modal/AddComment";
import { fetchCreateComment } from "../TransactionApi";

export default function TransactionList({
  comments,
  ledgerId,
  content,
  setContent,
  onReload,
  currentUserId,
}) {
  const [chooseDate, setChooseDate] = useState(null);

  const handleSave = async (formData) => {
    try {
      const content = await fetchCreateComment(
        formData.ledgerId,
        formData.commentDate,
        formData.content,
        localStorage.getItem("accessToken")
      );
      setContent(content);
      alert("등록 완료");

      await onReload();
      setChooseDate(null);
      setContent(null);
    } catch (error) {
      const message = error.response?.data?.message ?? "";
      console.log(message);
      console.error(error);
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="comment-error text-[var(--black70)] mt-10">
        선택하신 월에 등록된 내역이 없습니다.
      </div>
    );
  }

  return !comments || comments.length === 0 ? (
    <div className="comment-error text-[var(--black70)] mt-10">
      선택하신 월에 등록된 내역이 없습니다.
    </div>
  ) : (
    <div
      className="list comment-list rounded-box mt-5 max-h-[600px] overflow-y-auto scrollbar-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}
    >
      {comments.map((comment) => {
        const hasMyComment = comment.users.some(
          (user) =>
            Number(user.user.id) === currentUserId && user.comments.length > 0
        );

        return (
          <div
            key={comment.date}
            className="comment-list-container shadow-md rounded-lg p-4 space-y-4"
          >
            {/* 날짜 헤더 */}
            <div className="comment-date text-sm font-semibold border-b border-[var(--black70)] pb-2 tracking-wide">
              {comment.date}
            </div>

            {/* 사용자별 내역 */}
            {comment.users.map((user) => (
              <div key={user.user.id} className="space-y-2">
                <div className="user-name font-semibold">{user.user.name}</div>

                <div className="rounded shadow p-4 space-y-2">
                  {user.transactions.map((tx, idx) => (
                    <div
                      key={tx.id ?? idx}
                      className="flex items-center gap-3 p-2 border-b last:border-b-0 border-[var(--black70)]"
                    >
                      <div className="w-10 h-10 flex items-center mb-1 justify-center text-sm font-medium text-[var(--accent-color)]">
                        {tx.category_transactions?.name || "?"}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{tx.memo}</div>
                        <div className="text-sm text-[var(--black70)]">
                          {tx.amount.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 댓글 + 버튼 */}
            <div className="flex justify-end mt-4">
              <div className="chat chat-start w-full relative">
                <div className="chat-bubble w-full h-auto p-5 whitespace-pre-wrap text-sm leading-relaxed bg-[var(--accent-color)] text-white">
                  {comment.users.some((user) => user.comments.length > 0) ? (
                    comment.users
                      .flatMap((user) =>
                        user.comments.map(
                          (cmt) => `${user.user.name} : ${cmt.content}`
                        )
                      )
                      .join("\n")
                  ) : (
                    <span>아직 댓글이 없습니다.</span>
                  )}
                </div>

                {!hasMyComment && (
                  <button
                    onClick={() => {
                      setChooseDate(comment.date);
                      document.getElementById("add-comment-modal").showModal();
                    }}
                    className="absolute bottom-0 right-0 mb-4 mr-15 btn btn-circle btn-outline text-[var(--white)] "
                    title="댓글 추가"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <AddComment
        ledgerId={ledgerId}
        onSave={handleSave}
        date={chooseDate}
        content={content}
        setContent={setContent}
      />
    </div>
  );
}
