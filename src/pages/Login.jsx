import { useState } from "react";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
    return(
        <section className="r2">
            <button className="backbutton" type="button">←</button>

            <div className="loginHeader">
              <h1 className="loginTitle">Loopa</h1>
              <p className="loginSubTitle">
                 로그인하고 설문과 데이터를 활용해보세요!
              </p>
            </div>

        </section>
    )
}

export default Login;