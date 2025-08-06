import { Routes, Route } from "react-router-dom";
import Support from "../features/board/support/Support.jsx";
import SupportInput from "../features/board/support/SupportInput";
export default function SupportMain() {
  return (
    <Routes>
      <Route index element={<Support />} />
      <Route path="/create" element={<SupportInput />} />
    </Routes>
  );
}
