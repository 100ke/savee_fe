export default function AddComment({
  ledgerId,
  onSave,
  date,
  content,
  setContent,
}) {
  const handleReset = (e) => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!content) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    onSave({
      ledgerId,
      commentDate: date,
      content,
      token: localStorage.getItem("accessToken"),
    });

    handleReset();
    document.getElementById("add-comment-modal").close();
  };

  return (
    <dialog id="add-comment-modal" className="modal">
      <div className="modal-box max-w-2xl">
        <form className="grid grid-cols gap-4 text-sm mb-10">
          <div className="form-control col-span-2">
            <label className="label font-semibold text-base">댓글</label>
            <span className="ml-3 text-[var(--black70)]">({date})</span>
            <textarea
              placeholder="댓글 내용을 입력해 주세요"
              name="comment-content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="textarea textarea-bordered focus:outline-none w-full border-0 border-b border-[var(--black30)] rounded-none"
            />
          </div>

          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn bg-[var(--accent-color)] items-center text-white px-8 w-[40%] rounded text-base"
            >
              등록
            </button>
          </div>
        </form>

        {/* 버튼 영역 */}
        <div className="flex justify-center items-center mt-6"></div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
