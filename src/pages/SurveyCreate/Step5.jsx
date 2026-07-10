import React from 'react';
import Button from '../../components/common/Button';

export default function Step5({
  questions,
  onAddQuestion,
  onEditQuestion,
  onNext,
  onPrev,
}) {
  // 개발용 더미 데이터
  const dummyQuestions = questions || [
    {
      id: 1,
      type: 'objective',
      title: '공모전에 참여한 경험이 있나요?',
      isMultiple: false,
    },
    {
      id: 2,
      type: 'objective',
      title: '최근 1년동안 공모전에 몇 번 참여했나요?',
      isMultiple: false,
    },
    {
      id: 3,
      type: 'subjective',
      title:
        '학교에서 공모전 참여를 위해 가장 필요하다고 생각하는 지원은 무엇인가요?',
    },
    {
      id: 4,
      type: 'objective',
      title: '공모전에 참여하지 않는 가장 큰 이유는 무엇인가요?',
      isMultiple: true,
    },
  ];

  const getTypeString = (q) => {
    if (q.type === 'subjective') return '주관식';
    return `객관식 (${q.isMultiple ? '다중 선택' : '단일 선택'})`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        // ⭕ 원래 코드의 안전한 여백 구조로 완전 복구했습니다! (좌우 스크롤 방지 및 화면 고정)
        padding: '20px 30px 160px 30px', // 위 20px(상태바 잘림 방지), 좌우 30px, 아래 160px(버튼 여백)
        position: 'relative',
        boxSizing: 'border-box',
        overflowX: 'hidden', // 혹시 모를 좌우 밀림 현상을 브라우저 단에서 완전 차단합니다.
      }}
    >
      {/* ── [1. 상단 스텝 동그라미 인디케이터] ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px 0 35px 0',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#ECDBFF',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            기본정보
          </span>
        </div>
        <div
          style={{
            width: '15%',
            height: '2.5px',
            backgroundColor: '#ECDBFF',
            transform: 'translateY(-9px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#5D01C6',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            문항 구성
          </span>
        </div>
        <div
          style={{
            width: '15%',
            height: '2.5px',
            backgroundColor: '#ECDBFF',
            transform: 'translateY(-9px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ECDBFF',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            완료
          </span>
        </div>
      </div>

      {/* ── [2. 타이틀 및 설명] ── */}
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h2
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '20px',
            color: '#5D01C6',
            margin: '0 0 8px 0',
          }}
        >
          문항 구성
        </h2>
        <p
          style={{
            fontFamily: 'Pretendard-Medium',
            fontSize: '13px',
            color: '#5D01C6',
            margin: 0,
          }}
        >
          추가한 문항을 순서대로 확인하고 편집할 수 있어요.
        </p>
      </div>

      {/* ── [3. 문항 리스트 렌더링 영역] ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {dummyQuestions.map((q, index) => (
          <div
            key={q.id || index}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            {/* 좌측 드래그 아이콘 */}
            <div
              style={{
                color: '#DDBFFF',
                fontSize: '20px',
                letterSpacing: '-2px',
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '0.6',
              }}
            >
              <span>⋮⋮</span>
              <span>⋮⋮</span>
            </div>

            {/* 문항 카드 */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#F0E5FF',
                borderRadius: '16px',
                padding: '20px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textAlign: 'left',
                  paddingRight: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Pretendard-Bold',
                    fontSize: '14px',
                    color: '#5D01C6',
                    lineHeight: '1.4',
                  }}
                >
                  Q{index + 1}. {q.title}
                </span>
                <span
                  style={{
                    fontFamily: 'Pretendard-Medium',
                    fontSize: '12px',
                    color: '#5D01C6',
                  }}
                >
                  {getTypeString(q)}
                </span>
              </div>
              <button
                onClick={() => onEditQuestion(q.id)}
                style={{
                  backgroundColor: '#FFF',
                  color: '#5D01C6',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontFamily: 'Pretendard-SemiBold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                편집
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── [4. 하단 고정 버튼 영역] ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 30px',
          boxSizing: 'border-box',
        }}
      >
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

        {/* 이전 / 다음 버튼 */}
        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
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
        </div>
      </div>
    </div>
  );
}
