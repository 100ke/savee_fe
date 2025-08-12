import QnaInput from "./QnaInput";

export default function QnaModal({ onRegistered }) {
  const openModal = () => document.getElementById("my_modal_2")?.showModal();
  const closeModal = () => document.getElementById("my_modal_2")?.close();

  return (
    <div>
      <button
        className="btn bg-[var(--accent-color)] text-white rounded-box"
        onClick={openModal}
      >
        문의 접수
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box relative w-[800px] max-w-none h-[600px]">
          <h3 className="font-bold text-lg">문의 작성하기</h3>

          {/* QnaInput이 form과 제출 로직을 가집니다. closeModal도 prop으로 넘김 */}
          <QnaInput onRegistered={onRegistered} closeModal={closeModal} />

          {/* 오른쪽 상단 닫기 버튼 (type="button"으로 자동 닫힘 방지) */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        {/* 배경 클릭시 닫기 원하면 아래처럼 처리(없애도 됨) */}
        <div className="modal-backdrop" onClick={closeModal} />
      </dialog>
    </div>
  );
}
