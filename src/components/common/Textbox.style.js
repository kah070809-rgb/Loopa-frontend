// TextBox.style.js

export const wrapperStyle = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'left',
};

export const labelStyle = {
  fontFamily: 'Pretendard-Bold',
  marginBottom: '10px',
  fontSize: '14px',
  color: '#5D01C6',
  display: 'flex',
  alignItems: 'center',
};

export const getContainerStyle = (error, errorColor = '#FF2EAB') => ({
  width: '100%',
  padding: '18px 24px',
  borderRadius: '20px',
  border: error ? `2px solid ${errorColor}` : '2px solid #5D01C6',
  fontSize: '16px',
  color: '#000000',
  backgroundColor: '#FFF',
  boxSizing: 'border-box',
  outline: 'none',
  fontfamily: 'Pretendard-SemiBold',
});

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
