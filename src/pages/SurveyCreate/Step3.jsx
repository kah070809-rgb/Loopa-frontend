import React from 'react';
import Button from '../../components/common/Button';
import Icon from '../../assets/images/Group 46.svg';

export default function Step3({ formData, updateFormData, onNext, onExit }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          padding: '0 30px',
          position: 'relative',
          paddingBottom: '50px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* 상단 스텝 동그라미 인디케이터 껍데기 */}
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
                backgroundColor: '#DDBFFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: '#450093',
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
              backgroundColor: '#DDBFFF',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: '#450093',
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
              backgroundColor: '#DDBFFF',
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
                backgroundColor: '#E9D5FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: '#450093',
                fontFamily: 'Pretendard-SemiBold',
                marginTop: '8px',
              }}
            >
              완료
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          paddingBottom: '140px',
        }}
      >
        <img
          src={Icon}
          alt="문항 없음 아이콘"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
          }}
        />
        <div
          style={{
            margin: 0,
            fontFamily: 'Pretendard-SemiBold',
            color: '#5D01C6',
            fontSize: '15px',
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          아직 추가된 문항이 없어요.
          <br />
          아래 버튼을 눌러 문항을 추가해주세요.
        </div>
      </div>

      <div
        style={{
          width: '100%',
          paddingBottom: '20px',
          display: 'flex',

          justifyContent: 'center', // 위쪽 여백을 자동으로 채워서 버튼을 아래로 내립니다.
        }}
      >
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
      </div>
    </div>
  );
}
