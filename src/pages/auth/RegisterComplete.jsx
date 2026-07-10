import { useNavigate } from "react-router-dom";
import "./RegisterComplete.css";

function RegisterComplete() {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <section className="register-complete-page">
      <div className="register-complete-content">
        <div className="register-complete-icon-circle">
          <span className="register-complete-check">✓</span>
        </div>

        <h1 className="register-complete-title">
          회원가입이 완료되었습니다!
        </h1>

        <p className="register-complete-description">
          로그인하여 서비스를 시작해보세요.
        </p>
      </div>

      <button
        className="register-complete-login-button"
        type="button"
        onClick={handleGoLogin}
      >
        로그인하기
      </button>
    </section>
  );
}

export default RegisterComplete;