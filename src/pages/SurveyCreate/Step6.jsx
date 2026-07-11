import React, { useState } from 'react';
import * as S from './step6.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import down from '../../assets/images/Group 6.svg';

export default function Step6({ formData, updateFormData, onNext, onPrev }) {
  // 1분 ~ 60분 드롭다운 배열 생성
  const timeOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  // 🔔 백엔드 연동 설계 파이프라인: 부모의 formData에서 데이터 실시간 파싱
  const title = formData?.title || '제목 없음';
  const category = formData?.category || '미지정';
  const period = `2026.07.01 ~ ${formData?.endDate?.replace(/-/g, '.') || '2026.07.13'}`;
  const target = formData?.target || '전체 대상';

  // 문항 배열 분석
  const questionsList = formData?.questions || [];
  const totalQuestions = questionsList.length;
  const objQuestions = questionsList.filter(
    (q) => q.type === 'objective',
  ).length;
  const subjQuestions = questionsList.filter(
    (q) => q.type === 'subjective',
  ).length;

  // 유저 보유 토큰 상태 (추후 전역이나 상태에서 연동)
  const currentTokens = formData?.userTokens || 124;

  // 🪙 API 명세서 스펙 토큰 차감 공식 실시간 연동 (10 + 객관식*3 + 주관식*5)
  const baseCost = 10;
  const objCost = objQuestions * 3;
  const subjCost = subjQuestions * 5;
  const totalCost = baseCost + objCost + subjCost;
  const remainingTokens = currentTokens - totalCost;

  // 모듈식 재사용 테이블 로우 컴포넌트
  const InfoRow = ({ label, value, isBold = false }) => (
    <S.RowBox>
      <S.RowText $isBold={isBold}>{label}</S.RowText>
      <S.RowText $isBold={isBold}>{value}</S.RowText>
    </S.RowBox>
  );

  return (
    <S.Container>
      {/* ── [1. 상단 인디케이터] ── */}
      <S.IndicatorContainer>
        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>기본정보</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>문항 구성</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.ActiveCircle />
          <S.StepLabel>완료</S.StepLabel>
        </S.StepWrapper>
      </S.IndicatorContainer>

      {/* ── [2. 타이틀] ── */}
      <S.MainTitleBox>
        <S.MainTitle>최종 확인</S.MainTitle>
      </S.MainTitleBox>

      {/* ── [3. 기본 정보 섹션] ── */}
      <S.SectionWrapper>
        <S.SectionTitle>기본 정보</S.SectionTitle>
        <S.BorderLine />
        <InfoRow label="설문 제목" value={title} />
        <InfoRow label="카테고리" value={category} />
        <InfoRow label="설문 기간" value={period} />
        <InfoRow label="설문 대상" value={target} />
      </S.SectionWrapper>

      {/* ── [4. 문항 정보 섹션] ── */}
      <S.SectionWrapper>
        <S.SectionTitle>문항 정보</S.SectionTitle>
        <S.BorderLine />
        <InfoRow label="총 문항 수" value={`${totalQuestions}문항`} />
        <InfoRow label="객관식" value={`${objQuestions}문항`} />
        <InfoRow label="주관식" value={`${subjQuestions}문항`} />
      </S.SectionWrapper>

      {/* ── [5. 예상 소요 시간 드롭다운] ── */}
      <S.TimeContainer>
        <S.SectionTitle style={{ margin: '0 24px 0 0' }}>
          예상 소요 시간
        </S.SectionTitle>
        <S.DropdownWrapper>
          <S.RelativeContainer>
            <S.SelectBox
              value={formData?.estimatedTime || 1}
              onChange={(e) =>
                updateFormData({ estimatedTime: Number(e.target.value) })
              }
            >
              {timeOptions.map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </S.SelectBox>
            <S.CustomArrow src={down} alt="아래 화살표" />
          </S.RelativeContainer>
          <S.UnitText>분</S.UnitText>
        </S.DropdownWrapper>
      </S.TimeContainer>

      {/* ── [6. 예상 비용 섹션] ── */}
      <div style={{ marginBottom: '24px' }}>
        <S.SectionTitle>예상 비용</S.SectionTitle>

        {/* 상세 정산 내역 박스 */}
        <S.ReceiptBox>
          <S.ReceiptBody>
            <InfoRow label="기본 설문 등록" value={`${baseCost} 토큰`} />
            <InfoRow
              label={`객관식 (${objQuestions}문항)`}
              value={`${objCost} 토큰`}
            />
            <InfoRow
              label={`주관식 (${subjQuestions}문항)`}
              value={`${subjCost} 토큰`}
            />
          </S.ReceiptBody>
          <S.ReceiptTotalFooter>
            <InfoRow
              label="총 예상 비용"
              value={`${totalCost} 토큰`}
              fill
              isBold={true}
            />
          </S.ReceiptTotalFooter>
        </S.ReceiptBox>

        {/* 잔여 토큰 정산 박스 */}
        <S.TokenBalanceBox>
          <InfoRow
            label="보유 토큰"
            value={`${currentTokens} 토큰`}
            isBold={true}
          />
          <InfoRow
            label="등록 후 잔여 토큰"
            value={`${remainingTokens} 토큰`}
            isBold={true}
          />
        </S.TokenBalanceBox>
      </div>

      {/* ── [7. 하단 고정 제어 바] ── */}
      <S.BottomFixedBar>
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
            // 토큰 분기 임시 팝업 연동 조건 제어
            const hasEnoughTokens = currentTokens >= totalCost;

            if (hasEnoughTokens) {
              const isConfirmed = window.confirm(
                `총 ${totalCost}토큰이 차감됩니다. 등록하시겠습니까?`,
              );
              if (isConfirmed) onNext(); // Step7 성공 화면 진입
            } else {
              alert(
                '보유 토큰이 부족합니다. 설문 참여하고 토큰을 충전해 주세요.',
              );
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
      </S.BottomFixedBar>
    </S.Container>
  );
}
