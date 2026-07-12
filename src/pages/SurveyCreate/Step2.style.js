import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 30px;
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
`;

// --- 상단 스텝 인디케이터 ---
export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 35px 0;
  gap: 8px;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActiveCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #5d01c6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InactiveCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #ddbfff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LastCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e9d5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepLine = styled.div`
  width: 15%;
  height: 2.5px;
  background-color: #ddbfff;
  transform: translateY(-9px);
`;

export const StepLabel = styled.span`
  font-size: 12px;
  color: #450093;
  font-family: 'Pretendard-SemiBold';
  margin-top: 8px;
`;

// --- 폼 타이틀 및 레이블 ---
export const SubTitle = styled.h3`
  font-family: 'Pretendard-Bold';
  color: #5d01c6;
  margin: 0 0 15px 0;
  text-align: left;
`;

export const FormRow = styled.div`
  text-align: left;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  margin-bottom: 12px;
  font-size: 14px;
  color: #000000;
  display: block;
`;

export const RequiredStar = styled.span`
  color: #ef4444;
`;

// --- 에러 문구 색상 사양 (#FF2EAB, 12px, Regular) ---
export const ErrorMessage = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  color: #ff2eab;
  margin: 6px 0 10px 4px;
`;

// --- 커스텀 드롭다운 & 인풋 ---
export const Select = styled.select`
  width: 100%;
  padding: 16px 24px;
  border-radius: 20px;
  border: 2px solid ${({ hasError }) => (hasError ? '#FF2EAB' : '#a855f7')};
  outline: none;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  color: #000000;
  background-color: #fff;
  box-sizing: border-box;
  appearance: none;
  margin: 0 0 4px 0;
  cursor: pointer;

  &:invalid,
  option[value=''] {
    color: #ddbfff;
  }
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DisabledInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 24px;
  border: 2px solid #e5e7eb;
  background-color: #f3f4f6;
  color: #9ca3af;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  text-align: center;
  box-sizing: border-box;
  font-weight: 600;
`;

export const DateSeparator = styled.span`
  color: #a855f7;
  font-weight: bold;
`;

// --- 종료일 날짜 인풋창 커스텀 (투박한 기본 년-월-일 숨기기 및 플레이스홀더 적용) ---
export const DateInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 24px;
  border: 2px solid ${({ hasError }) => (hasError ? '#FF2EAB' : '#a855f7')};
  color: #000000;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  text-align: center;
  box-sizing: border-box;
  outline: none;
  font-weight: 600;
  cursor: pointer;
  background-color: #fff;
  position: relative;

  /* 기본 브라우저의 년-월-일 플레이스홀더 글자 강제 제거 및 커스텀 구현 */
  &::-webkit-datetime-edit-text,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field {
    display: ${({ value }) => (value ? 'inline' : 'none')};
  }

  /* 값이 입력되지 않았을 때 나타나는 피그마용 플레이스홀더 구성 */
  &::before {
    content: attr(data-placeholder);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ddbfff; /* 피그마 지정 연보라 색상 */
    font-family: 'Pretendard-Regular';
    display: ${({ value }) => (value ? 'none' : 'block')};
    width: 100%;
    text-align: center;
  }

  /* 기본 선택 달력 아이콘 스타일 유지 및 위치 정렬 */
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

// --- 이탈 방지 팝업 모달 스타일 ---
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(128, 128, 128, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const PopupBox = styled.div`
  width: 280px;
  height: 155px;
  background-color: #ecdbff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  box-sizing: border-box;
`;

export const PopupTitle = styled.h4`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: #5d01c6;
  margin: 0 0 10px 0;
`;

export const PopupDesc = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  color: #000000;
  margin: 0 0 20px 0;
  text-align: center;
`;

export const PopupButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const PopupCancelBtn = styled.button`
  width: 77px;
  height: 24px;
  background-color: #ffffff;
  color: #5d01c6;
  font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupConfirmBtn = styled.button`
  width: 108px;
  height: 24px;
  background-color: #ddbfff;
  color: #450093;
  font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
