import "../Ledgers.css";

export default function TransactionAccordion({ weeklyDatas }) {
  if (!weeklyDatas || weeklyDatas.length === 0)
    return (
      <div className="p-4 col-span-full text-center text-[var(--black70)] px-4 mt-6">
        데이터가 없습니다.
      </div>
    );

  const getWeeks = weeklyDatas.map((weeks) => ({
    week: weeks.week,
    totalIncome: weeks.income,
    totalExpense: weeks.expense,
    transactions: weeks.transactions,
  }));

  return (
    <div className="space-y-2 accordion mt-5 overflow-y-auto scrollbar-hidden">
      {getWeeks.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg bg-white p-2"
        >
          <input type="checkbox" id={`week-${index}`} className="peer hidden" />
          <label
            htmlFor={`week-${index}`}
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
          >
            <span className="font-semibold">{item.week}</span>
            <span className="text-gray">
              + {item.totalIncome.toLocaleString()}
            </span>
            <span className="text-gray">
              - {item.totalExpense.toLocaleString()}
            </span>
          </label>

          <div className="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all duration-300">
            <div className="overflow-hidden">
              {item.transactions.length === 0 ? (
                <div className="text-center text-gray-400">
                  거래 내역이 없습니다.
                </div>
              ) : (
                item.transactions.map((trs) => (
                  <div
                    key={trs.id}
                    className="flex flex-col sm:flex-row sm:justify-between border-b pb-1"
                  >
                    <div>
                      <div className="memo font-base">{trs.memo}</div>
                      <div className="text-xs text-gray-500">
                        {trs.date} |{" "}
                        {trs.category_transactions?.name || "카테고리 없음"}
                      </div>
                    </div>

                    <div
                      className={`text-right font-semibold ${
                        trs.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {trs.type === "income" ? "+" : "-"}{" "}
                      {trs.amount.toLocaleString()}원
                    </div>
                  </div>
                ))
              )}

              <div className="px-4 pb-4 text-sm text-gray-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
