import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
    const navigate = useNavigate();

    return(
        <section className="landing-page">
          <header className="landing-header">
             <h1 className="landing-logo">Loopa</h1>
          </header>

          <main className="landing-main">
             <p className="landing-subtitle">
              대학생을 위한 설문 데이터 공유 플랫폼, Loopa
             </p>

             <h2 className="landing-main-title">
              한 번의 설문이
             <br />
              모두의 데이터가 되다.
             </h2>

             <div className="landing-description">
                 <p>응답자를 빠르게 모집할 수 있어요!</p>
                 <p>설문 결과를 쉽고 빠르게 분석할 수 있어요!</p>
                 <p>다양한 설문 데이터를 함께 공유하고 활용할 수 있어요!</p>
             </div>

             <div className="landing-button-box">
                 <button className="landing-login-button" 
                  type="button" 
                  onClick={() => navigate("/login")}>
                  로그인 하기   →
                 </button>

                 <button className="landing-guest-button" type="button">
                  게스트로 참여   →
                 </button>
             </div>

          </main>
        </section>
    )
}

export default Landing;