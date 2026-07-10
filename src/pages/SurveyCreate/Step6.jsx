import React, { useState } from 'react';
import Button from '../../components/common/Button';
// ⭐️ 가져오신 화살표 이미지를 import 합니다. 이름은 down으로 맞춰둘게요!
import down from '../../assets/images/Group 6.svg';

export default function Step6({ formData, onNext, onPrev }) {
  // 디자인 확인용 더미 데이터
  const dummyData = {
    title: '대학생 공모전 참여 경험 조사',
    category: '학업 진로',
    period: '2026.07.01 ~ 2026.07.13',
    target: '대학생',
    totalQuestions: 4,
    objQuestions: 3,
    subjQuestions: 1,
    currentTokens: 82,
  };

  // 예상 소요 시간 (1분 ~ 60분)
  const [estimatedTime, setEstimatedTime] = useState(1);
  const timeOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  // 토큰 비용 계산 공식
  const baseCost = 10;
  const objCost = dummyData.objQuestions * 3;
  const subjCost = dummyData.subjQuestions * 5;
  const totalCost = baseCost + objCost + subjCost;
  const remainingTokens = dummyData.currentTokens - totalCost;

  const InfoRow = ({ label, value, isBold = false }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}
    >
      <span
        style={{
          fontSize: '14px',
          color: '#5D01C6',
          fontFamily: isBold ? 'Pretendard-Bold' : 'Pretendard-Medium',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '14px',
          color: '#5D01C6',
          fontFamily: isBold ? 'Pretendard-Bold' : 'Pretendard-Medium',
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        padding: '20px 30px 160px 30px',
        position: 'relative',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* ── [1. 상단 인디케이터] ── */}
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
            완료
          </span>
        </div>
      </div>

      {/* ── [2. 타이틀] ── */}
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h2
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '20px',
            color: '#5D01C6',
            margin: '0',
          }}
        >
          최종 확인
        </h2>
      </div>

      {/* ── [3. 기본 정보 섹션] ── */}
      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '16px',
            color: '#5D01C6',
            textAlign: 'left',
            margin: '0 0 12px 0',
          }}
        >
          기본 정보
        </h3>
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#ECDBFF',
            marginBottom: '16px',
          }}
        />
        <InfoRow label="설문 제목" value={dummyData.title} />
        <InfoRow label="카테고리" value={dummyData.category} />
        <InfoRow label="설문 기간" value={dummyData.period} />
        <InfoRow label="설문 대상" value={dummyData.target} />
      </div>

      {/* ── [4. 문항 정보 섹션] ── */}
      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '16px',
            color: '#5D01C6',
            textAlign: 'left',
            margin: '0 0 12px 0',
          }}
        >
          문항 정보
        </h3>
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#ECDBFF',
            marginBottom: '16px',
          }}
        />
        <InfoRow label="총 문항 수" value={`${dummyData.totalQuestions}문항`} />
        <InfoRow label="객관식" value={`${dummyData.objQuestions}문항`} />
        <InfoRow label="주관식" value={`${dummyData.subjQuestions}문항`} />
      </div>

      {/* ── [5. 예상 소요 시간 드롭다운 (아이콘 추가 버전)] ── */}
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}
      >
        <h3
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '16px',
            color: '#5D01C6',
            margin: '0 24px 0 0',
          }}
        >
          예상 소요 시간
        </h3>

        {/* 둥근 사각형 커스텀 select 컨테이너 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
              style={{
                padding: '12px 40px 12px 24px', // ⭕ 화살표 공간 확보를 위해 오른쪽 패딩을 더 넓힘
                borderRadius: '20px', // 피그마와 일치하는 부드러운 라운딩
                border: '2px solid #ECDBFF', // 연보라색 테두리
                color: '#5D01C6',
                fontFamily: 'Pretendard-Bold',
                fontSize: '16px',
                outline: 'none',
                appearance: 'none', // 브라우저 기본 화살표 완벽 제거
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundColor: '#FFF',
                minWidth: '100px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {timeOptions.map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>

            {/* ⭐️ 피그마에서 따오신 아래 화살표 이미지 커스텀 배치 */}
            <img
              src={down}
              alt="아래 화살표"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                pointerEvents: 'none', // 👈 중요: 화살표를 눌러도 select가 열리도록 클릭 이벤트를 통과시킵니다.
                objectFit: 'contain',
              }}
            />
          </div>
          <span
            style={{
              color: '#5D01C6',
              fontFamily: 'Pretendard-Medium',
              fontSize: '15px',
              marginLeft: '4px',
            }}
          >
            분
          </span>
        </div>
      </div>

      {/* ── [6. 예상 비용 섹션] ── */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: '16px',
            color: '#5D01C6',
            textAlign: 'left',
            margin: '0 0 16px 0',
          }}
        >
          예상 비용
        </h3>
        <div
          style={{
            border: '1.5px solid #ECDBFF',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <InfoRow label="기본 설문 등록" value={`${baseCost} 토큰`} />
            <InfoRow
              label={`객관식 (${dummyData.objQuestions}문항)`}
              value={`${objCost} 토큰`}
            />
            <InfoRow
              label={`주관식 (${dummyData.subjQuestions}문항)`}
              value={`${subjCost} 토큰`}
            />
          </div>
          <div style={{ backgroundColor: '#F0E5FF', padding: '16px 20px' }}>
            <InfoRow
              label="총 예상 비용"
              value={`${totalCost} 토큰`}
              isBold={true}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#F0E5FF',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <InfoRow
            label="보유 토큰"
            value={`${dummyData.currentTokens} 토큰`}
            isBold={true}
          />
          <InfoRow
            label="등록 후 잔여 토큰"
            value={`${remainingTokens} 토큰`}
            isBold={true}
          />
        </div>
      </div>

      {/* ── [7. 하단 이전/등록하기 고정 버튼] ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          width: '100%',
          display: 'flex',
          gap: '16px',
          padding: '0 30px',
          boxSizing: 'border-box',
        }}
      >
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
          onClick={() => {
            // ⭐️ 토큰 계산 로직을 기반으로 분기 처리 진행
            // (현재 dummyData 기준: 보유 82, 필요 24 이므로 정상 팝업이 뜸)
            // 테스트용 팁: dummyData의 currentTokens를 12로 바꾸면 부족 팝업이 뜹니다!
            const hasEnoughTokens = dummyData.currentTokens >= totalCost;

            if (hasEnoughTokens) {
              // 1️⃣ [팝업 1] 토큰이 충분할 때 (Frame 641)
              const isConfirmed = window.confirm(
                `총 ${totalCost}토큰이 차감됩니다.\n등록하시겠습니까?\n\n현재 보유 토큰: ${dummyData.currentTokens} 토큰\n차감 후 잔여: ${remainingTokens} 토큰`,
              );

              if (isConfirmed) {
                onNext(); // 정상 등록 진행 -> Step7으로 이동
              }
            } else {
              // 2️⃣ [팝업 2] 토큰이 부족할 때 (Frame 642)
              // confirm 창에서 '확인'을 누르면 '토큰 받기' 액션을 취한 것으로 가정합니다.
              const isGoToEarnTokens = window.confirm(
                `보유 토큰이 부족합니다.\n\n현재 보유 토큰: ${dummyData.currentTokens} 토큰\n필요한 토큰: ${totalCost} 토큰\n\n'확인'을 누르면 [설문 참여하고 토큰 받기]로 이동합니다.`,
              );

              if (isGoToEarnTokens) {
                alert('설문 참여 화면(토큰 충전소)으로 이동하는 로직 위치');
                // 여기선 다음(Step7)으로 가지 않고 현재 화면에 머무르거나 라우팅 처리를 합니다.
              }
            }
          }}
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
          등록하기
        </Button>
      </div>
    </div>
  );
}
