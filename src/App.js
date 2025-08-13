import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import LedgerMain from "./pages/LedgerMain.jsx";
import Support from "./pages/Support.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Qna from "./pages/Qna.jsx";
import Statistic from "./pages/Statistic.jsx";
import SharedLedgerMain from "./pages/SharedLedgerMain.jsx";
import MainPage from "./pages/MainPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="ledger/*" element={<LedgerMain />} />
        <Route path="sharedLedger/*" element={<SharedLedgerMain />} />
        <Route path="support/*" element={<Support />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Qna/*" element={<Qna />} />
        <Route path="statistics" element={<Statistic />} />
      </Route>
    </Routes>
  );
}

export default App;
