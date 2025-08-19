import NavBar from "./NavBar"; // 사이드바 컴포넌트

import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const loc = useLocation();
  const isMypage = loc.pathname.startsWith("/mypage");

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <NavBar />

      {/* 메인 콘텐츠 영역 */}
      <main
        className={`flex flex-1 bg-white justify-center mt-10
          ${isMypage ? "mb-0" : "mb-10"}
          ${loc.pathname === "/analysis" ? "overflow-auto" : "overflow-visible"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
