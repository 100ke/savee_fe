export default function QnaDetail(content) {
  const question = content.content;
  return (
    <div className="flex gap-2 flex-col">
      <div>{question}</div>
      <hr className="border-[var(--black30)]" />
      <div className="flex">
        <span className="text-[var(--error-color)] text-lg mr-2">A</span>
        <div className="mt-1">{question}</div>
      </div>
    </div>
  );
}
