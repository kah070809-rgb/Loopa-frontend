import React from 'react';
import * as S from './step5.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';

export default function Step5({
  questions = [], // 백엔드 연동을 위해 빈 배열 기본값 지정
  onAddQuestion,
  onEditQuestion,
  onNext,
  onPrev,
}) {
  const getTypeString = (q) => {
    if (q.type === 'subjective') return '주관식';
    return `객관식 (${q.isMultiple ? '다중 선택' : '단일 선택'})`;
  };

  return (
    <S.Container>
      {/* ── [1. 상단 스텝 동그라미 인디케이터] ── */}
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
          <S.InactiveCircle />
          <S.StepLabel>완료</S.StepLabel>
        </S.StepWrapper>
      </S.IndicatorContainer>

      {/* ── [2. 타이틀 및 설명] ── */}
      <S.HeaderTitleBox>
        <S.MainTitle>문항 구성</S.MainTitle>
        <S.SubDescription>
          추가한 문항을 순서대로 확인하고 편집할 수 있어요.
        </S.SubDescription>
      </S.HeaderTitleBox>

      {/* ── [3. 문항 리스트 렌더링 영역] ── */}
      <S.ListWrapper>
        {questions.map((q, index) => (
          <S.RowContainer key={q.id || index}>
            {/* 좌측 드래그 아이콘 모양 */}
            <S.DragIcon>
              <span>⋮⋮</span>
              <span>⋮⋮</span>
            </S.DragIcon>

            {/* 문항 카드 */}
            <S.SurveyCard>
              <S.CardContent>
                <S.CardTitle>
                  Q{index + 1}. {q.title}
                </S.CardTitle>
                <S.CardType>{getTypeString(q)}</S.CardType>
              </S.CardContent>
              <S.EditBtn onClick={() => onEditQuestion(q.id)}>편집</S.EditBtn>
            </S.SurveyCard>
          </S.RowContainer>
        ))}
      </S.ListWrapper>

      {/* ── [4. 하단 고정 버튼 영역] ── */}
      <S.BottomFixedBar>
        {/* 문항 추가하기 버튼 */}
        <Button
          onClick={onAddQuestion}
          style={{
            width: '100%',
            backgroundColor: '#ECDBFF',
            color: '#5D01C6',
            border: 'none',
            fontSize: '15px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
          }}
        >
          문항 추가하기
        </Button>

        {/* 이전 / 다음 버튼 그룹 */}
        <S.BottomFlexGroup>
          <Button
            onClick={onPrev}
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              color: '#5D01C6',
              border: '2px solid #ECDBFF',
              fontSize: '15px',
              fontFamily: 'Pretendard-Bold',
              padding: '16px',
              borderRadius: '30px',
            }}
          >
            이전
          </Button>
          <Button
            onClick={onNext}
            style={{
              flex: 1,
              backgroundColor: '#ECDBFF',
              color: '#5D01C6',
              border: 'none',
              fontSize: '15px',
              fontFamily: 'Pretendard-Bold',
              padding: '16px',
              borderRadius: '30px',
            }}
          >
            다음
          </Button>
        </S.BottomFlexGroup>
      </S.BottomFixedBar>
    </S.Container>
  );
}
