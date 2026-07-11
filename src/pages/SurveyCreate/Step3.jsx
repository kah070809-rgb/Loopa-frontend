import React from 'react';
import * as S from './step3.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import Icon from '../../assets/images/Group 46.svg';

export default function Step3({ formData, updateFormData, onNext, onExit }) {
  return (
    <S.Container>
      {/* 1. 상단 스텝 동그라미 인디케이터 */}
      <S.IndicatorContainer>
        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>기본정보</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.ActiveCircle />
          <S.StepLabel>문항 구성</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.LastCircle />
          <S.StepLabel>완료</S.StepLabel>
        </S.StepWrapper>
      </S.IndicatorContainer>

      {/* 2. 문항 없음 안내 본문 영역 */}
      <S.EmptyBody>
        <S.EmptyIcon src={Icon} alt="문항 없음 아이콘" />
        <S.EmptyText>
          아직 추가된 문항이 없어요.
          <br />
          아래 버튼을 눌러 문항을 추가해주세요.
        </S.EmptyText>
      </S.EmptyBody>

      {/* 3. 하단 고정 문항 추가하기 버튼 */}
      <S.ButtonContainer>
        <Button
          onClick={onNext}
          style={{
            backgroundColor: '#ECDBFF',
            color: '#5D01C6',
            width: '80%',
            fontSize: '14px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
            boxShadow: '2px 2px 2px rgba(0,0,0,0.25)',
            alignItems: 'center',
          }}
        >
          문항 추가하기
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}
