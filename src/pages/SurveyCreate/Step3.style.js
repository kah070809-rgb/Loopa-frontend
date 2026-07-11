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

export const InactiveCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ddbfff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActiveCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #5d01c6;
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

// --- 문항 없음 안내 본문 영역 ---
export const EmptyBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-bottom: 140px;
`;

export const EmptyIcon = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

export const EmptyText = styled.div`
  margin: 0;
  font-family: 'Pretendard-SemiBold';
  color: #5d01c6;
  font-size: 15px;
  line-height: 1.6;
  text-align: center;
`;

// --- 하단 버튼 컨테이너 ---
export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;
