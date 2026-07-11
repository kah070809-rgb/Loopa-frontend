import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 30px 30px 40px 30px;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
`;

// --- Header Area ---
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #5d01c6;
`;

export const LogoutBtn = styled.button`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #ddbfff;
  background-color: #ffffff;
  color: #5d01c6;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

// --- Profile Card Area ---
export const ProfileCard = styled.div`
  background: linear-gradient(90deg, #ebe0ff 0%, #ddbfff 100%);
  border-radius: 16px;
  padding: 28px 24px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(93, 1, 198, 0.05);
`;

export const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #5d01c6;
`;

export const ProfileGreeting = styled.p`
  margin: 0;
  font-size: 12px;
  color: #5d01c6;
`;

export const ProfileEmail = styled.h3`
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: bold;
  color: #5d01c6;
`;

export const TokenWrapper = styled.div`
  margin-left: auto;
  text-align: right;
`;

export const TokenLabel = styled.span`
  font-size: 11px;
  color: #5d01c6;
`;

export const TokenCount = styled.p`
  margin: 2px 0 0 0;
  font-size: 14px;
  font-weight: bold;
  color: #5d01c6;
`;

// --- Tab Area ---
export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ebe0ff;
  margin-bottom: 24px;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: transparent;
  border: none;
  border-bottom: ${({ $isActive }) => ($isActive ? '3px solid #5D01C6' : '3px solid transparent')};
  color: ${({ $isActive }) => ($isActive ? '#5D01C6' : '#A070D6')};
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : '600')};
  cursor: pointer;
  transition: all 0.2s;
`;

// --- List & Card Area ---
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RegisteredCard = styled.div`
  background-color: #ddbfff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const ViewedCard = styled.div`
  background-color: ${({ $isFirst }) => ($isFirst ? '#DDBFFF' : '#F8F2FF')};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: ${({ $isFirst }) => ($isFirst ? 'none' : '1px solid #EBE0FF')};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 15px;
  color: #5d01c6;
  font-weight: bold;
`;

export const StatusBadge = styled.span`
  background-color: ${({ $status }) => ($status === '진행 중' ? '#ffffff' : '#F8F2FF')};
  color: #5d01c6;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  opacity: ${({ $status }) => ($status === '종료' ? 0.7 : 1)};
`;

export const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const CardDate = styled.p`
  margin: 0 0 16px 0;
  font-size: 11px;
  color: #5d01c6;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardInfoText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #5d01c6;
  font-weight: 500;
`;

export const DetailLink = styled.span`
  font-size: 12px;
  color: #5d01c6;
  font-weight: bold;
  cursor: pointer;
`;

// --- Popup Area ---
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

export const PopupBox = styled.div`
  background-color: #eae0ff;
  width: 280px;
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
`;

export const PopupTitle = styled.p`
  margin: 0 0 8px 0;
  color: #5d01c6;
  font-size: 15px;
  font-weight: bold;
`;

export const PopupDesc = styled.p`
  margin: 0 0 24px 0;
  color: #5d01c6;
  font-size: 11px;
  opacity: 0.8;
`;

export const PopupBtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const PopupCancelBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  color: #5d01c6;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
`;

export const PopupDeleteBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #ddbfff;
  color: #5d01c6;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
`;
