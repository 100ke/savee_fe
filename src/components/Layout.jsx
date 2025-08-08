import NavBar from "./NavBar"; // 사이드바 컴포넌트

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <NavBar />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex flex-1 bg-white overflow-visible justify-center pt-10 pb-10 flex-wrap">
        <Outlet />
      </main>
    </div>
  );
}
