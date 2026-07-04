import { useState } from "react";
import "./Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register () {
   const [showPassword, setShowPassword] = useState(false);

   return (
     <section className="r1">
        <button className="backbutton" type="button">←</button>
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

        <div className="genderagebox">
          <div className="genderbuttons">
             <button className="genderbutton" type="button">
                남자
             </button>

             <button className="genderbutton" type="button">
                여자
             </button>
           </div>

           <div className="agebox">
             <label className="agelabel">나이</label>

             <input
              className="ageinput"
              type="number"
              placeholder="-"
             />
           </div>
        </div>

        <div className="inputbox">
          <label className="inputlabel">직업(선택)</label>

          <select className="jobselect">
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

        <div className="agreebox">
          <input className="agreecheck" type="checkbox" />

          <p className="agreetext">
             Loopa의 <button type="button">이용약관</button> 및{" "}
             <button type="button">개인정보처리방침</button>에 동의합니다.
          </p>
        </div>

        <button className="submitbutton" type="button">
           회원가입 완료
        </button>
     </section>
   );
}

export default Register;