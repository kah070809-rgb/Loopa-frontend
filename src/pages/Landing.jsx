import { useNavigate } from 'react-router-dom';
import './Landing.css';

// 사진 임포트 경로 추가
import loopasmall from '../assets/images/loopa small.svg';
import main from '../assets/images/main.svg';

function Landing() {
  const navigate = useNavigate();

  return (
    <section className="landing-page">
      <div className="landing-container">
        {/* 상단 텍스트 및 로고 */}
        <div className="landing-top-text">
          대학생을 위한 설문 데이터 공유 플랫폼
          <img src={loopasmall} alt="Loopa" className="loopa-small-logo" />
        </div>

        {/* 메인 타이틀 */}
        <h2 className="landing-main-title">
          한 번의 설문이
          <br />
          모두의 데이터가 되다
        </h2>

        {/* 그룹화된 메인 이미지 */}
        <img src={main} alt="Loopa Service" className="landing-main-image" />

        {/* 버튼 컨테이너 */}
        <div className="landing-button-box">
          <button
            className="landing-login-button"
            type="button"
            onClick={() => navigate('/login')}
          >
            로그인 하기
          </button>

          <button
            className="landing-guest-button"
            type="button"
            onClick={() => navigate('/main')}
          >
            게스트로 참여
          </button>
        </div>

        {/* 하단 설명 섹션 */}
        <div className="landing-bottom-section">
          <h2 className="bottom-title">Loopa가 특별한 이유</h2>

          <div className="feature-list">
            <div className="feature-item">
              <h3 className="feature-subtitle">
                응답자를 빠르게 모집할 수 있어요.
              </h3>
              <p className="feature-desc">
                힘들게 부탁하지 않아도 Loopa에서 응답자를 모집합니다.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-subtitle">
                설문 결과를 쉽고 빠르게 분석할 수 있어요.
              </h3>
              <p className="feature-desc">
                많은 참여로 데이터가 모이고 빠르게 분석할 수 있습니다.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-subtitle">
                다양한 설문 데이터를 함께 공유하고
                <br />
                활용할 수 있어요.
              </h3>
              <p className="feature-desc">
                설문 데이터를 열람할 수 있고 함께 공유할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
