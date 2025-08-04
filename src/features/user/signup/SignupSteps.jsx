import React from "react";

function SignupSteps({ currentStep = 0 }) {
  const steps = ["이용 약관", "회원 정보 입력", "가입 성공"];
  return (
    <div className="termsstep flex justify-center mb-4">
      <ul className="steps">
        {steps.map((label, index) => (
          <li
            key={index}
            className={`step ${
              index <= currentStep ? "step-primary" : ""
            } pr-3`}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignupSteps;
