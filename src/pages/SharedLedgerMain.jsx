import { Route, Routes } from "react-router-dom";
import DailyLedger from "../features/ledgers/daily/DailyLedger";
import WeeklyLedger from "../features/ledgers/weekly/WeeklyLedger";
import MonthlyLedger from "../features/ledgers/monthly/MonthlyLedger";
import SharedLedger from "../features/ledgers/shared/SharedLedger";
import SharedLedgerPage from "./SharedLedgerPage";
import GoalLedger from "../features/ledgers/goal/GoalLedger";

export default function SharedLedgerMain() {
  return (
    <Routes>
      <Route path="/" element={<SharedLedgerPage />}>
        <Route index element={<SharedLedger />} />
        <Route path=":ledgerId">
          <Route index element={<DailyLedger />} />
          <Route path="weekly" element={<WeeklyLedger />} />
          <Route path="monthly" element={<MonthlyLedger />} />
          <Route path="goals" element={<GoalLedger />} />
          <Route path="comments" element={<WeeklyLedger />} />
        </Route>
      </Route>
    </Routes>
  );
}
