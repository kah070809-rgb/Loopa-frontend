import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Back from '../../assets/images/Back.svg';

export default function SurveyCreatePage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    category: '',
    startDate: '2026.07.01',
    endDate: '',
    questions: [],
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleExit = () => {
    if (step === 1) {
      window.history.back();
    } else {
      if (
        window.confirm('작성을 그만두시겠습니까? 작성 중인 내용이 사라집니다.')
      ) {
        window.history.back();
      }
    }
  };

  return (
    <>
      {/* ── [공통 헤더 영역 고정] ── */}
      {/* ⭐️ 조건 추가: 등록이 이미 완벽하게 끝난 Step7 화면에서는 뒤로가기 화살표를 숨겨줍니다! */}
      {step < 7 && (
        <div
          style={{
            width: '100%',
            textAlign: 'left',
            margin: '30px 0px 40px 30px',
          }}
        >
          <img
            src={Back}
            alt="설문 만들기 뒤로가기"
            onClick={handleExit}
            style={{ objectFit: 'contain', cursor: 'pointer' }}
          />
        </div>
      )}

      {/* ── [스텝별 화면 렌더링 영역] ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {step === 1 && (
          <RouteStepWrapper>
            <Step1 onNext={nextStep} />
          </RouteStepWrapper>
        )}

        {step === 2 && (
          <RouteStepWrapper>
            <Step2
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          </RouteStepWrapper>
        )}

        {step === 3 && (
          <RouteStepWrapper>
            <Step3
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </RouteStepWrapper>
        )}

        {step === 4 && (
          <RouteStepWrapper>
            <Step4
              formData={formData}
              updateFormData={updateFormData}
              currentQNum={formData.questions.length + 1}
              onNext={(newQuestionData) => {
                updateFormData({
                  questions: [...formData.questions, newQuestionData],
                });
                setStep(5);
              }}
              onPrev={() => setStep(5)}
            />
          </RouteStepWrapper>
        )}

        {step === 5 && (
          <RouteStepWrapper>
            <Step5
              questions={formData.questions}
              onAddQuestion={() => setStep(4)}
              onEditQuestion={(id) => setStep(4)}
              onPrev={() => setStep(2)}
              onNext={nextStep}
            />
          </RouteStepWrapper>
        )}

        {step === 6 && (
          <RouteStepWrapper>
            <Step6
              formData={formData}
              onPrev={prevStep}
              // ⭐️ 수정 완료: 버튼 클릭 즉시 묻지도 따지지도 않고 바로 Step7 디자인 화면이 뜹니다!
              onNext={() => {
                setStep(7);
              }}
            />
          </RouteStepWrapper>
        )}

        {/* Step 7: 최종 등록 성공 및 완료 안내 화면 */}
        {step === 7 && (
          <RouteStepWrapper>
            <Step7
              onViewMySurveys={() => alert('내 설문 보러가기 클릭!')}
              onGoHome={() => setStep(1)} // 메인으로 가기 누르면 다시 1단계 디자인으로 리셋
            />
          </RouteStepWrapper>
        )}
      </div>
    </>
  );
}

function RouteStepWrapper({ children }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      {children}
    </div>
  );
}
