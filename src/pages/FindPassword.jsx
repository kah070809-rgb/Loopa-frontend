import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./FindPassword.css";

import {
  sendVerificationCode,
  verifyVerificationCode,
  resetPassword,
  VERIFICATION_PURPOSE,
} from "../api/authApi";

function FindPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isResettingPassword, setIsResettingPassword] =
    useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [emailMessageType, setEmailMessageType] = useState("");
  const [codeMessageType, setCodeMessageType] = useState("");

  const handleGoLogin = () => {
    navigate("/login");
  };

  const getErrorMessage = (error, defaultMessage) => {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      defaultMessage
    );
  };

  // 인증번호 발송
  const handleSendCode = async () => {
    const trimmedEmail = email.trim();

    setEmailMessage("");
    setCodeMessage("");
    setPasswordMessage("");

    if (!trimmedEmail) {
      setEmailMessage("이메일을 입력하세요.");
      setEmailMessageType("error");
      return;
    }

    try {
      setIsSendingCode(true);

      await sendVerificationCode(
        trimmedEmail,
        VERIFICATION_PURPOSE.PASSWORD_RESET
      );

      setIsCodeSent(true);
      setIsCodeVerified(false);
      setCode("");

      setEmailMessage("인증번호가 발송되었습니다.");
      setEmailMessageType("success");
    } catch (error) {
      console.error("인증번호 발송 실패:", error);

      setIsCodeSent(false);
      setIsCodeVerified(false);

      setEmailMessage(
        getErrorMessage(
          error,
          "인증번호 발송에 실패했습니다. 다시 시도해주세요."
        )
      );
      setEmailMessageType("error");
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증번호 검증
  const handleVerifyCode = async () => {
    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();

    setCodeMessage("");
    setPasswordMessage("");

    if (!trimmedEmail) {
      setEmailMessage("이메일을 입력하세요.");
      setEmailMessageType("error");
      return;
    }

    if (!isCodeSent) {
      setCodeMessage("먼저 인증번호를 발송해주세요.");
      setCodeMessageType("error");
      return;
    }

    if (!trimmedCode) {
      setCodeMessage("인증번호를 입력하세요.");
      setCodeMessageType("error");
      return;
    }

    try {
      setIsVerifyingCode(true);

      await verifyVerificationCode(
        trimmedEmail,
        trimmedCode,
        VERIFICATION_PURPOSE.PASSWORD_RESET
      );

      setIsCodeVerified(true);
      setCodeMessage("인증번호가 확인되었습니다.");
      setCodeMessageType("success");
    } catch (error) {
      console.error("인증번호 검증 실패:", error);

      setIsCodeVerified(false);
      setCodeMessage(
        getErrorMessage(
          error,
          "인증번호가 일치하지 않거나 만료되었습니다."
        )
      );
      setCodeMessageType("error");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    // 인증번호를 받은 뒤 이메일을 바꾸면 다시 인증해야 함
    if (isCodeSent || isCodeVerified) {
      setIsCodeSent(false);
      setIsCodeVerified(false);
      setCode("");
      setCodeMessage("");
    }

    setEmailMessage("");
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setCodeMessage("");

    // 이미 인증된 인증번호를 수정하면 인증 상태 해제
    if (isCodeVerified) {
      setIsCodeVerified(false);
    }
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordMessage("");
  };

  // 비밀번호 재설정
  const handleChangePassword = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = newPassword.trim();

    setEmailMessage("");
    setCodeMessage("");
    setPasswordMessage("");

    if (!trimmedEmail) {
      setEmailMessage("이메일을 입력하세요.");
      setEmailMessageType("error");
      return;
    }

    if (!isCodeVerified) {
      setCodeMessage("인증번호 확인을 완료해주세요.");
      setCodeMessageType("error");
      return;
    }

    if (!trimmedPassword) {
      setPasswordMessage("새 비밀번호를 입력하세요.");
      return;
    }

    try {
      setIsResettingPassword(true);

      await resetPassword(trimmedEmail, trimmedPassword);

      navigate("/passwordchangecomplete");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);

      setPasswordMessage(
        getErrorMessage(
          error,
          "비밀번호 변경에 실패했습니다. 다시 시도해주세요."
        )
      );
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <section className="find-password-page">
      <button
        className="find-password-back-button"
        type="button"
        onClick={handleGoLogin}
        aria-label="로그인 페이지로 돌아가기"
      >
        ←
      </button>

      <h1 className="find-password-title">비밀번호 찾기</h1>

      <div className="find-password-form">
        <div className="find-password-input-box">
          <label
            className="find-password-label"
            htmlFor="find-password-email"
          >
            이메일
          </label>

          <div className="find-password-email-row">
            <input
              id="find-password-email"
              className={`find-password-input ${
                emailMessageType === "error"
                  ? "find-password-input-error"
                  : ""
              }`}
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={handleEmailChange}
              disabled={isSendingCode}
            />

            <button
              className="find-password-code-button"
              type="button"
              onClick={handleSendCode}
              disabled={isSendingCode}
            >
              {isSendingCode
                ? "발송 중..."
                : isCodeSent
                  ? "다시 받기"
                  : "인증번호 받기"}
            </button>
          </div>

          {emailMessage && (
            <p
              className={`find-password-message ${emailMessageType}`}
            >
              {emailMessage}
            </p>
          )}
        </div>

        <div className="find-password-input-box">
          <label
            className="find-password-label"
            htmlFor="find-password-code"
          >
            인증번호
          </label>

          <div className="find-password-code-input-row">
            <input
              id="find-password-code"
              className={`find-password-input ${
                codeMessageType === "error"
                  ? "find-password-input-error"
                  : ""
              }`}
              type="text"
              inputMode="numeric"
              placeholder="인증번호를 입력해주세요."
              value={code}
              onChange={handleCodeChange}
              disabled={!isCodeSent || isVerifyingCode}
            />

            <button
              className="find-password-verify-button"
              type="button"
              onClick={handleVerifyCode}
              disabled={
                !isCodeSent ||
                !code.trim() ||
                isVerifyingCode ||
                isCodeVerified
              }
            >
              {isVerifyingCode
                ? "확인 중..."
                : isCodeVerified
                  ? "확인 완료"
                  : "인증 확인"}
            </button>
          </div>

          <div className="find-password-code-message-row">
            {codeMessage && (
              <p
                className={`find-password-message ${codeMessageType}`}
              >
                {codeMessage}
              </p>
            )}

            {isCodeSent && (
              <button
                className="find-password-resend-button"
                type="button"
                onClick={handleSendCode}
                disabled={isSendingCode}
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
              <label
                className="find-password-label"
                htmlFor="find-password-new-password"
              >
                새 비밀번호
              </label>

              <div className="find-password-password-row">
                <input
                  id="find-password-new-password"
                  className={`find-password-input find-password-password-input ${
                    passwordMessage
                      ? "find-password-input-error"
                      : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="새 비밀번호를 입력하세요."
                  value={newPassword}
                  onChange={handlePasswordChange}
                  disabled={isResettingPassword}
                />

                <button
                  className="find-password-eye-button"
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "비밀번호 숨기기"
                      : "비밀번호 보기"
                  }
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
        disabled={!isCodeVerified || isResettingPassword}
      >
        {isResettingPassword
          ? "변경 중..."
          : "비밀번호 변경하기"}
      </button>
    </section>
  );
}

export default FindPassword;