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
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

export const HeaderIcon = styled.img`
  height: 24px;
  cursor: pointer;
  object-fit: contain;
`;

// --- Search Bar Area ---
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid #5d01c6;
  border-radius: 30px;
  padding: 4px 8px 4px 20px;
  margin-bottom: 24px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #5d01c6;
  background-color: transparent;

  &::placeholder {
    color: #ddbfff;
  }
`;

export const SearchIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

// --- Category Chip Area ---
export const CategoryScrollBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding-bottom: 6px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const CategoryButton = styled.button`
  padding: 7px 16px;
  border-radius: 20px;
  border: ${({ $isSelected }) => ($isSelected ? 'none' : '1px solid #DDBFFF')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#DDBFFF' : '#ffffff')};
  color: #5d01c6;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
`;

// --- Survey List Area ---
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SurveyCard = styled.div`
  background-color: ${({ $isFirst }) => ($isFirst ? '#DDBFFF' : '#F8F2FF')};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #5d01c6;
  font-weight: bold;
`;

export const CardSubtitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 11px;
  color: #5d01c6;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryBadge = styled.span`
  background-color: #ffffff;
  color: #5d01c6;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 12px;
`;

export const DurationText = styled.span`
  font-size: 12px;
  color: #5d01c6;
`;

export const ParticipateLink = styled.span`
  font-size: 13px;
  color: #5d01c6;
  font-weight: bold;
  cursor: pointer;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #5d01c6;
  font-size: 14px;
`;
