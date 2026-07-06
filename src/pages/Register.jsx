import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register () {
   const [showPassword, setShowPassword] = useState(false);

   const ages = Array.from({ length: 100 }, (_, index) => index + 1);

   const navigate = useNavigate();

   return (
     <section className="r1">
        <button 
         className="registerbackbutton" 
         type="button"
         onClick={() => navigate("/login")}>
            ←
        </button>
        <h1 className="registertitle">회원가입</h1>

        <div className="registerinputbox">
          <label className="registerinputlabel">이메일</label>

           <div className="registeremailrow">
              <input
               className="registeremailinput"
               type="email"
               placeholder="이메일을 입력해주세요"
               />

              <button className="registercodebutton" type="button">
                인증번호 받기
              </button>
           </div>
         </div>

         <div className="registerinputbox">
            <label className="registerinputlabel">인증번호</label>

            <input
            className="registertextinput"
            type="text"
            placeholder="인증번호를 입력해주세요"
            />

          <div className="registercodebottom">
             <p className="registercodeguide">⊙ 이메일로 받은 인증번호를 입력해주세요.</p>

              <button className="registerresendbutton" type="button">
                인증번호 재발송
              </button>
           </div>
        </div>

        <div className="registerdivider"></div>
           
        <div className="registerinputbox">
           <label className="registerinputlabel">비밀번호</label>
           <div className="registerpasswordrow">
             <input
              className="registerpasswordinput"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
             />

             <button
              className="registereyebutton"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
             >
             {showPassword ? <FiEye /> : <FiEyeOff />}
             </button>
           </div>
        </div>

        <div className="registergenderagebox">
          <div className="registergenderbuttons">
             <button className="registergenderbutton" type="button">
                남자
             </button>

             <button className="registergenderbutton" type="button">
                여자
             </button>
           </div>

           <div className="registeragebox">
             <label className="registeragelabel">나이</label>

             <select className="registerageselect">
                <option value="">-</option>

                {ages.map((age) => (
                <option key={age} value={age}>
                {age}
                </option>
                ))}
             </select>
           </div>
        </div>

        <div className="registerinputbox">
          <label className="registerinputlabel">직업(선택)</label>

          <select className="registerjobselect">
             <option value="">직업을 선택해주세요</option>
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
          <input className="registeragreecheck" type="checkbox" />

          <p className="registeragreetext">
             Loopa의 <button type="button">이용약관</button> 및{" "}
             <button type="button">개인정보처리방침</button>에 동의합니다.
          </p>
        </div>

        <button className="registersubmitbutton" type="button">
           회원가입 완료
        </button>
     </section>
   );
}

export default Register;