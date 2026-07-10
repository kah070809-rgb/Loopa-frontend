// Step7.jsx
import React from 'react';
import Button from '../../components/common/Button';
import Check from '../../assets/images/Group 7.svg';

export default function Step7({ onViewMySurveys, onGoHome }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        minHeight: '750px', // absolute 요소들의 기준 공간을 확보하여 흰 화면 현상 해결
        padding: '0 30px',
        position: 'relative',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* ── [중앙 성공 안내 영역] ── */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)', // 중앙 정렬
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: 'calc(100% - 60px)',
        }}
      >
        <img
          src={Check}
          alt="등록 완료 체크"
          style={{ objectFit: 'contain' }}
        />

        {/* 안내 문구 */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: '22px',
              color: '#5D01C6',
              margin: '0 0 16px 0',
            }}
          >
            설문이 성공적으로 등록되었습니다!
          </h2>
          <p
            style={{
              fontFamily: 'Pretendard-Medium',
              fontSize: '14px',
              color: '#5D01C6',
              margin: 0,
            }}
          >
            설문 응답을 기다려보세요.
          </p>
        </div>
      </div>

      {/* ── [하단 이동 버튼 영역] ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%', // 요청하신 밑에서 10% 위치 고정
          left: '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 30px',
          boxSizing: 'border-box',
        }}
      >
        <Button
          onClick={onViewMySurveys}
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
          내 설문 보러가기
        </Button>
        <Button
          onClick={onGoHome}
          style={{
            width: '100%',
            backgroundColor: '#FFF',
            color: '#5D01C6',
            border: '2px solid #ECDBFF',
            fontSize: '15px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
          }}
        >
          메인 화면 가기
        </Button>
      </div>
    </div>
  );
}
