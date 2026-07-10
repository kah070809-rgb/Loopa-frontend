import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        return;
      }

      console.log("로그인 성공:", data);

      // 백엔드에서 토큰을 준다면 저장
      // 예: data.accessToken
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      // 로그인 성공 후 메인화면 이동
      navigate("//surveyjoinfirst");
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setPasswordError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="login-page">
      <button
        className="login-back-button"
        type="button"
        onClick={() => navigate("/landing")}
      >
        ←
      </button>

      <h1 className="login-title">로그인</h1>

      <div className="login-form">
        <div className="login-input-box">
          <label className="login-label">이메일</label>

          <input
            className={`login-input ${emailError ? "login-input-error" : ""}`}
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />

          {emailError && <p className="login-error-message">{emailError}</p>}
        </div>

        <div className="login-input-box login-password-box">
          <label className="login-label">비밀번호</label>

          <div className="login-password-input-wrap">
            <input
              className={`login-input login-password-input ${
                passwordError ? "login-input-error" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />

            <button
              className="login-eye-button"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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
 onClick={() => navigate("/findpassword")}>
  비밀번호 찾기
</button>
        </div>
      </div>

      <div className="login-bottom-area">
        <button className="login-button" type="button" onClick={handleLogin}>
          로그인
        </button>

        <div className="login-divider"></div>

        <button
          className="login-signup-button"
          type="button"
          onClick={() => navigate("/register")}
        >
          회원가입
        </button>
      </div>
    </section>
  );
}

export default Login;