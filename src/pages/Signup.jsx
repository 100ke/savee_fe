import React, { useState } from "react";
import SignupSteps from "../features/user/signup/SignupSteps";
import TermsStep from "../features/user/signup/TermsStep";
import InfoStep from "../features/user/signup/InfoStep";
import SignupSuccess from "../features/user/signup/SignupSuccess";

function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TermsStep onNext={() => setCurrentStep(1)} />;
      case 1:
        return (
          <InfoStep
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return <SignupSuccess />;

      default:
        return null;
    }
  };
  return (
    <div className="signup-page">
      <h3 className="text-2xl text-center mb-4">회원가입</h3>
      <SignupSteps currentStep={currentStep} />
      {renderStep()}
    </div>
  );
}

export default Signup;
