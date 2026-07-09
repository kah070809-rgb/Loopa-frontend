import { useNavigate } from "react-router-dom";
import "./GuestSurveyJoinFinish.css";

function GuestSurveyJoinFinish() {
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate("/surveyjoinfirst");
  };

  return (
    <section className="guest-survey-finish-page">
      <div className="guest-survey-finish-content">
        <div className="guest-survey-finish-icon-circle">
          <span className="guest-survey-finish-check">✓</span>
        </div>

        <h1 className="guest-survey-finish-title">
          설문 참여가 완료되었습니다!
        </h1>
      </div>

      <button
        className="guest-survey-finish-button"
        type="button"
        onClick={handleGoMain}
      >
        메인으로 돌아가기
      </button>
    </section>
  );
}

export default GuestSurveyJoinFinish;