import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { login } from '../api/authApi';
import './Login.css';

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

      navigate(redirectTo, {
        replace: true,
      });
    } catch (error) {
      console.error('로그인 요청 실패:', error);

      const status = error.response?.status;
      const errorCode = error.response?.data?.code;

      // 1. 네트워크 연결 오류 케이스
      if (!error.response) {
        setPasswordError(
          '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.',
        );
        return;
      }

      // 2. 이메일/비밀번호 불일치 케이스
      if (status === 401 || errorCode === 'AUTH_005') {
        setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다.');
        return;
      }

      // 3. 올바르지 않은 형식의 요청 케이스
      if (status === 400 || errorCode === 'COMMON_400') {
        setPasswordError('입력한 이메일과 비밀번호를 확인해주세요.');
        return;
      }

      // 4. 백엔드 서버 내부 폭발(500) 케이스
      if (status === 500 || errorCode === 'COMMON_500') {
        setPasswordError(
          '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
        return;
      }

      // 5. 그 외 알 수 없는 에러 케이스
      setPasswordError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-page">
      <button
        className="login-back-button"
        type="button"
        onClick={() => navigate('/')}
      >
        ←
      </button>

      <h1 className="login-title">로그인</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-box">
          <label className="login-label" htmlFor="login-email">
            이메일
          </label>

          <input
            id="login-email"
            className={`login-input ${emailError ? 'login-input-error' : ''}`}
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setPasswordError('');
            }}
          />

          {emailError && <p className="login-error-message">{emailError}</p>}
        </div>

        <div className="login-input-box login-password-box">
          <label className="login-label" htmlFor="login-password">
            비밀번호
          </label>

          <div className="login-password-input-wrap">
            <input
              id="login-password"
              className={`login-input login-password-input ${passwordError ? 'login-input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요."
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
            />

            <button
              className="login-eye-button"
              type="button"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {passwordError && (
            <p className="login-error-message">{passwordError}</p>
          )}

          <button
            className="login-find-password-button"
            type="button"
            onClick={() => navigate('/findpassword')}
          >
            비밀번호 찾기
          </button>
        </div>

        <div className="login-bottom-area">
          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          <div className="login-divider" />

          <button
            className="login-signup-button"
            type="button"
            onClick={() => navigate('/register')}
          >
            계정이 있으신가요? 회원가입
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
