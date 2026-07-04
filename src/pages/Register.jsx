import { useState } from "react";
import "./Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register () {
   const [showPassword, setShowPassword] = useState(false);

   return (
     <section className="r1">
        <button className="backbutton">←</button>
        <h1 className="registertitle">회원가입</h1>

        <div className="inputbox">
          <label className="inputlabel">이메일</label>

           <div className="emailrow">
              <input
               className="emailinput"
               type="email"
               placeholder="이메일을 입력해주세요"
               />

              <button className="codebutton" type="button">
                인증번호 받기
              </button>
           </div>
         </div>

         <div className="inputbox">
            <label className="inputlabel">인증번호</label>

            <input
            className="textinput"
            type="text"
            placeholder="인증번호를 입력해주세요"
            />

          <div className="codebottom">
             <p className="codeguide">⊙ 이메일로 받은 인증번호를 입력해주세요.</p>

              <button className="resendbutton" type="button">
                인증번호 재발송
              </button>
           </div>
        </div>

        <div className="divider"></div>
           
        <div className="inputbox">
           <label className="inputlabel">비밀번호</label>
           <div className="passwordrow">
             <input
              className="passwordinput"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
             />

             <button
              className="eyebutton"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
             >
             {showPassword ? <FiEye /> : <FiEyeOff />}
             </button>
            </div>
        </div>
     </section>
   );
}

export default Register;