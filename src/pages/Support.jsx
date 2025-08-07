import { Routes, Route } from "react-router-dom";
import SupportMain from "../features/board/support/SuportMain.js";
import SupportInput from "../features/board/support/SupportInput.jsx";
import SupportDetail from "../features/board/support/SupportDetail.jsx";
export default function Support() {
  return (
    <div className="flex w-3/4 flex-col">
      <Routes>
        <Route index element={<SupportMain />} />
        <Route path="/add" element={<SupportInput />} />
        <Route path="/:id" element={<SupportDetail />} />
      </Routes>
    </div>
  );
}
