export const eyeHideScript = `
  input::-ms-reveal, input::-ms-clear { display: none; }
  input::-webkit-password-toggle-button { display: none; }
`;

export const pageStyle = {
  width: '100%',
  minHeight: '100vh',
  padding: '0 30px 30px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Pretendard, sans-serif',
};

export const titleStyle = {
  margin: '0',
  paddingTop: '130px',
  paddingBottom: '60px',
  textAlign: 'center',
  color: '#5D01C6',
  fontSize: '24px',
  fontFamily: 'Pretendard-Bold',
  fontWeight: '700',
};

export const formStyle = {
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

export const passwordWrapperStyle = {
  position: 'relative',
  width: '100%',
  display: 'block',
};

export const eyeButtonStyle = {
  position: 'absolute',
  right: '20px',
  top: '55px',
  transform: 'translateY(-50%)',
  border: 'none',
  background: 'none',
  padding: '0',
  color: '#DDBFFF',
  fontSize: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 5,
};

export const findPasswordRowStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  marginBottom: '40px',
};

export const findPasswordButtonStyle = {
  border: 'none',
  background: 'none',
  padding: '0',
  color: '#5D01C6',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
};

export const bottomAreaStyle = {
  marginTop: '70px',
  width: '100%',
};

export const loginButtonStyle = {
  height: '56px',
  borderRadius: '28px',
  backgroundColor: '#DDBFFF',
  color: '#5D01C6',
  fontSize: '16px',
  fontWeight: '700',
  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
  border: 'none',
};

export const dividerStyle = {
  width: '100%',
  height: '1px',
  margin: '36px 0 24px',
  backgroundColor: '#DDBFFF',
};

export const signupRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
};

export const signupQuestionStyle = {
  color: '#454545',
  fontSize: '14px',
  fontFamily: 'Pretendard-Bold',
  fontWeight: '700',
};

export const signupLinkButtonStyle = {
  border: 'none',
  background: 'none',
  padding: '0',
  color: '#5D01C6',
  fontSize: '14px',
  fontFamily: 'Pretendard-Bold',
  fontWeight: '700',
  cursor: 'pointer',
};
