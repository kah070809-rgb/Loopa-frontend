import { useNavigate } from "react-router-dom";
import "./SurveyExpired.css";

function SurveyExpired() {
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate("/surveyjoinfirst");
  };

  return (
    <section className="survey-expired-page">
      <main className="survey-expired-content">
        <div className="survey-expired-icon-box">
          <span className="survey-expired-check">✓</span>
        </div>

        <h1 className="survey-expired-title">설문이 이미 종료되었습니다.</h1>

        <p className="survey-expired-description">
          해당 설문은 응답 기간이 종료되어 더 이상 참여할 수 없습니다.
        </p>
      </main>

      <button
        className="survey-expired-main-button"
        type="button"
        onClick={handleGoMain}
      >
        메인으로 돌아가기
      </button>
    </section>
  );
}

export default SurveyExpired;