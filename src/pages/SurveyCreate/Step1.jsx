import React from 'react';
import Button from '../../components/common/Button';
import Checklist from '../../assets/images/Group 41.svg';

export default function Step1({ formData, updateFormData, onNext, onExit }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img
        src={Checklist}
        alt="설문 일러스트"
        style={{ objectFit: 'contain' }}
      />

      {/* 메인 타이틀 */}
      <h2
        style={{
          fontFamily: 'Pretendard-Bold',
          color: '#5D01C6',
          lineHeight: '1.4',
          marginBottom: '50px',
          textAlign: 'center',
          fontSize: '21px',
        }}
      >
        새로운 설문을 만들어
        <br />
        다양한 의견을 모아보세요!
      </h2>

      {/* 특징 리스트 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <div>
          <h4
            style={{
              margin: '0 0 8px 0',
              fontFamily: 'Pretendard-SemiBold',
              color: '#5D01C6',
              fontSize: '14px',
            }}
          >
            간편한 설문 제작
          </h4>
          <p
            style={{
              margin: 0,
              color: '#5D01C6',
              fontFamily: 'Pretendard-Regular',
              fontSize: '11px',
            }}
          >
            몇 번의 클릭으로 설문을 만들 수 있어요.
          </p>
        </div>
        <div>
          <h4
            style={{
              margin: '0 0 8px 0',
              fontFamily: 'Pretendard-SemiBold',
              color: '#5D01C6',
              fontSize: '14px',
            }}
          >
            데이터 수집
          </h4>
          <p
            style={{
              margin: 0,
              color: '#5D01C6',
              fontFamily: 'Pretendard-Regular',
              fontSize: '11px',
            }}
          >
            다양한 문항으로 원하는 데이터를 모아보세요.
          </p>
        </div>
        <div>
          <h4
            style={{
              margin: '0 0 8px 0',
              fontFamily: 'Pretendard-SemiBold',
              color: '#5D01C6',
              fontSize: '14px',
            }}
          >
            빠른 결과 확인
          </h4>
          <p
            style={{
              margin: 0,
              color: '#5D01C6',
              fontFamily: 'Pretendard-Regular',
              fontSize: '11px',
            }}
          >
            응답 결과를 실시간으로 확인할 수 있어요.
          </p>
        </div>
      </div>

      {/* 시작 버튼 */}
      <div style={{ width: '78%', paddingBottom: '20px' }}>
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
          설문 만들기 시작
        </Button>
      </div>
    </div>
  );
}
