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
`;

export const Label = styled.label`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 18px;
  color: #000000;
  display: block;
`;

export const RequiredStar = styled.span`
  color: #ef4444;
`;

// --- 커스텀 드롭다운 & 인풋 ---
export const Select = styled.select`
  width: 100%;
  padding: 16px 24px;
  border-radius: 20px;
  border: 2px solid #a855f7;
  outline: none;
  font-size: 16px;
  color: #ddbfff;
  background-color: #fff;
  box-sizing: border-box;
  appearance: none;
  margin: 0 0 20px 0;
  cursor: pointer;
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
  text-align: center;
  box-sizing: border-box;
  font-weight: 600;
`;

export const DateSeparator = styled.span`
  color: #a855f7;
  font-weight: bold;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 24px;
  border: 2px solid #a855f7;
  color: #a855f7;
  font-size: 16px;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  font-weight: 600;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;
