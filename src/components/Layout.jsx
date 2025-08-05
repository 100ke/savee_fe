import Support from "../features/board/support/Support";
import NavBar from "./NavBar"; // 사이드바 컴포넌트
import { Outlet } from "react-router-dom";
import SupportInput from "../features/board/support/SupportInput";
import SupportDetail from "../features/board/support/SupportDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import DailyLedger from "../pages/DailyLedger";
export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <NavBar />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex flex-1 bg-white overflow-y-auto overflow-x-hidden justify-center pt-10 pb-10 flex-wrap">
        {/* <Router>
          <Routes>
            <Route path="/" element={<Support />} />
          </Routes>
        </Router> */}
        {/* <Support /> */}
        {/* <DailyLedger /> */}
        {/* <SupportDetail /> */}
        <SupportInput></SupportInput>
        <Outlet />
      </main>
    </div>
  );
}
