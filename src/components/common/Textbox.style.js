// TextBox.style.js

export const wrapperStyle = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'left',
};

// 가이드 제목(라벨) 스타일
export const labelStyle = {
  fontFamily: 'Pretendard-Bold',
  marginBottom: '10px',
  fontSize: '14px',
  color: '#5D01C6',
  display: 'flex',
  alignItems: 'center',
};

export const getContainerStyle = (error) => ({
  width: '100%',
  padding: '18px 24px', // ⭕ 크기를 큼직하고 시원하게 조절했습니다.
  borderRadius: '20px',
  border: error ? '2px solid #FF2EAB' : '2px solid #5D01C6', // ⭕ 선명한 진보라 테두리로 통일!
  fontSize: '16px',
  color: '#000000', // ⭕ 입력창 글자색 무조건 블랙 고정!
  backgroundColor: '#FFF',
  boxSizing: 'border-box',
  outline: 'none',
});

// 하단 에러 및 글자수 영역 스타일
export const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '6px',
  fontSize: '14px',
  padding: '0 8px',
};

export const placeholderScript = `
  .custom-textbox-input::placeholder {
    color: #DDBFFF !important;
    opacity: 1;
  }
`;
