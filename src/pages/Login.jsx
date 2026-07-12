import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { login } from '../api/authApi';
import TextBox from '../components/common/Textbox.jsx';
import Button from '../components/common/Button.jsx';
import * as S from './Login.style.js';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || '/main';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    let hasError = false;

    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요.');
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
      hasError = true;
    }
    if (hasError || isLoading) return;

    try {
      setIsLoading(true);
      const response = await login(email.trim(), password);
      const {
        userId,
        email: loginEmail,
        tokenType,
        accessToken,
        refreshToken,
      } = response.result;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('userId', String(userId));
      localStorage.setItem('email', loginEmail);

      console.log('로그인 성공:', response);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      const status = error.response?.status;
      const errorCode = error.response?.data?.code;

      if (!error.response) {
        setPasswordError(
          '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.',
        );
        return;
      }
      if (status === 401 || errorCode === 'AUTH_005') {
        setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다.');
        return;
      }
      if (status === 400 || errorCode === 'COMMON_400') {
        setPasswordError('입력한 이메일과 비밀번호를 확인해주세요.');
        return;
      }
      if (status === 500 || errorCode === 'COMMON_500') {
        setPasswordError(
          '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
        return;
      }
      setPasswordError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={S.pageStyle}>
      <style type="text/css">{S.eyeHideScript}</style>

      {/* 로그인 메인 타이틀 */}
      <h1 style={S.titleStyle}>로그인</h1>

      <form onSubmit={handleLogin} style={S.formStyle}>
        {/* 이메일 입력 바운더리 */}
        <TextBox
          guide="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          autoComplete="email"
          error={emailError}
          errorColor="#FF0004"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
            setPasswordError('');
          }}
          style={{ marginBottom: '30px' }}
        />

        {/* 비밀번호 입력 바운더리 */}
        <div style={S.passwordWrapperStyle}>
          <TextBox
            guide="비밀번호"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            value={password}
            autoComplete="current-password"
            error={passwordError}
            errorColor="#FF0004"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            style={{ paddingRight: '60px', marginBottom: '0px' }}
          />
          {/* 패스워드 표시 토글 버튼 */}
          <button
            type="button"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShowPassword((prev) => !prev)}
            style={S.eyeButtonStyle}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        {/* 비밀번호 찾기 */}
        <div style={S.findPasswordRowStyle}>
          <button
            className="login-find-password-button"
            type="button"
            onClick={() => navigate('/findpassword')}
            style={S.findPasswordButtonStyle}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 하단 배치 영역 */}
        <div style={S.bottomAreaStyle}>
          <Button type="submit" disabled={isLoading} style={S.loginButtonStyle}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          {/* 중간 구분선 */}
          <div style={S.dividerStyle} />

          {/* 회원가입 안내 */}
          <div style={S.signupRowStyle}>
            <span style={S.signupQuestionStyle}>계정이 있으신가요?</span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={S.signupLinkButtonStyle}
            >
              회원가입
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
