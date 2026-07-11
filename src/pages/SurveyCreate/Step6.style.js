import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 20px 30px 160px 30px;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// --- 상단 인디케이터 ---
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

export const InactiveCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ecdbff;
  border-radius: 50%;
`;

export const ActiveCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #5d01c6;
  border-radius: 50%;
`;

export const StepLine = styled.div`
  width: 15%;
  height: 2.5px;
  background-color: #ecdbff;
  transform: translateY(-9px);
`;

export const StepLabel = styled.span`
  font-size: 12px;
  color: #5d01c6;
  font-family: 'Pretendard-SemiBold';
  margin-top: 8px;
`;

// --- 섹션 공통 헤더 ---
export const MainTitleBox = styled.div`
  text-align: left;
  margin-bottom: 24px;
`;

export const MainTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  color: #5d01c6;
  margin: 0;
`;

export const SectionWrapper = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  color: #5d01c6;
  text-align: left;
  margin: 0 0 12px 0;
`;

export const BorderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ecdbff;
  margin-bottom: 16px;
`;

// --- 테이블 영수증 로우 ---
export const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const RowText = styled.span`
  font-size: 14px;
  color: #5d01c6;
  font-family: ${({ $isBold }) => ($isBold ? 'Pretendard-Bold' : 'Pretendard-Medium')};
`;

// --- 예상 소요 시간 드롭다운 ---
export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RelativeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectBox = styled.select`
  padding: 12px 40px 12px 24px;
  border-radius: 20px;
  border: 2px solid #ecdbff;
  color: #5d01c6;
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  min-width: 100px;
  text-align: left;
  cursor: pointer;
`;

export const CustomArrow = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  pointer-events: none;
  object-fit: contain;
`;

export const UnitText = styled.span`
  color: #5d01c6;
  font-family: 'Pretendard-Medium';
  font-size: 15px;
  margin-left: 4px;
`;

// --- 영수증 박스 그룹 ---
export const ReceiptBox = styled.div`
  border: 1.5px solid #ecdbff;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const ReceiptBody = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReceiptTotalFooter = styled.div`
  background-color: #f0e5ff;
  padding: 16px 20px;
`;

export const TokenBalanceBox = styled.div`
  background-color: #f0e5ff;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// --- 하단 고정 바 ---
export const BottomFixedBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 0 30px;
  box-sizing: border-box;
`;
