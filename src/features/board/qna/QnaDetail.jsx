export default function QnaDetail({ question, answer }) {
  const questionContent = question;
  const answerContent = answer;
  return (
    <div className="flex gap-2 flex-col">
      <div>{questionContent}</div>
      <hr className="border-[var(--black30)]" />
      <div className="flex">
        <span className="text-[var(--error-color)] text-lg mr-2">A</span>
        <div className="mt-1">{answerContent}</div>
      </div>
    </div>
  );
}
