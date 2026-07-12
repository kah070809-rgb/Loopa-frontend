import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Back from '../../assets/images/Back.svg';

import { createSurvey } from '../../api/survey';
// 모달창 스타일 적용을 위해 step2.style.js에서 팝업 스타일 컴포넌트들을 임포트합니다.
import * as S from './Step2.style';

export default function SurveyCreatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [editingQuestionId, setEditingQuestionId] = useState(null); // 편집 중인 문항 인덱스 (0, 1, 2...)
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 커스텀 모달창 열림 상태 추가

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    category: '',
    startDate: '2026-07-01',
    endDate: '',
    questions: [],
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // 스텝 1~5까지 뜨는 상단 뒤로가기 버튼 클릭 처리 수정
  const handleExit = () => {
    if (step === 1) {
      window.history.back();
    } else {
      // 브라우저 기본 창(confirm) 대신 피그마 디자인의 커스텀 모달창을 띄웁니다.
      setIsPopupOpen(true);
    }
  };

  const handleFinalSubmit = async (estimatedTimeValue) => {
    try {
      // Step5에서 넘겨받거나 formData에 저장된 소요 시간 추출 (fallback 5분)
      const finalMinutes = estimatedTimeValue || formData.estimatedTime || 5;

      const requestPayload = {
        title: formData.title,
        description: formData.description,
        target: formData.target,
        category: formData.category, // CAREER 등 코드 형태
        estimatedMinutes: Number(finalMinutes), // 정수형 변환 필수 적용
        startDate: formData.startDate || '2026-07-01', // yyyy-MM-dd 규격 포맷
        endDate: formData.endDate, // yyyy-MM-dd 규격 포맷

        // 백엔드 명세서 스펙에 맞춘 questions 깊은 객체 바인딩 교정
        questions: formData.questions.map((q, index) => {
          // 객관식일 때는 MULTIPLE_CHOICE, 주관식일 때는 SUBJECTIVE 매핑
          const targetType =
            q.type.toUpperCase() === 'OBJECTIVE'
              ? 'MULTIPLE_CHOICE'
              : 'SUBJECTIVE';

          return {
            order: index + 1,
            type: targetType,
            content: q.title, // title 필드명을 명세서 규격인 content로 교체
            isRequired: q.isRequired || false,
            allowMultiple: q.isMultiple || false, // isMultiple을 allowMultiple 필드명으로 스위칭

            // 보기(options) 스펙을 객체 배열 구조인 order와 content 구조로 개편
            options:
              targetType === 'MULTIPLE_CHOICE'
                ? q.options
                    .filter((opt) => opt.trim() !== '')
                    .map((opt, optIdx) => ({
                      order: optIdx + 1,
                      content: opt, // 보기 내용 필드명 content 매핑
                    }))
                : [], // 주관식일 경우 명세서 스펙대로 빈 배열([]) 전달
          };
        }),
      };

      console.log('최종 백엔드 전송 서버 Payload 규격 확인:', requestPayload);

      const response = await createSurvey(requestPayload);
      if (response.isSuccess || response.status === 201) {
        setStep(6);
      }
    } catch (error) {
      console.error('설문지 최종 서버 등록 에러:', error);
      alert('설문 등록에 실패했습니다. 입력 양식을 다시 확인해 주세요.');
    }
  };

  return (
    <>
      {step < 6 && (
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
              questions={formData.questions}
              onAddQuestion={() => {
                setEditingQuestionId(null); // 신규 추가 모드 리셋
                setStep(4);
              }}
              onEditQuestion={(idx) => {
                setEditingQuestionId(idx); // 몇 번째 문항을 편집하는지 인덱스 저장
                setStep(4);
              }}
              onPrev={prevStep}
              onNext={() => setStep(5)} // ✨ 수정: 다음 누르면 정상적으로 5단계(구 6단계) 영수증 페이지 이동!
            />
          </RouteStepWrapper>
        )}

        {step === 4 && (
          <RouteStepWrapper>
            <Step4
              questions={formData.questions}
              editingQuestionId={editingQuestionId} // 편집 대상 정보 주입
              onNext={(questionData) => {
                if (editingQuestionId !== null) {
                  // 편집 완료 시 해당 위치 데이터 수정
                  const updatedQuestions = [...formData.questions];
                  updatedQuestions[editingQuestionId] = questionData;
                  updateFormData({ questions: updatedQuestions });
                } else {
                  // 신규 추가 시 배열 끝에 추가
                  updateFormData({
                    questions: [...formData.questions, questionData],
                  });
                }
                setEditingQuestionId(null);
                setStep(3); // 문항 목록(Step3)으로 복귀
              }}
              onPrev={() => {
                setEditingQuestionId(null);
                setStep(3);
              }}
            />
          </RouteStepWrapper>
        )}

        {step === 5 && (
          <RouteStepWrapper>
            <Step5
              formData={formData}
              updateFormData={updateFormData}
              onPrev={() => setStep(3)} // 이전 누르면 문항 구성(Step3)으로 복귀
              onSubmit={handleFinalSubmit}
            />
          </RouteStepWrapper>
        )}

        {step === 6 && (
          <RouteStepWrapper>
            <Step6
              onViewMySurveys={() => navigate('/mypage')}
              onGoHome={() => navigate('/main')}
            />
          </RouteStepWrapper>
        )}
      </div>

      {/* ✨ 피그마 규격 요구사항을 완벽히 충족하는 이탈 방지 팝업 모달 추가 ✨ */}
      {isPopupOpen && (
        <S.PopupOverlay>
          <S.PopupBox>
            <S.PopupTitle>작성을 그만두시겠습니까?</S.PopupTitle>
            <S.PopupDesc>
              지금 나가시면 입력된 내용이 저장되지 않습니다.
            </S.PopupDesc>
            <S.PopupButtonRow>
              <S.PopupCancelBtn onClick={() => setIsPopupOpen(false)}>
                취소
              </S.PopupCancelBtn>
              <S.PopupConfirmBtn onClick={() => navigate('/main')}>
                메인으로 돌아가기
              </S.PopupConfirmBtn>
            </S.PopupButtonRow>
          </S.PopupBox>
        </S.PopupOverlay>
      )}
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
