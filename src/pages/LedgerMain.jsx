import { Route, Routes } from "react-router-dom";
import DailyLedger from "../features/ledgers/daily/DailyLedger";
import WeeklyLedger from "../features/ledgers/weekly/WeeklyLedger";
import LedgerPage from "./LedgerPage";

export default function LedgerMain() {
  return (
    <Routes>
      <Route path="/" element={<LedgerPage />}>
        <Route index element={<DailyLedger />} />
        <Route path="weekly" element={<WeeklyLedger />} />
        <Route path="/monthly" element={<WeeklyLedger />} />
        <Route path="/goals" element={<WeeklyLedger />} />
        <Route path="/comments" element={<WeeklyLedger />} />
      </Route>
    </Routes>
  );
}
