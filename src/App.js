import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import LedgerMain from "./pages/LedgerMain.jsx";
import Support from "./pages/Support.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Qna from "./pages/Qna.jsx";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="ledger/*" element={<LedgerMain />} />
        <Route path="support/*" element={<Support />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Qna/*" element={<Qna />} />
      </Route>
    </Routes>
  );
}

export default App;
