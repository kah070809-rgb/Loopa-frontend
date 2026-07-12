import React from 'react';
import * as S from './step3.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import EmptyIconImg from '../../assets/images/Group 46.svg';

export default function Step3({
  questions = [],
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
      {/* 상단 스텝 인디케이터 구역 */}
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

      {/* ── [분기처리 영역] ── */}
      {questions.length === 0 ? (
        <S.EmptyBody>
          <S.EmptyIcon src={EmptyIconImg} alt="문항 없음 아이콘" />
          <S.EmptyText>
            아직 추가된 문항이 없어요.
            <br />
            아래 버튼을 눌러 문항을 추가해주세요.
          </S.EmptyText>
          <S.ButtonContainer>
            <Button
              onClick={onAddQuestion}
              style={{
                backgroundColor: '#ECDBFF',
                color: '#5D01C6',
                width: '80%',
                fontSize: '14px',
                fontFamily: 'Pretendard-Bold',
                padding: '16px',
                borderRadius: '30px',
                boxShadow: '2px 2px 2px rgba(0,0,0,0.25)',
              }}
            >
              문항 추가하기
            </Button>
          </S.ButtonContainer>
        </S.EmptyBody>
      ) : (
        <>
          <S.HeaderTitleBox>
            <S.MainTitle>문항 구성</S.MainTitle>
            <S.SubDescription>
              추가한 문항을 순서대로 확인하고 편집할 수 있어요.
            </S.SubDescription>
          </S.HeaderTitleBox>

          <S.ListWrapper>
            {questions.map((q, index) => (
              <S.RowContainer key={index}>
                <S.DragIcon>
                  <span>⋮⋮</span>
                  <span>⋮⋮</span>
                </S.DragIcon>

                <S.SurveyCard>
                  <S.CardContent>
                    <S.CardTitle>
                      Q{index + 1}. {q.title}
                    </S.CardTitle>
                    <S.CardType>{getTypeString(q)}</S.CardType>
                  </S.CardContent>
                  <S.EditBtn onClick={() => onEditQuestion(index)}>
                    편집
                  </S.EditBtn>
                </S.SurveyCard>
              </S.RowContainer>
            ))}
          </S.ListWrapper>

          {/* 하단 제어 바 */}
          <S.BottomFixedBar>
            <Button
              onClick={onAddQuestion}
              style={{
                width: '100%',
                backgroundColor: '#ECDBFF',
                color: '#5D01C6',
                padding: '16px',
                borderRadius: '30px',
                fontFamily: 'Pretendard-Bold',
                marginBottom: '12px',
              }}
            >
              문항 추가하기
            </Button>
            <S.BottomFlexGroup>
              <Button
                onClick={onPrev}
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  color: '#5D01C6',
                  border: '2px solid #ECDBFF',
                  padding: '16px',
                  borderRadius: '30px',
                  fontFamily: 'Pretendard-Bold',
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
                  padding: '16px',
                  borderRadius: '30px',
                  fontFamily: 'Pretendard-Bold',
                }}
              >
                다음
              </Button>
            </S.BottomFlexGroup>
          </S.BottomFixedBar>
        </>
      )}
    </S.Container>
  );
}
