import "./Ledgers.css";
import { IoIosArrowDown } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

// 페이지 컴포넌트에서 데이터 받아와서 처리
function LedgerHeader({ selectedDate, setSelectedDate, summary }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1);

  // 누르면 캘린더 토글
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  // 캘린더에서 선택한 날짜를 date로 받아 useState에 저장
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // 날짜를 선택하면 자동으로 닫힘
  };

  return (
    <div className="relative ledger-header">
      <div className="stats shadow calendar-stats w-full max-w-full flex justify-center gap-4">
        <div className="stat stat1 overflow-x-hidden justify-center w-100 border-none text-center flex flex-col flex-1 min-w-[120px] items-center flex-shrink">
          <div className="stat-title">{year}</div>
          <div className="flex items-center gap-x-1 ml-[1rem]">
            <div className="stat-value items-end text-[var(--black90)]">
              {month}
              <span className="month-word text-[var(--black90)] text-xl self-end">
                월
              </span>
            </div>
            <IoIosArrowDown
              size={20}
              title="날짜 선택"
              className="calendar-open w-5 h-5 relative top-[0.5rem] cursor-pointer"
              onClick={toggleCalendar}
            />
          </div>
        </div>

        <div className="stat stat2 justify-center rounded-md p-5 overflow-x-hidden flex flex-wrap text-center gap-x-23 bg-[var(--main-color-lightest-40)]">
          <div className="stat-income text-center items-end flex flex-wrap gap-3">
            <div className="stat-title p-2">총 수입</div>
            <div className="stat-value">
              {summary.totalIncome.toLocaleString()}원
            </div>
          </div>
          <div className="stat-expense text-center items-end flex flex-wrap gap-3">
            <div className="stat-title p-2">총 지출</div>
            <div className="stat-value">
              {summary.totalExpense.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="absolute top-full left-0 z-10 mt-2 w-screen flex">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            showMonthYearPicker // 월/년도만 선택 가능
            dateFormat="yyyy-MM"
            locale={ko}
          />
        </div>
      )}
    </div>
  );
}

export default LedgerHeader;
