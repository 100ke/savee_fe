import { Routes, Route } from "react-router-dom";
import SupportMain from "../features/board/support/SuportMain.jsx";
import SupportInput from "../features/board/support/SupportInput.jsx";
import SupportDetail from "../features/board/support/SupportDetail.jsx";
export default function Support() {
  return (
    <div className="flex w-4/5 flex-col">
      <Routes>
        <Route index element={<SupportMain />} />
        <Route path="/add" element={<SupportInput />} />
        <Route path="/:id" element={<SupportDetail />} />
        <Route path="/edit/:id" element={<SupportInput />} />
      </Routes>
    </div>
  );
}
