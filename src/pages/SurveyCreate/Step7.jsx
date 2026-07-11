import React from 'react';
import * as S from './step7.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import Check from '../../assets/images/Group 7.svg';

export default function Step7({ onViewMySurveys, onGoHome }) {
  return (
    <S.Container>
      {/* ── [중앙 성공 안내 영역] ── */}
      <S.SuccessBody>
        <S.SuccessIcon src={Check} alt="등록 완료 체크" />

        {/* 안내 문구 */}
        <S.TextBox>
          <S.MainTitle>설문이 성공적으로 등록되었습니다!</S.MainTitle>
          <S.SubDescription>설문 응답을 기다려보세요.</S.SubDescription>
        </S.TextBox>
      </S.SuccessBody>

      {/* ── [하단 이동 버튼 영역] ── */}
      <S.BottomFixedBar>
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
      </S.BottomFixedBar>
    </S.Container>
  );
}
