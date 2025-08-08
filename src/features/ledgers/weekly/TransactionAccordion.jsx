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
    <div className="space-y-2 accordion mt-5 max-h-[200px] overflow-y-auto scrollbar-hidden px-2">
      {getWeeks.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg bg-white p-2"
        >
          <input type="checkbox" id={`week-${index}`} className="peer hidden" />
          <label
            htmlFor={`week-${index}`}
            className="flex flex-col cursor-pointer select-none"
          >
            <div className="px-4 py-1">
              <div className="text-sm text-gray-400 mb-1 ">{item.week}</div>

              <div className="flex items-center justify-between justify-center">
                <div className="font-semibold text-lg">{`${
                  index + 1
                }주차`}</div>

                <div className="ml-auto flex space-x-6 text-lg text-right gap-1">
                  <span className="text-[var(--main-color)] min-w-[80px] text-end">
                    + {item.totalIncome.toLocaleString()}
                  </span>
                  <span className="text-[var(--error-color)] min-w-[80px] text-end">
                    - {item.totalExpense.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </label>

          <div className="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all duration-300 pb-1">
            <div className="overflow-hidden">
              <div className="px-4 pb-4 pt-4 text-sm text-gray-700 space-y-2">
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
                      <div className="pb-2 pt-1">
                        <div className="memo text-base">{trs.memo}</div>
                        <div className="text-sm text-gray-500">
                          {trs.date} |{" "}
                          {trs.category_transactions?.name || "카테고리 없음"}
                        </div>
                      </div>

                      <div className="text-right text-base pt-3">
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
        </div>
      ))}
    </div>
  );
}
