import { useNavigate } from "react-router-dom";
import "./PasswordChangeComplete.css";

function PasswordChangeComplete() {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <section className="password-complete-page">
      <div className="password-complete-content">
        <div className="password-complete-icon-circle">
          <span className="password-complete-check">✓</span>
        </div>

        <h1 className="password-complete-title">
          비밀번호가 변경되었습니다!
        </h1>

        <p className="password-complete-description">
          새로운 비밀번호로 로그인해주세요.
        </p>
      </div>

      <button
        className="password-complete-login-button"
        type="button"
        onClick={handleGoLogin}
      >
        로그인하기
      </button>
    </section>
  );
}

export default PasswordChangeComplete;