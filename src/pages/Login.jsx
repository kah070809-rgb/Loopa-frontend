import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return(
        <section className="r2">
            <button 
             className="loginbackbutton" 
             type="button"
             onClick={() => navigate("/landing")}>←</button>

            <div className="loginHeader">
              <h1 className="loginTitle">Loopa</h1>
              <p className="loginSubTitle">
                 로그인하고 설문과 데이터를 활용해보세요!
              </p>
            </div>

            <div className="loginForm">
              <div className="loginEmailBox">
                  <label className="loginEmailLabel">이메일</label>

                  <input
                   className="loginEmailInput"
                   type="email"
                   placeholder="이메일을 입력해주세요"
                  />
              </div>

              <div className="loginPasswordBox">
                 <label className="loginPasswordLabel">비밀번호</label>

                 <div className="loginPasswordInputWrap">
                     <input
                      className="loginPasswordInput"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요"
                     />

                     <button
                         className="loginEyeButton"
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         >
                         {showPassword ? <FiEye /> : <FiEyeOff />}
                     </button>
                 </div>
              </div>

              <button className="loginFindPasswordButton" type="button">
                 비밀번호 찾기 &gt;
              </button>

              <button className="loginButton" type="button">
                 로그인
              </button>

              <div className="loginDivider">
                 <span></span>
                 <p>또는</p>
                 <span></span>
              </div>

              <button 
               className="loginSignupButton" 
               type="button"
               onClick={() => navigate("/register")}>
                 회원가입
              </button>
            </div>

        </section>
    )
}

export default Login;