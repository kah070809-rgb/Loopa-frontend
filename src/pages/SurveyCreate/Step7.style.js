import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 750px;
  padding: 0 30px;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// --- 중앙 성공 안내 영역 ---
export const SuccessBody = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: calc(100% - 60px);
`;

export const SuccessIcon = styled.img`
  object-fit: contain;
`;

export const TextBox = styled.div`
  text-align: center;
`;

export const MainTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 22px;
  color: #5d01c6;
  margin: 0 0 16px 0;
`;

export const SubDescription = styled.p`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  color: #5d01c6;
  margin: 0;
`;

// --- 하단 이동 버튼 영역 ---
export const BottomFixedBar = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 30px;
  box-sizing: border-box;
`;
