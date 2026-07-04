import "./Register.css";

function Register () {
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
     </section>
   );
}

export default Register;