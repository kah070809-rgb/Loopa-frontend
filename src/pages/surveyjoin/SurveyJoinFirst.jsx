import { useNavigate, useParams } from "react-router-dom";
import "./SurveyJoinFirst.css";

function SurveyJoinFirst() {
  const navigate = useNavigate();

  const { surveyId } = useParams();

  const surveyData = {
    title: "대학생 AI 활용 실태 조사",
    introduction:
      "대학생들의 AI 활용 경험과 인식을 파악하기 위한 설문입니다. 응답하신 내용은 통계 분석 목적으로만 사용됩니다.",
    objectiveCount: 7,
    subjectiveCount: 2,
    startDate: "2026.07.01",
    endDate: "2026.07.13",
  };

  const earnedToken =
    surveyData.objectiveCount * 1 + surveyData.subjectiveCount * 2;

  return (
    <section className="survey-join-first-page">
      <header className="survey-join-first-header">
        <button
          className="survey-join-first-back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h1 className="survey-join-first-page-title">설문 참여</h1>
      </header>

      <main className="survey-join-first-content">
        <div className="survey-join-first-title-box">
          <h2>{surveyData.title}</h2>
        </div>

        <div className="survey-join-first-info-box">
          <div className="survey-join-first-section">
            <h3>설문 소개</h3>
            <p>
              {surveyData.introduction.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>문항 수</h3>
            <p>
              객관식 {surveyData.objectiveCount}문항
              <br />
              주관식 {surveyData.subjectiveCount}문항
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>설문 기간</h3>
            <p>
              {surveyData.startDate} ~{surveyData.endDate}
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>획득 토큰</h3>
            <p>최대 + {earnedToken} 토큰</p>
          </div>
        </div>

        <p className="survey-join-first-guest-text">
          게스트 계정은 토큰 획득이 불가합니다.
        </p>
      </main>

      <div className="survey-join-first-bottom-area">
        <button 
         className="survey-join-first-start-button" 
         type="button"
         onClick={() => navigate(`/survey/join/${surveyId}/question`)}>
          설문 참여하기
        </button>
      </div>
    </section>
  );
}

export default SurveyJoinFirst;