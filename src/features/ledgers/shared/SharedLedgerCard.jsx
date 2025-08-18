import { useNavigate } from "react-router-dom";

export default function SharedLedgerCard({ sharedLedgers, children }) {
  // daily에 ledgerId 넘기기
  const navigate = useNavigate();

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {sharedLedgers.map((ledger, idx) => {
        const members = ledger.ledger_ledgermembers || [];
        // 목표가 없을 때를 대비해 첫 번째 목표만 보여주고 목표가 없을 때는 메시지 출력
        const firstGoal = Array.isArray(ledger.ledger_goals)
          ? ledger.ledger_goals[0]
          : null;

        return (
          <div
            key={ledger.id}
            className="card w-50 h-70 bg-[var(--main-color)] h-[18rem] rounded-[1.5rem] shadow-lg cursor-pointer hover:bg-[var(--color-sub1)] transition-all duration-200"
            onClick={() => navigate(`/sharedLedger/${ledger.id}`)}
          >
            <div className="card-body flex flex-col justify-between items-center p-6">
              {/* 제목 */}
              <h2 className="card-title text-xl text-white font-semibold mb-2 text-center">
                {ledger.name || "가계부 이름"}
              </h2>

              {/* 목표 금액 정보 */}
              {firstGoal ? (
                <p className="text-white text-sm text-center mt-4">
                  목표 금액 : {firstGoal.target_amount?.toLocaleString() || "0"}{" "}
                  원
                </p>
              ) : (
                <p className="text-white text-sm text-center mt-4">
                  설정된 목표가 없습니다.
                </p>
              )}

              {/* 고정된 흰색 카드 안에 멤버 아바타 표시 */}
              <div className="card-body-member bg-white w-40 h-20 rounded-xl px-3 py-2 flex items-center justify-center">
                <div className="flex -space-x-2.5">
                  {members.slice(0, 3).map((member, index) => (
                    <div className="avatar" key={index}>
                      <div className="w-10 rounded-full border border-gray-200">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=User${member.userId}`}
                          alt={`User ${member.userId}`}
                        />
                      </div>
                    </div>
                  ))}

                  {members.length > 3 && (
                    <div className="avatar placeholder">
                      <div className="w-10 bg-neutral text-white rounded-full flex items-center justify-center text-sm">
                        +{members.length - 3}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* + 버튼 등 자식요소 삽입 */}
      {children}
    </div>
  );
}
