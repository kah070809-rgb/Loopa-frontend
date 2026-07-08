import { useLocation, useNavigate } from "react-router-dom";
import "./SurveyJoinFinish.css";

function SurveyJoinFinish() {
  const navigate = useNavigate();
  const location = useLocation();

  const rewardToken = location.state?.rewardToken ?? 0;
  const userToken = location.state?.userToken ?? 0;

  const handleGoMain = () => {
    navigate("/surveyjoinfirst");
  };

  return (
    <section className="survey-finish-page">
      <main className="survey-finish-content">
        <div className="survey-finish-check-circle">
          <span className="survey-finish-check">✓</span>
        </div>

        <h1 className="survey-finish-title">
          설문 참여가 완료되었습니다!
        </h1>

        <div className="survey-finish-token-box">
          <div className="survey-finish-token-row">
            <span>참여 보상</span>
            <strong>{rewardToken} 토큰 적립 완료</strong>
          </div>

          <div className="survey-finish-token-row">
            <span>보유 토큰</span>
            <strong>{userToken} 토큰</strong>
          </div>
        </div>
      </main>

      <button
        className="survey-finish-main-button"
        type="button"
        onClick={handleGoMain}
      >
        메인으로 돌아가기
      </button>
    </section>
  );
}

export default SurveyJoinFinish;