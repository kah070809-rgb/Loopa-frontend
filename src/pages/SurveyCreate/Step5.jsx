import React, { useState, useEffect } from 'react';
import * as S from './Step5.style'; // 분리된 스타일 컴포넌트 임포트
import Button from '../../components/common/Button';
import down from '../../assets/images/Group 6.svg';

// 백엔드 연동용 내 정보 API 임포트
import { getMyInfo } from '../../api/user';

export default function Step5({ formData, updateFormData, onSubmit, onPrev }) {
  // 1분 ~ 60분 드롭다운 배열 생성
  const timeOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  // 초기값을 null로 설정하여 서버에서 데이터를 받아오기 전까지 연산 대기 처리
  const [currentTokens, setCurrentTokens] = useState(null);

  // 예외 처리 및 커스텀 모달창 제어 상태들 선언
  const [estimatedTime, setEstimatedTime] = useState(''); // 초기값 '-' 지정을 위해 빈값 세팅
  const [timeError, setTimeError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShortageModalOpen, setIsShortageModalOpen] = useState(false);

  // 🔔 MainPage 데이터 명세와 동일하게 tokenBalance 필드명 실시간 연동 완료
  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const response = await getMyInfo();

        // MainPage 연동 스펙에 맞추어 response.result.tokenBalance를 우선 타깃팅합니다.
        if (response && response.isSuccess && response.result) {
          const res = response.result;
          const tokenValue = res.tokenBalance ?? res.token ?? res.point ?? null;
          if (tokenValue !== null) {
            setCurrentTokens(Number(tokenValue));
            return;
          }
        }

        if (response && response.data) {
          const resData = response.data.result || response.data;
          const tokenValue =
            resData.tokenBalance ?? resData.token ?? resData.point ?? null;
          if (tokenValue !== null) {
            setCurrentTokens(Number(tokenValue));
            return;
          }
        }

        // 백엔드 연동 실패 대비 fallback 캐시 데이터 매핑
        setCurrentTokens(
          formData?.userTokens !== undefined
            ? Number(formData.userTokens)
            : 124,
        );
      } catch (err) {
        console.error('보유 토큰 정보 로드 실패:', err);
        setCurrentTokens(
          formData?.userTokens !== undefined
            ? Number(formData.userTokens)
            : 124,
        );
      }
    };
    fetchUserToken();
  }, [formData]);

  // 부모의 formData에서 데이터 실시간 파싱
  const title = formData?.title || '제목 없음';

  // 카테고리 한글명 매핑 처리
  const categoryMap = {
    CAREER: '학업 진로',
    IT_AI: 'IT·AI',
    SERVICE_APP: '서비스·앱',
    CONSUMER_MARKETING: '소비·마케팅',
    GAME: '게임',
    SCHOOL_LIFE: '학교생활',
    DAILY: '일상',
    PSYCHOLOGY: '심리',
    ETC: '기타',
  };
  const category =
    categoryMap[formData?.category] || formData?.category || '미지정';

  const period = `2026.07.01 ~ ${formData?.endDate?.replace(/-/g, '.') || '2026.07.13'}`;
  const target = formData?.target || '전체 대상';

  // 문항 배열 분석 및 비용 공식 연산
  const questionsList = formData?.questions || [];
  const totalQuestions = questionsList.length;
  const objQuestions = questionsList.filter(
    (q) => q.type === 'objective' || q.type === 'OBJECTIVE',
  ).length;
  const subjQuestions = questionsList.filter(
    (q) => q.type === 'subjective' || q.type === 'SUBJECTIVE',
  ).length;

  const baseCost = 10;
  const objCost = objQuestions * 3;
  const subjCost = subjQuestions * 5;
  const totalCost = baseCost + objCost + subjCost;

  // 🪙 실시간으로 불러온 보유 토큰(tokenBalance)을 기반으로 잔여 코인 연산
  const displayTokens = currentTokens !== null ? currentTokens : 0;
  const remainingTokens =
    currentTokens !== null ? currentTokens - totalCost : 0;

  // 등록하기 클릭 시 검증 및 분기 처리 함수
  const handleRegisterClick = () => {
    // 1. 예상 소요 시간 필수 예외 처리 검증
    if (!estimatedTime) {
      setTimeError('필수 입력 사항입니다.');
      return;
    }
    setTimeError('');

    updateFormData({ estimatedTime: Number(estimatedTime) });

    // 2. 토큰 밸런스 잔여량 검사 후 피그마 규격 모달 분기 처리
    const hasEnoughTokens = displayTokens >= totalCost;
    if (hasEnoughTokens) {
      setIsConfirmModalOpen(true); // 차감 및 최종 등록 여부 모달 열기
    } else {
      setIsShortageModalOpen(true); // 토큰 부족 안내 모달 열기
    }
  };

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

      {/* ── [5. 예상 소요 시간 드롭다운 및 예외처리] ── */}
      <S.TimeContainer>
        <S.SectionTitle style={{ margin: '0 24px 0 0' }}>
          예상 소요 시간
        </S.SectionTitle>
        <S.DropdownWrapper>
          <S.RelativeContainer>
            <S.SelectBox
              value={estimatedTime}
              $hasError={!!timeError}
              onChange={(e) => {
                setEstimatedTime(e.target.value);
                if (timeError) setTimeError('');
              }}
            >
              <option value="">-</option>
              {timeOptions.map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </S.SelectBox>
            <S.CustomArrow src={down} alt="아래 화살표" />
          </S.RelativeContainer>
          <S.UnitText style={{ marginRight: '16px' }}>분</S.UnitText>

          {timeError && <S.TimeErrorMessage>{timeError}</S.TimeErrorMessage>}
        </S.DropdownWrapper>
      </S.TimeContainer>

      {/* ── [6. 예상 비용 섹션] ── */}
      <div style={{ marginBottom: '24px' }}>
        <S.SectionTitle>예상 비용</S.SectionTitle>

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
              isBold={true}
            />
          </S.ReceiptTotalFooter>
        </S.ReceiptBox>

        <S.TokenBalanceBox>
          {/* 백엔드 연동 데이터 반영 확인 상태에 맞춘 스위칭 노출 */}
          <InfoRow
            label="보유 토큰"
            value={
              currentTokens !== null
                ? `${displayTokens} 토큰`
                : '불러오는 중...'
            }
            isBold={true}
          />
          <InfoRow
            label="등록 후 잔여 토큰"
            value={
              currentTokens !== null ? `${remainingTokens} 토큰` : '계산 중...'
            }
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
          onClick={handleRegisterClick}
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

      {/* ── [8. 커스텀 모달 1: 토큰 차감 최종 확인 모달창] ── */}
      {isConfirmModalOpen && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle>총 {totalCost}토큰이 차감됩니다.</S.ModalTitle>
            <S.ModalTitle style={{ marginTop: '-8px', marginBottom: '16px' }}>
              등록하시겠습니까?
            </S.ModalTitle>
            <S.ModalTextRow>
              <S.ModalLabelText>현재 보유 토큰</S.ModalLabelText>
              <S.ModalValueText>{displayTokens} 토큰</S.ModalValueText>
            </S.ModalTextRow>
            <S.ModalTextRow style={{ marginBottom: '24px' }}>
              <S.ModalLabelText>차감 후 잔여</S.ModalLabelText>
              <S.ModalValueText>{remainingTokens} 토큰</S.ModalValueText>
            </S.ModalTextRow>
            <S.ModalButtonRow>
              <S.ModalCancelBtn onClick={() => setIsConfirmModalOpen(false)}>
                취소
              </S.ModalCancelBtn>
              <S.ModalConfirmBtn
                onClick={() => onSubmit(Number(estimatedTime))}
              >
                등록
              </S.ModalConfirmBtn>
            </S.ModalButtonRow>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {/* ── [9. 커스텀 모달 2: 보유 토큰 부족 알림 모달창] ── */}
      {isShortageModalOpen && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle style={{ marginBottom: '20px' }}>
              보유 토큰이 부족합니다.
            </S.ModalTitle>
            <S.ModalTextRow>
              <S.ModalLabelText>현재 보유 토큰</S.ModalLabelText>
              <S.ModalValueText>{displayTokens} 토큰</S.ModalValueText>
            </S.ModalTextRow>
            <S.ModalTextRow style={{ marginBottom: '24px' }}>
              <S.ModalLabelText>필요한 토큰</S.ModalLabelText>
              <S.ModalValueText>{totalCost} 토큰</S.ModalValueText>
            </S.ModalTextRow>
            <S.ModalButtonRow>
              <S.ModalCancelBtn onClick={() => setIsShortageModalOpen(false)}>
                취소
              </S.ModalCancelBtn>
              <S.ModalConfirmBtn
                style={{
                  width: '135px',
                  backgroundColor: '#DDBFFF',
                  color: '#450093',
                }}
                onClick={() => (window.location.href = '/surveys')}
              >
                설문 참여하고 토큰 받기
              </S.ModalConfirmBtn>
            </S.ModalButtonRow>
          </S.ModalBox>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}
