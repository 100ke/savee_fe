import "../Ledgers.css";

// 달력 만들기
function generateCalendarDates(year, month) {
  const dates = [];
  // 이번달 총 일수
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month - 1, i));
  }

  return dates;
}

export default function TransactionCalendar({ monthlyDatas, selectedDate }) {
  if (!selectedDate) return <div>날짜 불러오는 중 ...</div>;

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const calendarDates = generateCalendarDates(year, month);

  // 해당 달 1일 요일 구하기 -> 0 : 일 ~ 6 : 토
  const firstDayOfMonth = calendarDates[0].getDay();
  console.log(monthlyDatas);
  console.log(calendarDates);

  return (
    <div className="monthly-calendar mt-5 max-h-[600px] overflow-y-auto overflow-x-hidden scrollbar-hidden">
      <div className="mt-5">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center font-semibold">
          {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
            <div key={idx} className="py-2 border-b border-[var(--black30)]">
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 gap-1 mt-2 text-center text-sm">
          {/* 시작 빈칸 채우기 */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="h-[120px] border-b border-[var(--black30)]"
            ></div>
          ))}

          {calendarDates.map((date, idx) => {
            const dateStr = date.toISOString().split("T")[0];
            const dayData = monthlyDatas.find((d) => d.date === dateStr);
            const todayStr = new Date().toISOString().split("T")[0];
            const isToday = dateStr === todayStr;

            return (
              <div
                key={idx}
                className={`min-h-[120px] border-b border-[var(--black30)] hover:bg-gray-50 flex flex-col justify-start items-center p-2 pt-3 text-base`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center ${
                    isToday
                      ? "bg-[var(--main-color)] text-white rounded-full"
                      : ""
                  }`}
                >
                  {date.getDate()}
                </div>

                {dayData && (
                  <div className="totals mt-10 text-xs text-center leading-tight">
                    {dayData.totalIncome > 0 && (
                      <div className="monthly-income text-blue-500">
                        +{dayData.totalIncome.toLocaleString()}원
                      </div>
                    )}
                    {dayData.totalExpense > 0 && (
                      <div className="monthly-expense text-red-500">
                        -{dayData.totalExpense.toLocaleString()}원
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <hr className="m-4 text-[var(--black30)]" /> */}
      </div>
    </div>
  );
}
