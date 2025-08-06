import "../Ledgers.css";

function TransactionCard({ transactions }) {
  function formatDate(days) {
    const date = new Date(days);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString().padStart(2, "0");

    // 요일
    const weeks = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weeks[date.getDay()];

    return `${month}월 ${day}일(${dayOfWeek})`;
  }

  function isToday(days) {
    const today = new Date();
    const date = new Date(days);

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  // 데이터 날짜별로 묶기
  function groupByDate(transactions) {
    const group = {};

    transactions.forEach((item) => {
      const key = item.date;

      if (!group[key]) {
        group[key] = [];
      }
      group[key].push(item);
    });

    return group;
  }

  return (
    <div className="trans-container grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] px-4 mt-6 max-h-[450px] overflow-y-auto overflow-x-hidden scrollbar-hidden pb-4">
      {transactions && transactions.length > 0 ? (
        Object.entries(groupByDate(transactions)).map(([date, items]) => {
          const income = items
            .filter((item) => item.type === "income")
            .reduce((sum, cur) => sum + cur.amount, 0);
          const expense = items
            .filter((item) => item.type === "expense")
            .reduce((acc, cur) => acc + cur.amount, 0);

          return (
            <table className="table-auto w-full bg-base-100 rounded-3xl shadow-md p-4 scrollbar-hidden">
              <thead>
                <tr>
                  <th colSpan={4} className="text-left text-sm font-bold p-4">
                    <div className="flex justify-between items-center">
                      <span>{formatDate(date)}</span>
                      {isToday(date) && (
                        <span className="today-badge ml-2 px-2 py-0.5 text-xs rounded-full bg-[var(--main-color-lightest)] text-[var(--main-color)]">
                          오늘
                        </span>
                      )}
                      <span className="ml-auto text-[var(--black70)]">
                        +{income.toLocaleString()}원
                      </span>
                      <span className="ml-2 text-[var(--black70)]">
                        -{expense.toLocaleString()}원
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200 m-2">
                    <td className="text-center p-2 align-top text-sm text-[var(--black90)] border-r border-[var(--black30)]">
                      {item.category_transactions?.name || ""}
                    </td>
                    <td className="text-center p-2 align-top">{item.memo}</td>
                    <td className="text-right p-2 align-top">
                      {item.amount.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })
      ) : (
        <div className="p-4 col-span-full text-center">데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default TransactionCard;
