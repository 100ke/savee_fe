import QnaInput from "./QnaInput";
export default function QnaModal({ onRegistered }) {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-[var(--accent-color)] text-white rounded-box"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        문의 접수
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">문의 작성하기</h3>
          <QnaInput onRegistered={onRegistered}></QnaInput>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
