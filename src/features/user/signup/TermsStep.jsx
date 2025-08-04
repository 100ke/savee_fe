import React from "react";
import "../User.css";

function TermsStep({ onNext }) {
  return (
    <div className="termsstep flex flex-col items-center">
      <div className="box border rounded-lg w-1/2 mb-3">
        <h4 className="p-3 pb-0">1. 수집하는 개인정보 </h4>
        <p className="p-3 pt-1">
          본 서비스는 개인 맞춤형 소비 분석 기능을 제공하기 위해 최소한의
          개인정보를 수집합니다.
        </p>
        <ul className="pl-5 pr-5">
          <li>
            - 회원가입 시 필수로 수집되는 정보: 이메일 주소, 비밀번호, 이름
          </li>
          <li>- 선택적으로 수집되는 정보: 월 소득, 주요 지출 항목</li>
          <li>
            - 비스 이용 과정에서 자동 수집되는 정보: 접속 일시, 사용
            브라우저/기기 정보, 서비스 이용 내역(지출 기록, 예산 설정 등)
          </li>
        </ul>
        <p className="p-3 pt-1">
          금융 정보 연동 시, 사용자의 명시적 동의 하에 해당 기관으로부터
          데이터를 수집하며, 외부 서비스 연동 없이도 가계부 기능은 사용
          가능합니다.
        </p>
        <h4 className="p-3 pb-0">2. 수집한 개인정보의 이용</h4>
        <p className="p-3 pt-1">
          수집한 정보는 아래의 목적에 한하여 사용됩니다: 지출 내역 분석 및 소비
          패턴 시각화 제공 월별 예산 설정 및 초과/절약 리포트 제공 소비 성향에
          기반한 리포트, 리마인더, 자동 분류 기능 제공 서비스 개선 및 신규 기능
          개발을 위한 통계 자료 활용 고객문의 처리, 계정 식별 및 로그인 관리
          마케팅 수신 동의 시에 한하여 할인, 제휴, 금융 정보 알림 제공
        </p>
      </div>
      <div className="agree flex items-center mb-2">
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-primary"
        />
        <p className="ml-2">위 약관에 동의합니다.</p>
      </div>
      <button onClick={onNext} className="btn btn-primary">
        다음
      </button>
    </div>
  );
}

export default TermsStep;
