import { Routes, Route } from "react-router-dom";
import QnaMain from "../features/board/qna/QnaMain.jsx";
export default function Qna() {
  return (
    <div className="flex w-4/5 flex-col">
      <Routes>
        <Route index element={<QnaMain />} />
      </Routes>
    </div>
  );
}
