import styled from 'styled-components';
import React from 'react';

const AppLayout = ({ children }) => {
  return (
    <Background>
      <MobileContainer>{children}</MobileContainer>
    </Background>
  );
};

// 바깥쪽 영역
const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  background-color: #f1f3f5;
`;

// 실제 모바일 화면 영역
const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  max-height: 850px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default AppLayout;
