import React from 'react';
import * as S from './Step1.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import Checklist from '../../assets/images/Group 41.svg';

export default function Step1({ formData, updateFormData, onNext, onExit }) {
  return (
    <S.Container>
      <S.Illustration src={Checklist} alt="설문 일러스트" />

      {/* 메인 타이틀 */}
      <S.MainTitle>
        새로운 설문을 만들어
        <br />
        다양한 의견을 모아보세요!
      </S.MainTitle>

      {/* 특징 리스트 */}
      <S.FeatureList>
        <S.FeatureItem>
          <S.FeatureTitle>간편한 설문 제작</S.FeatureTitle>
          <S.FeatureDesc>몇 번의 클릭으로 설문을 만들 수 있어요.</S.FeatureDesc>
        </S.FeatureItem>

        <S.FeatureItem>
          <S.FeatureTitle>데이터 수집</S.FeatureTitle>
          <S.FeatureDesc>
            다양한 문항으로 원하는 데이터를 모아보세요.
          </S.FeatureDesc>
        </S.FeatureItem>

        <S.FeatureItem>
          <S.FeatureTitle>빠른 결과 확인</S.FeatureTitle>
          <S.FeatureDesc>
            응답 결과를 실시간으로 확인할 수 있어요.
          </S.FeatureDesc>
        </S.FeatureItem>
      </S.FeatureList>

      {/* 시작 버튼 */}
      <S.ButtonWrapper>
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
      </S.ButtonWrapper>
    </S.Container>
  );
}
