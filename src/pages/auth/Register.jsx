import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

  const ages = Array.from({ length: 100 }, (_, index) => index + 1);

  const handleSendAuthCode = async () => {
    setEmailError("");
    setEmailSuccessMessage("");

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    try {
      /*
      const response = await fetch("http://localhost:8080/api/auth/email-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("인증번호 발송 실패");
      }
      */

      setEmailSuccessMessage("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error(error);
      setEmailError("인증번호 발송에 실패했습니다.");
    }
  };

  const handleResendAuthCode = async () => {
    setEmailError("");
    setEmailSuccessMessage("");

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    try {
      /*
      const response = await fetch("http://localhost:8080/api/auth/email-code/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("인증번호 재발송 실패");
      }
      */

      setEmailSuccessMessage("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error(error);
      setEmailError("인증번호 재발송에 실패했습니다.");
    }
  };

  const handleCheckAuthCode = async (value) => {
    setAuthCode(value);
    setAuthCodeError("");
    setAuthCodeSuccessMessage("");
    setIsAuthCodeVerified(false);

    if (!value.trim()) {
      return;
    }

    if (value.length < 6) {
      return;
    }

    try {
      /*
      const response = await fetch("http://localhost:8080/api/auth/email-code/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          authCode: value,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.verified) {
        setAuthCodeError("인증번호가 일치하지 않습니다.");
        setIsAuthCodeVerified(false);
        return;
      }
      */

      // 백엔드 연결 전 임시 테스트용 코드
      if (value !== "123456") {
        setAuthCodeError("인증번호가 일치하지 않습니다.");
        setIsAuthCodeVerified(false);
        return;
      }

      setAuthCodeSuccessMessage("인증번호가 일치합니다.");
      setIsAuthCodeVerified(true);
    } catch (error) {
      console.error(error);
      setAuthCodeError("인증번호 확인에 실패했습니다.");
      setIsAuthCodeVerified(false);
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
      setAuthCodeError("인증번호가 일치하지 않습니다.");
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
      setAgreeError("동의를 하지 않으면 서비스를 이용할 수 없습니다.");
      hasError = true;
    }

    if (hasError) return;

    const registerData = {
      email,
      authCode,
      password,
      gender,
      age: Number(age),
      job,
      agreeTerms,
    };

    console.log("백엔드로 보낼 회원가입 데이터:", registerData);

    try {
      /*
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입 실패");
      }
      */

      navigate("/RegisterComplete");
    } catch (error) {
      console.error(error);
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
        <label className="registerinputlabel">이메일</label>

        <div className="registeremailrow">
          <input
            className={`registeremailinput ${emailError ? "error" : ""}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setEmailSuccessMessage("");
              setIsAuthCodeVerified(false);
              setAuthCodeSuccessMessage("");
            }}
            placeholder="이메일을 입력해주세요."
          />

          <button
            className="registercodebutton"
            type="button"
            onClick={handleSendAuthCode}
          >
            인증번호 받기
          </button>
        </div>

        {emailError && (
          <p className="registererrormessage">{emailError}</p>
        )}

        {emailSuccessMessage && (
          <p className="registersuccessmessage registeremailsuccessmessage">
            {emailSuccessMessage}
          </p>
        )}
      </div>

      <div className="registerinputbox registercodeinputbox">
        <label className="registerinputlabel">인증번호</label>

        <input
          className={`registertextinput ${authCodeError ? "error" : ""}`}
          type="text"
          value={authCode}
          onChange={(e) => handleCheckAuthCode(e.target.value)}
          placeholder="인증번호를 입력해주세요."
          maxLength={6}
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
            {authCodeError ||
              authCodeSuccessMessage ||
              "⊙ 이메일로 받은 인증번호를 입력해주세요."}
          </p>

          <button
            className="registerresendbutton"
            type="button"
            onClick={handleResendAuthCode}
          >
            인증번호 재발송
          </button>
        </div>
      </div>

      <div className="registerdivider"></div>

      <div className="registerinputbox">
        <label className="registerinputlabel">비밀번호</label>

        <div className="registerpasswordrow">
          <input
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
          />

          <button
            className="registereyebutton"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        {passwordError && (
          <p className="registererrormessage">{passwordError}</p>
        )}
      </div>

      <div className="registergenderagebox">
        <div className="registergenderbuttons">
          <button
            className={`registergenderbutton ${
              gender === "male" ? "selected" : ""
            } ${genderError ? "error" : ""}`}
            type="button"
            onClick={() => handleSelectGender("male")}
          >
            남성
          </button>

          <button
            className={`registergenderbutton ${
              gender === "female" ? "selected" : ""
            } ${genderError ? "error" : ""}`}
            type="button"
            onClick={() => handleSelectGender("female")}
          >
            여성
          </button>
        </div>

        <div className="registeragebox">
          <label className="registeragelabel">나이</label>

          <select
            className={`registerageselect ${ageError ? "error" : ""}`}
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setAgeError("");
            }}
          >
            <option value="">-</option>

            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
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
        <label className="registerinputlabel registerjoblabel">
          직업(선택)
        </label>

        <select
          className={`registerjobselect ${job ? "selected" : ""}`}
          value={job}
          onChange={(e) => setJob(e.target.value)}
        >
          <option value="">직업을 선택해주세요.</option>
          <option value="student">학생</option>
          <option value="college_student">대학생</option>
          <option value="graduate_student">대학원생</option>
          <option value="worker">직장인</option>
          <option value="teacher">교사</option>
          <option value="professor">교수</option>
          <option value="freelancer">프리랜서</option>
          <option value="self_employed">자영업자</option>
          <option value="public_official">공무원</option>
          <option value="unemployed">무직</option>
          <option value="etc">기타</option>
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
            className="registeragreecheck"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              setAgreeError("");
            }}
          />

          <p className="registeragreetext">
            Loopa의 <button type="button">이용약관</button> 및{" "}
            <button type="button">개인정보처리방침</button>에 동의합니다.
          </p>
        </div>
      </div>

      <button
        className="registersubmitbutton"
        type="button"
        onClick={handleSubmitRegister}
      >
        회원가입 완료
      </button>
    </section>
  );
}

export default Register;