import React from 'react';
import '../User.css'

function TermsStep() {
    return (
        <div className='termsstep'>
            <ul className="steps">
                <li className="step step-primary">이용 약관</li>
                <li className="step">회원 정보 입력</li>
                <li className="step">가입 성공</li>
            </ul>
        </div>
    );
}

export default TermsStep;