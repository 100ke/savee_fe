import { Route, Routes } from "react-router-dom";
import DailyLedger from "../features/ledgers/daily/DailyLedger";
import WeeklyLedger from "../features/ledgers/weekly/WeeklyLedger";
import LedgerPage from "./LedgerPage";
import MonthlyLedger from "../features/ledgers/monthly/MonthlyLedger";
import TransactionCalendar from "../features/ledgers/monthly/TransactionCalendar";
import GoalLedger from "../features/ledgers/goal/GoalLedger";

export default function LedgerMain() {
  return (
    <Routes>
      <Route path="/" element={<LedgerPage />}>
        <Route index element={<DailyLedger />} />
        <Route path="weekly" element={<WeeklyLedger />} />
        <Route path="monthly" element={<MonthlyLedger />} />
        <Route path="goals" element={<GoalLedger />} />
        <Route path="comments" element={<WeeklyLedger />} />
        <Route path="calendar" element={<MonthlyLedger />} />
      </Route>
    </Routes>
  );
}
