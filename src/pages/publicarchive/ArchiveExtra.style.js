import styled from 'styled-components';

// 기본 페이지 레이아웃 컨테이너
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

// --- [1] 헤더 영역 ---
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

// --- [2] 검색 바 영역 (surveylist 명세서 완벽 동기화) ---
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

// 💡 래퍼 제거하고 명세서에 있던 styled.img 규격으로 복구 완료!
export const SearchIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

// --- [3] 카테고리 칩 가로 스크롤 영역 ---
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
  box-sizing: border-box;
  transition: all 0.15s ease;
`;

// --- [4] 카드 리스트 및 묶음 정렬 영역 ---
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// --- [5] 하단 무한 스크롤 더보기 액션 버튼 ---
export const LoadMoreButton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 28px;
  border: none;
  border-radius: 24px;
  background-color: #ecdbff;
  color: #5d01c6;
  font-size: 15px;
  font-weight: bold;
  font-family: 'Pretendard-Bold';
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #ddbfff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px 0;
  color: #5d01c6;
  font-size: 14px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px 0;
  color: #5d01c6;
  font-size: 14px;
`;
