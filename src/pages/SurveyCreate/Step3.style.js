import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 30px;
  position: relative;
  padding-bottom: 160px;
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

// --- 문항 없음 안내 본문 영역 (상황 A) ---
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

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

// ── ✨ [여기서부터 에러 해결을 위해 구 Step5에서 긁어와 병합한 스타일들] ──
export const HeaderTitleBox = styled.div`
  text-align: left;
  margin-bottom: 24px;
`;

export const MainTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  color: #5d01c6;
  margin: 0 0 8px 0;
`;

export const SubDescription = styled.p`
  font-family: 'Pretendard-Medium';
  font-size: 13px;
  color: #5d01c6;
  margin: 0;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DragIcon = styled.div`
  color: #ddbfff;
  font-size: 20px;
  letter-spacing: -2px;
  display: flex;
  flex-direction: column;
  line-height: 0.6;
  user-select: none;
`;

export const SurveyCard = styled.div`
  flex: 1;
  background-color: #f0e5ff;
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  padding-right: 12px;
`;

export const CardTitle = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 14px;
  color: #5d01c6;
  line-height: 1.4;
`;

export const CardType = styled.span`
  font-family: 'Pretendard-Medium';
  font-size: 12px;
  color: #5d01c6;
`;

export const EditBtn = styled.button`
  background-color: #fff;
  color: #5d01c6;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-family: 'Pretendard-SemiBold';
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const BottomFixedBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  box-sizing: border-box;
`;

export const BottomFlexGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;
