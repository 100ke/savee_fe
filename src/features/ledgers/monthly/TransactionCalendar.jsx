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

  return (
    <div className="mt-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center font-semibold">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-center text-sm">
        {/* 시작 빈칸 채우기 */}
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`} className="p-2"></div>
        ))}

        {/* 날짜 출력 */}
        {calendarDates.map((date, idx) => (
          <div className="border rounded p-2 min-h-[60px] hover:bg-gray-50">
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}
