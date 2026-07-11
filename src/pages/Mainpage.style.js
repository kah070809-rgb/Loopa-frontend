import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 30px 24px 40px 24px;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  font-family:
    'Pretendard',
    -apple-system,
    sans-serif;

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

// --- Header Area ---
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Logo = styled.img`
  height: 28px;
  object-fit: contain;
`;

export const AuthBtn = styled.button`
  width: 62px;
  height: 27px;
  border-radius: 14px;
  border: 1.5px solid #ddbfff;
  background-color: #ffffff;
  color: #5d01c6;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
`;

// --- User & Guest Card Area ---
export const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1.5px solid #ddbfff;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: ${({ $isGuest }) => ($isGuest ? 'pointer' : 'default')};
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const FlexGroup = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #5d01c6;
  flex-shrink: 0;
`;

export const Greeting = styled.p`
  margin: 0;
  font-size: 12px;
  color: #5d01c6;
`;

export const EmailTitle = styled.h3`
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: bold;
  color: #5d01c6;
`;

export const GuestDesc = styled.p`
  margin: 0;
  font-size: 12px;
  color: #5d01c6;
  line-height: 1.5;
`;

export const TokenBox = styled.div`
  text-align: right;
`;

export const TokenLabel = styled.span`
  font-size: 11px;
  color: #5d01c6;
  font-weight: bold;
`;

export const TokenCount = styled.p`
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #5d01c6;
  opacity: 0.7;
`;

export const MySurveyBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const MySurveyBtn = styled.button`
  padding: 8px 24px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(
    90deg,
    rgba(183, 119, 255, 0.4) 0%,
    rgba(236, 219, 255, 0.4) 100%
  );
  color: #5d01c6;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
`;

// --- Banner Area ---
export const BannerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #b777ff 0%, #ecdbff 51%);
  border-radius: 20px;
  padding: 20px 24px;
  margin-bottom: 32px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const BannerTitle = styled.h3`
  margin: 0;
  color: #5d01c6;
  font-size: 16px;
  font-weight: bold;
`;

export const BannerDesc = styled.p`
  margin: 0;
  color: #5d01c6;
  font-size: 11px;
`;

export const CircleIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 50%;
`;

// --- Section Header ---
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  color: #5d01c6;
  font-weight: bold;
  font-family: 'Pretendard-Bold';
`;

export const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #5d01c6;
  font-size: 12px;
  font-weight: bold;
`;

// --- Category Area ---
export const CategoryScrollBox = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 6px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: ${({ $isSelected }) => ($isSelected ? 'none' : '1.5px solid #EADDFF')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#DDBFFF' : '#ffffff')};
  color: #5d01c6;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  flex-shrink: 0;
  min-width: max-content;
  transition: all 0.15s ease;
`;

// --- Survey List Area ---
export const SurveyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const SurveyCard = styled.div`
  border: ${({ $isSelected }) => ($isSelected ? 'none' : '2px solid #EADDFF')};
  border-radius: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ $isSelected }) => ($isSelected ? '#DDBFFF' : '#ffffff')};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: ${({ $isSelected }) => ($isSelected ? '155px' : '115px')};
  box-sizing: border-box;
`;

export const SurveyTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #5d01c6;
  font-weight: bold;
  line-height: 1.4;
  word-break: keep-all;
`;

export const SurveyInfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SurveyInfoText = styled.p`
  margin: 0;
  font-size: 11px;
  color: #5d01c6;
  opacity: 0.8;
  white-space: ${({ $nowrap }) => ($nowrap ? 'nowrap' : 'normal')};
`;

export const ParticipateBtn = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 8px 0;
  border-radius: 10px;
  border: none;
  background-color: #ffffff;
  color: #5d01c6;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(93, 1, 198, 0.08);
`;

export const EmptyMessage = styled.div`
  grid-column: span 2;
  text-align: center;
  padding: 30px 20px;
  color: #5d01c6;
  font-size: 13px;
`;

// --- Archive Area ---
export const ArchiveCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f2ff;
  border-radius: 20px;
  padding: 20px 24px;
  cursor: pointer;
  box-sizing: border-box;
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
  background-color: #ddbfff;
  width: 280px;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

export const PopupTitle = styled.p`
  margin: 0 0 24px 0;
  color: #5d01c6;
  font-size: 15px;
  font-weight: bold;
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

export const PopupLoginBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #5d01c6;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
`;
