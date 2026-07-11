import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

import {
  sendVerificationCode,
  verifyVerificationCode,
} from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [authCodeError, setAuthCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [agreeError, setAgreeError] = useState("");

  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [authCodeSuccessMessage, setAuthCodeSuccessMessage] = useState("");

  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const ages = Array.from({ length: 100 }, (_, index) => index + 1);

  const getApiError = (error) => {
    return {
      code:
        error.response?.data?.code ||
        error.response?.data?.errorCode ||
        error.response?.data?.result?.code,

      message:
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        error.response?.data?.result?.message,
    };
  };

  const requestAuthCode = async (successMessage) => {
    const trimmedEmail = email.trim();

    setEmailError("");
    setEmailSuccessMessage("");
    setAuthCodeError("");
    setAuthCodeSuccessMessage("");
    setIsAuthCodeVerified(false);

    if (!trimmedEmail) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    if (isSendingCode) {
      return;
    }

    try {
      setIsSendingCode(true);

      const data = await sendVerificationCode(trimmedEmail);

      console.log("인증번호 발송 성공:", data);

      setEmailSuccessMessage(successMessage);

      setAuthCode("");
      setIsAuthCodeVerified(false);
    } catch (error) {
      console.error("인증번호 발송 실패:", error);

      const { code, message } = getApiError(error);

      if (code === "AUTH_001") {
        setEmailError("이미 가입된 이메일입니다.");
        return;
      }

      if (code === "AUTH_010") {
        setEmailError(
          "인증번호는 1분 후 다시 요청할 수 있습니다."
        );
        return;
      }

      if (code === "COMMON_400") {
        setEmailError(
          message || "올바른 이메일 형식을 입력해주세요."
        );
        return;
      }

      if (code === "COMMON_500") {
        setEmailError(
          "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }

      setEmailError(
        message || "인증번호 발송에 실패했습니다."
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSendAuthCode = async () => {
    await requestAuthCode("인증번호가 발송되었습니다.");
  };

  const handleResendAuthCode = async () => {
    await requestAuthCode("인증번호가 재발송되었습니다.");
  };

  const handleCheckAuthCode = async (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    setAuthCode(numericValue);
    setAuthCodeError("");
    setAuthCodeSuccessMessage("");
    setIsAuthCodeVerified(false);

    if (numericValue.length !== 6) {
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setAuthCodeError("먼저 이메일을 입력해주세요.");
      return;
    }

    if (isVerifyingCode) {
      return;
    }

    try {
      setIsVerifyingCode(true);

      const data = await verifyVerificationCode(
        trimmedEmail,
        numericValue
      );

      console.log("인증번호 검증 성공:", data);

      if (data.result?.verified === true) {
        setAuthCodeSuccessMessage(
          data.message || "인증번호가 일치합니다."
        );
        setIsAuthCodeVerified(true);
        return;
      }

      setAuthCodeError("인증번호 검증에 실패했습니다.");
      setIsAuthCodeVerified(false);
    } catch (error) {
      console.error("인증번호 확인 실패:", error);

      const { code, message } = getApiError(error);

      if (code === "AUTH_002") {
        setAuthCodeError("인증번호가 일치하지 않습니다.");
      } else if (code === "AUTH_003") {
        setAuthCodeError(
          "인증번호가 만료되었습니다. 다시 발송해주세요."
        );
      } else if (code === "AUTH_009") {
        setAuthCodeError(
          "인증 시도 횟수를 초과했습니다. 인증번호를 다시 발송해주세요."
        );
      } else if (code === "COMMON_400") {
        setAuthCodeError(
          message || "이메일과 인증번호를 다시 확인해주세요."
        );
      } else if (code === "COMMON_500") {
        setAuthCodeError(
          "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      } else {
        setAuthCodeError(
          message || "인증번호 확인에 실패했습니다."
        );
      }

      setIsAuthCodeVerified(false);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleSelectGender = (selectedGender) => {
    setGender(selectedGender);
    setGenderError("");
  };

  const handleSubmitRegister = async () => {
    setEmailError("");
    setAuthCodeError("");
    setPasswordError("");
    setGenderError("");
    setAgeError("");
    setAgreeError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    }

    if (!authCode.trim() || !isAuthCodeVerified) {
      setAuthCodeError("이메일 인증을 완료해주세요.");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (!gender) {
      setGenderError("성별을 선택해주세요.");
      hasError = true;
    }

    if (!age) {
      setAgeError("나이를 선택해주세요.");
      hasError = true;
    }

    if (!agreeTerms) {
      setAgreeError(
        "동의를 하지 않으면 서비스를 이용할 수 없습니다."
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const registerData = {
      email: email.trim(),
      password,
      gender,
      age: Number(age),
      job: job || null,
    };

    console.log("백엔드로 보낼 회원가입 데이터:", registerData);

    try {
      // 회원가입 API 연결 전 임시 이동
      navigate("/RegisterComplete");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section className="r1">
      <button
        className="registerbackbutton"
        type="button"
        onClick={() => navigate("/login")}
      >
        ←
      </button>

      <h1 className="registertitle">회원가입</h1>

      <div className="registerinputbox">
        <label
          className="registerinputlabel"
          htmlFor="register-email"
        >
          이메일
        </label>

        <div className="registeremailrow">
          <input
            id="register-email"
            className={`registeremailinput ${
              emailError ? "error" : ""
            }`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setEmailSuccessMessage("");

              setAuthCode("");
              setAuthCodeError("");
              setAuthCodeSuccessMessage("");
              setIsAuthCodeVerified(false);
            }}
            placeholder="이메일을 입력해주세요."
            autoComplete="email"
            disabled={isSendingCode || isVerifyingCode}
          />

          <button
            className="registercodebutton"
            type="button"
            onClick={handleSendAuthCode}
            disabled={isSendingCode || isVerifyingCode}
          >
            {isSendingCode
              ? "발송 중..."
              : "인증번호 받기"}
          </button>
        </div>

        {emailError && (
          <p className="registererrormessage">
            {emailError}
          </p>
        )}

        {emailSuccessMessage && (
          <p className="registersuccessmessage registeremailsuccessmessage">
            {emailSuccessMessage}
          </p>
        )}
      </div>

      <div className="registerinputbox registercodeinputbox">
        <label
          className="registerinputlabel"
          htmlFor="register-auth-code"
        >
          인증번호
        </label>

        <input
          id="register-auth-code"
          className={`registertextinput ${
            authCodeError ? "error" : ""
          }`}
          type="text"
          inputMode="numeric"
          value={authCode}
          onChange={(e) =>
            handleCheckAuthCode(e.target.value)
          }
          placeholder="인증번호를 입력해주세요."
          maxLength={6}
          disabled={isVerifyingCode}
        />

        <div className="registercodebottom">
          <p
            className={
              authCodeError
                ? "registererrormessage registercodemessage"
                : authCodeSuccessMessage
                  ? "registersuccessmessage registercodemessage"
                  : "registerguidemessage registercodemessage"
            }
          >
            {isVerifyingCode
              ? "인증번호를 확인하고 있습니다."
              : authCodeError ||
                authCodeSuccessMessage ||
                "⊙ 이메일로 받은 인증번호를 입력해주세요."}
          </p>

          <button
            className="registerresendbutton"
            type="button"
            onClick={handleResendAuthCode}
            disabled={isSendingCode || isVerifyingCode}
          >
            {isSendingCode
              ? "발송 중..."
              : "인증번호 재발송"}
          </button>
        </div>
      </div>

      <div className="registerdivider" />

      <div className="registerinputbox">
        <label
          className="registerinputlabel"
          htmlFor="register-password"
        >
          비밀번호
        </label>

        <div className="registerpasswordrow">
          <input
            id="register-password"
            className={`registerpasswordinput ${
              passwordError ? "error" : ""
            }`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            placeholder="비밀번호를 입력하세요."
            autoComplete="new-password"
          />

          <button
            className="registereyebutton"
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

        {passwordError && (
          <p className="registererrormessage">
            {passwordError}
          </p>
        )}
      </div>

      <div className="registergenderagebox">
        <div className="registergenderbuttons">
          <button
            className={`registergenderbutton ${
              gender === "MALE" ? "selected" : ""
            } ${genderError ? "error" : ""}`}
            type="button"
            onClick={() => handleSelectGender("MALE")}
          >
            남성
          </button>

          <button
            className={`registergenderbutton ${
              gender === "FEMALE" ? "selected" : ""
            } ${genderError ? "error" : ""}`}
            type="button"
            onClick={() => handleSelectGender("FEMALE")}
          >
            여성
          </button>
        </div>

        <div className="registeragebox">
          <label
            className="registeragelabel"
            htmlFor="register-age"
          >
            나이
          </label>

          <select
            id="register-age"
            className={`registerageselect ${
              ageError ? "error" : ""
            }`}
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setAgeError("");
            }}
          >
            <option value="">-</option>

            {ages.map((ageItem) => (
              <option key={ageItem} value={ageItem}>
                {ageItem}
              </option>
            ))}
          </select>
        </div>

        {genderError && (
          <p className="registererrormessage registergendererror">
            {genderError}
          </p>
        )}

        {ageError && (
          <p className="registererrormessage registerageerror">
            {ageError}
          </p>
        )}
      </div>

      <div className="registerinputbox registerjobbox">
        <label
          className="registerinputlabel registerjoblabel"
          htmlFor="register-job"
        >
          직업(선택)
        </label>

        <select
          id="register-job"
          className={`registerjobselect ${
            job ? "selected" : ""
          }`}
          value={job}
          onChange={(e) => setJob(e.target.value)}
        >
          <option value="">직업을 선택해주세요.</option>
          <option value="STUDENT">학생</option>
          <option value="UNIVERSITY_STUDENT">대학생</option>
          <option value="GRADUATE_STUDENT">대학원생</option>
          <option value="WORKER">직장인</option>
          <option value="TEACHER">교사</option>
          <option value="PROFESSOR">교수</option>
          <option value="FREELANCER">프리랜서</option>
          <option value="SELF_EMPLOYED">자영업자</option>
          <option value="PUBLIC_OFFICIAL">공무원</option>
          <option value="UNEMPLOYED">무직</option>
          <option value="ETC">기타</option>
        </select>
      </div>

      <div className="registeragreebox">
        {agreeError && (
          <p className="registererrormessage registeragreeerror">
            {agreeError}
          </p>
        )}

        <div className="registeragreerow">
          <input
            id="register-agree"
            className="registeragreecheck"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              setAgreeError("");
            }}
          />

          <p className="registeragreetext">
            Loopa의 <button type="button">이용약관</button>{" "}
            및{" "}
            <button type="button">
              개인정보처리방침
            </button>
            에 동의합니다.
          </p>
        </div>
      </div>

      <button
        className="registersubmitbutton"
        type="button"
        onClick={handleSubmitRegister}
        disabled={isSendingCode || isVerifyingCode}
      >
        회원가입 완료
      </button>
    </section>
  );
}

export default Register;