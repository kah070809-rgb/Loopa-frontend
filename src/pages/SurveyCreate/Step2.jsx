import React from 'react';
import * as S from './step2.style'; // 분리된 스타일 컴포넌트 임포트
import TextBox from '../../components/common/TextBox';
import Button from '../../components/common/Button';

export default function Step2({ formData, updateFormData, onNext }) {
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

      {/* 2. 설문 제목 (TextBox 사용) */}
      <TextBox
        guide="설문 제목"
        required={true}
        limit={100}
        currentLength={formData?.title?.length || 0}
        placeholder="설문 제목을 입력해주세요."
        value={formData?.title || ''}
        onChange={(e) => updateFormData({ title: e.target.value })}
      />

      {/* 3. 설문 설명 (TextBox 주관식 모드 사용) */}
      <TextBox
        guide="설문 설명 (선택)"
        isTextArea={true}
        limit={1000}
        currentLength={formData?.description?.length || 0}
        placeholder="설문에 대한 설명을 입력해주세요."
        value={formData?.description || ''}
        onChange={(e) => updateFormData({ description: e.target.value })}
      />

      {/* 4. 희망 설문 대상 드롭다운 */}
      <S.FormRow>
        <S.Label>
          희망 설문 대상 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.Select
          defaultValue={formData?.target || ''}
          onChange={(e) => updateFormData({ target: e.target.value })}
        >
          <option value="" disabled>
            희망 설문 대상을 선택해주세요.
          </option>
          <option value="1">학생</option>
          <option value="2">대학생</option>
          <option value="3">대학원생</option>
          <option value="4">직장인</option>
          <option value="5">교사</option>
          <option value="6">교수</option>
          <option value="7">프리랜서</option>
          <option value="8">자영업자</option>
          <option value="9">공무원</option>
          <option value="10">무직</option>
          <option value="11">기타</option>
        </S.Select>
      </S.FormRow>

      {/* 5. 카테고리 드롭다운 */}
      <S.FormRow>
        <S.Label>
          카테고리 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.Select
          defaultValue={formData?.category || ''}
          onChange={(e) => updateFormData({ category: e.target.value })}
        >
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          <option value="1">학업·진로</option>
          <option value="2">IT·AI</option>
          <option value="3">서비스·앱</option>
          <option value="4">소비·마케팅</option>
          <option value="5">게임</option>
          <option value="6">학교생활</option>
          <option value="7">일상</option>
          <option value="8">심리</option>
          <option value="9">기타</option>
        </S.Select>
      </S.FormRow>

      {/* 6. 설문 기간 (시작일 고정텍스트 & 종료일 네이티브 달력) */}
      <S.FormRow style={{ marginBottom: '40px' }}>
        <S.Label>
          설문 기간 <S.RequiredStar>*</S.RequiredStar>
        </S.Label>
        <S.DateRow>
          {/* 시작일 배경 회색 비활성 칸 */}
          <div style={{ flex: 1 }}>
            <S.DisabledInput type="text" value="2026.07.01" disabled />
          </div>

          <S.DateSeparator>~</S.DateSeparator>

          {/* 종료일 클릭하면 달력 뜨는 인풋 */}
          <div style={{ flex: 1 }}>
            <S.DateInput
              type="date"
              value={formData?.endDate || ''}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
            />
          </div>
        </S.DateRow>
      </S.FormRow>

      {/* 7. 하단 고정 다음 버튼 */}
      <S.ButtonContainer>
        <Button
          onClick={onNext}
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
