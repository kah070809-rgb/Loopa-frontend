import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./FindPassword.css";

function FindPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [emailMessageType, setEmailMessageType] = useState("");
  const [codeMessageType, setCodeMessageType] = useState("");

  // 임시 인증번호
  // 나중에 백엔드 연동하면 이 비교는 백엔드 응답으로 바뀜
  const mockCode = "123456";

  const handleGoLogin = () => {
    navigate("/login");
  };

  const handleSendCode = async () => {
    setEmailMessage("");
    setCodeMessage("");
    setPasswordMessage("");

    if (!email.trim()) {
      setEmailMessage("이메일을 입력하세요.");
      setEmailMessageType("error");
      return;
    }

    // 나중에 여기서 백엔드에 인증번호 발송 요청
    // await fetch("http://localhost:8080/api/auth/password/code", ...)

    setIsCodeSent(true);
    setEmailMessage("인증번호가 발송되었습니다.");
    setEmailMessageType("success");
  };

  const handleVerifyCode = () => {
    setCodeMessage("");

    if (!code.trim()) {
      setCodeMessage("인증번호를 입력하세요.");
      setCodeMessageType("error");
      return false;
    }

    if (code !== mockCode) {
      setIsCodeVerified(false);
      setCodeMessage("인증번호가 일치하지 않습니다.");
      setCodeMessageType("error");
      return false;
    }

    setIsCodeVerified(true);
    setCodeMessage("인증번호가 일치합니다.");
    setCodeMessageType("success");
    return true;
  };

  const handleCodeChange = (event) => {
  const value = event.target.value;

  setCode(value);
  setCodeMessage("");

  if (!value.trim()) {
    setIsCodeVerified(false);
    return;
  }

  if (value === mockCode) {
    setIsCodeVerified(true);
    setCodeMessage("인증번호가 일치합니다.");
    setCodeMessageType("success");
  } else {
    setIsCodeVerified(false);
    setCodeMessage("인증번호가 일치하지 않습니다.");
    setCodeMessageType("error");
  }
};

  const handleChangePassword = async () => {
    let hasError = false;

    setEmailMessage("");
    setCodeMessage("");
    setPasswordMessage("");

    if (!email.trim()) {
      setEmailMessage("이메일을 입력하세요.");
      setEmailMessageType("error");
      hasError = true;
    }

    if (!code.trim()) {
      setCodeMessage("인증번호를 입력하세요.");
      setCodeMessageType("error");
      hasError = true;
    } else if (code !== mockCode) {
      setCodeMessage("인증번호가 일치하지 않습니다.");
      setCodeMessageType("error");
      hasError = true;
    } else {
      setIsCodeVerified(true);
      setCodeMessage("인증번호가 일치합니다.");
      setCodeMessageType("success");
    }

    if (!newPassword.trim()) {
      setPasswordMessage("새 비밀번호를 입력하세요.");
      hasError = true;
    }

    if (hasError) return;

    // 나중에 여기서 백엔드에 비밀번호 변경 요청
    // await fetch("http://localhost:8080/api/auth/password/change", ...)

    navigate("/passwordchangecomplete");
  };

  return (
    <section className="find-password-page">
      <button
        className="find-password-back-button"
        type="button"
        onClick={handleGoLogin}
      >
        ←
      </button>

      <h1 className="find-password-title">비밀번호 찾기</h1>

      <div className="find-password-form">
        <div className="find-password-input-box">
          <label className="find-password-label">이메일</label>

          <div className="find-password-email-row">
            <input
              className={`find-password-input ${
                emailMessageType === "error" ? "find-password-input-error" : ""
              }`}
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              className="find-password-code-button"
              type="button"
              onClick={handleSendCode}
            >
              인증번호 받기
            </button>
          </div>

          {emailMessage && (
            <p className={`find-password-message ${emailMessageType}`}>
              {emailMessage}
            </p>
          )}
        </div>

        <div className="find-password-input-box">
          <label className="find-password-label">인증번호</label>

          <input
           className={`find-password-input ${
           codeMessageType === "error" ? "find-password-input-error" : ""
           }`}
           type="text"
           placeholder="인증번호를 입력해주세요."
           value={code}
           onChange={handleCodeChange}
         />

          <div className="find-password-code-message-row">
            {codeMessage && (
              <p className={`find-password-message ${codeMessageType}`}>
                {codeMessage}
              </p>
            )}

            {isCodeSent && (
              <button
                className="find-password-resend-button"
                type="button"
                onClick={handleSendCode}
              >
                인증번호 재발송
              </button>
            )}
          </div>
        </div>

        {isCodeVerified && (
          <>
            <div className="find-password-line" />

            <div className="find-password-input-box">
              <label className="find-password-label">새 비밀번호</label>

              <div className="find-password-password-row">
                <input
                  className={`find-password-input find-password-password-input ${
                    passwordMessage ? "find-password-input-error" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="새 비밀번호를 입력하세요."
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />

                <button
                  className="find-password-eye-button"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

              {passwordMessage && (
                <p className="find-password-message error">
                  {passwordMessage}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <button
        className="find-password-submit-button"
        type="button"
        onClick={handleChangePassword}
      >
        비밀번호 변경하기
      </button>
    </section>
  );
}

export default FindPassword;