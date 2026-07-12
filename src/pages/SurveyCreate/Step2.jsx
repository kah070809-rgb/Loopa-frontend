import React, { useState, useEffect } from 'react';
import * as S from './step2.style'; // 분리된 스타일 컴포넌트 임포트
import TextBox from '../../components/common/TextBox';
import Button from '../../components/common/Button';

export default function Step2({ formData, updateFormData, onNext }) {
  // 예외 처리를 위한 에러 상태
  const [errors, setErrors] = useState({});
  const [todayDisplay, setTodayDisplay] = useState('');
  const [todayValue, setTodayValue] = useState('');

  // 컴포넌트 로드 시 현재 날짜 자동 고정 처리
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    setTodayDisplay(`${yyyy}.${mm}.${dd}`);
    setTodayValue(`${yyyy}-${mm}-${dd}`);

    if (!formData?.startDate) {
      updateFormData({ startDate: `${yyyy}-${mm}-${dd}` });
    }
  }, []);

  // 다음 버튼 클릭 시 유효성 검사 예외 처리 함수
  const handleNextClick = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }
    if (!formData?.target) {
      newErrors.target = '희망 설문 대상을 선택해주세요.';
    }
    if (!formData?.category) {
      newErrors.category = '카테고리를 선택해주세요.';
    }
    if (!formData?.endDate) {
      newErrors.endDate = '종료일을 선택해주세요.';
    } else if (formData.endDate < todayValue) {
      newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
    }

    setErrors(newErrors);

    // 필수 유효성 조건을 모두 만족해야만 다음 단계로 이동 가능
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <S.Container>
      {/* 1. 상단 스텝 동그라미 인디케이터 */}
      <S.IndicatorContainer>
        <S.StepWrapper>
          <S.ActiveCircle />
          <S.StepLabel>기본정보</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>문항 구성</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.LastCircle />
          <S.StepLabel>완료</S.StepLabel>
        </S.StepWrapper>
      </S.IndicatorContainer>

      <S.SubTitle>기본 정보 입력</S.SubTitle>

      {/* 2. 설문 제목 (TextBox 사용) - 요청대로 원래의 진한 빨간색 내장 에러 상태로 원복 */}
      <S.FormRow>
        <TextBox
          guide="설문 제목"
          required={true}
          error={errors.title}
          limit={100}
          currentLength={formData?.title?.length || 0}
          placeholder="설문 제목을 입력해주세요."
          value={formData?.title || ''}
          onChange={(e) => {
            updateFormData({ title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: null });
          }}
        />
      </S.FormRow>

      {/* 3. 설문 설명 (TextBox 주관식 모드 사용) */}
      <S.FormRow>
        <TextBox
          guide="설문 설명 (선택)"
          isTextArea={true}
          limit={1000}
          currentLength={formData?.description?.length || 0}
          placeholder="설문에 대한 설명을 입력해주세요."
          value={formData?.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
      </S.FormRow>

      {/* 4. 희망 설문 대상 드롭다운 */}
      <S.FormRow>
        <S.Label>
          희망 설문 대상 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.Select
          hasError={!!errors.target}
          value={formData?.target || ''}
          onChange={(e) => {
            updateFormData({ target: e.target.value });
            if (errors.target) setErrors({ ...errors, target: null });
          }}
        >
          <option value="" disabled>
            희망 설문 대상을 선택해주세요.
          </option>
          <option value="학생">학생</option>
          <option value="대학생">대학생</option>
          <option value="대학원생">대학원생</option>
          <option value="직장인">직장인</option>
          <option value="교사">교사</option>
          <option value="교수">교수</option>
          <option value="프리랜서">프리랜서</option>
          <option value="자영업자">자영업자</option>
          <option value="공무원">공무원</option>
          <option value="무직">무직</option>
          <option value="기타">기타</option>
        </S.Select>
        {errors.target && <S.ErrorMessage>{errors.target}</S.ErrorMessage>}
      </S.FormRow>

      {/* 5. 카테고리 드롭다운 */}
      <S.FormRow>
        <S.Label>
          카테고리 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.Select
          hasError={!!errors.category}
          value={formData?.category || ''}
          onChange={(e) => {
            updateFormData({ category: e.target.value });
            if (errors.category) setErrors({ ...errors, category: null });
          }}
        >
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          <option value="CAREER">학업·진로</option>
          <option value="IT_AI">IT·AI</option>
          <option value="SERVICE_APP">서비스·앱</option>
          <option value="CONSUMER_MARKETING">소비·마케팅</option>
          <option value="GAME">게임</option>
          <option value="SCHOOL_LIFE">학교생활</option>
          <option value="DAILY">일상</option>
          <option value="PSYCHOLOGY">심리</option>
          <option value="ETC">기타</option>
        </S.Select>
        {errors.category && <S.ErrorMessage>{errors.category}</S.ErrorMessage>}
      </S.FormRow>

      {/* 6. 설문 기간 (시작일 고정텍스트 & 종료일 네이티브 달력) */}
      <S.FormRow style={{ marginBottom: '40px' }}>
        <S.Label>
          설문 기간 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.DateRow>
          <div style={{ flex: 1 }}>
            <S.DisabledInput
              type="text"
              value={todayDisplay || '2026.07.01'}
              disabled
            />
          </div>

          <S.DateSeparator>~</S.DateSeparator>

          <div style={{ flex: 1 }}>
            <S.DateInput
              type="date"
              hasError={!!errors.endDate}
              min={todayValue}
              placeholder="종료일 선택"
              data-placeholder="종료일 선택"
              required
              value={formData?.endDate || ''}
              onChange={(e) => {
                updateFormData({ endDate: e.target.value });
                if (errors.endDate) setErrors({ ...errors, endDate: null });
              }}
            />
          </div>
        </S.DateRow>
        {errors.endDate && (
          <S.ErrorMessage style={{ textAlign: 'right', paddingRight: '12px' }}>
            {errors.endDate}
          </S.ErrorMessage>
        )}
      </S.FormRow>

      {/* 7. 하단 고정 다음 버튼 */}
      <S.ButtonContainer>
        <Button
          onClick={handleNextClick}
          style={{
            backgroundColor: '#ECDBFF',
            color: '#5D01C6',
            fontSize: '14px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
            boxShadow: '2px 2px 2px rgba(0,0,0,0.25)',
          }}
        >
          다음
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}
