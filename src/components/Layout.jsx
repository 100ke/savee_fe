import NavBar from "./NavBar"; // 사이드바 컴포넌트

import { BrowserRouter, Outlet } from "react-router-dom";
import Support from "../pages/Support";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LedgerMain from "../pages/LedgerMain.jsx";
import MyPage from "../pages/MyPage.jsx";

export default function Layout() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* 사이드바 */}
        <NavBar />

        {/* 메인 콘텐츠 영역 */}
        <main className="flex flex-1 bg-white overflow-visible justify-center pt-10 pb-10 flex-wrap">
          <Routes>
            <Route path="/ledger/*" element={<LedgerMain />} />
            <Route path="/support/*" element={<Support />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>

          <Outlet />
        </main>
      </div>
    </BrowserRouter>
  );
}
