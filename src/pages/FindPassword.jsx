import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
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

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isResettingPassword, setIsResettingPassword] =
    useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [emailMessageType, setEmailMessageType] = useState("");
  const [codeMessageType, setCodeMessageType] = useState("");

  const getErrorMessage = (error, defaultMessage) => {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      defaultMessage
    );
  };

  // 로그인 화면으로 이동
  const handleBack = () => {
    navigate("/login");
  };

  // 인증번호 발송
  const handleSendCode = async () => {
    const trimmedEmail = email.trim();

    setEmailMessage("");
    setCodeMessage("");
    setPasswordMessage("");

    if (!trimmedEmail) {
      setEmailMessage("이메일을 입력해주세요.");
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
          "인증번호 발송에 실패했습니다."
        )
      );
      setEmailMessageType("error");
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증번호 자동 검증
  const verifyCodeAutomatically = async (nextCode) => {
    const trimmedEmail = email.trim();

    if (
      !trimmedEmail ||
      !isCodeSent ||
      nextCode.length !== 6
    ) {
      return;
    }

    try {
      setIsVerifyingCode(true);
      setCodeMessage("인증번호를 확인하고 있습니다.");
      setCodeMessageType("");

      await verifyVerificationCode(
        trimmedEmail,
        nextCode,
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
    setEmailMessage("");

    // 이메일이 변경되면 기존 인증 상태 초기화
    if (isCodeSent || isCodeVerified) {
      setIsCodeSent(false);
      setIsCodeVerified(false);
      setCode("");
      setCodeMessage("");
      setCodeMessageType("");
    }
  };

  const handleCodeChange = (event) => {
    const nextCode = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setCode(nextCode);
    setCodeMessage("");
    setCodeMessageType("");

    if (isCodeVerified) {
      setIsCodeVerified(false);
    }

    // 인증번호 6자리 입력 즉시 검증
    if (nextCode.length === 6 && !isVerifyingCode) {
      verifyCodeAutomatically(nextCode);
    }
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordMessage("");
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    const trimmedEmail = email.trim();

    setPasswordMessage("");

    if (!isCodeVerified) {
      setCodeMessage("이메일 인증을 완료해주세요.");
      setCodeMessageType("error");
      return;
    }

    if (!newPassword) {
      setPasswordMessage("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "비밀번호는 8자 이상 입력해주세요."
      );
      return;
    }

    try {
      setIsResettingPassword(true);

      await resetPassword(trimmedEmail, newPassword);

      // 실제 비밀번호 변경 완료 페이지 주소에 맞게 수정
      navigate("/passwordchangecomplete");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);

      setPasswordMessage(
        getErrorMessage(
          error,
          "비밀번호 변경에 실패했습니다."
        )
      );
    } finally {
      setIsResettingPassword(false);
    }
  };

  const isSubmitDisabled =
    !isCodeVerified ||
    newPassword.length < 8 ||
    isResettingPassword;

  return (
    <main className="find-password-page">
      <button
        type="button"
        className="find-password-back-button"
        onClick={handleBack}
        aria-label="로그인 화면으로 돌아가기"
      >
        ←
      </button>

      <h1 className="find-password-title">
        비밀번호 찾기
      </h1>

      <div className="find-password-form">
        <div className="find-password-field">
          <label
            className="find-password-label"
            htmlFor="find-password-email"
          >
            이메일
          </label>

          <div className="find-password-email-row">
            <input
              id="find-password-email"
              className="find-password-input"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={handleEmailChange}
            />

            <button
              type="button"
              className="find-password-send-button"
              onClick={handleSendCode}
              disabled={isSendingCode}
            >
              {isSendingCode
                ? "발송 중"
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

        <div className="find-password-field">
          <label
            className="find-password-label"
            htmlFor="find-password-code"
          >
            인증번호
          </label>

          <input
            id="find-password-code"
            className="find-password-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="인증번호를 입력해주세요."
            value={code}
            onChange={handleCodeChange}
            disabled={!isCodeSent || isVerifyingCode}
          />

          <div className="find-password-code-bottom">
            <div>
              {codeMessage && (
                <p
                  className={`find-password-message ${codeMessageType}`}
                >
                  {codeMessage}
                </p>
              )}
            </div>

            {isCodeSent && (
              <button
                type="button"
                className="find-password-resend-button"
                onClick={handleSendCode}
                disabled={isSendingCode}
              >
                인증번호 재발송
              </button>
            )}
          </div>
        </div>

        <div className="find-password-divider" />

        <div className="find-password-field">
          <label
            className="find-password-label"
            htmlFor="find-password-new-password"
          >
            새 비밀번호
          </label>

          <input
            id="find-password-new-password"
            className="find-password-input"
            type="password"
            placeholder="영어/숫자 조합 8글자 이상."
            value={newPassword}
            onChange={handlePasswordChange}
          />

          {passwordMessage && (
            <p className="find-password-message error">
              {passwordMessage}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        className="find-password-submit-button"
        onClick={handleChangePassword}
        disabled={isSubmitDisabled}
      >
        {isResettingPassword
          ? "변경 중..."
          : "비밀번호 변경하기"}
      </button>
    </main>
  );
}

export default FindPassword;