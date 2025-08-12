export default function QnaAnswerForm({ onSubmit, onCancel }) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="답변을 입력하세요."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => onSubmit(answer)}>
          등록
        </button>
        <button className="btn btn-outline" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
