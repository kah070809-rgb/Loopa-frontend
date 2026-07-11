import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SurveyDetail.css";

function SurveyDetail() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [activeTab, setActiveTab] = useState("info");

  const survey = {
    title: "대학생 AI 활용 실태 조사",
    description:
      "대학생들의 AI 활용 경험과 인식을 파악하기 위한 설문입니다. 응답하신 내용은 통계 분석 목적으로만 사용됩니다.",
    period: "2026.07.01 ~ 2026.07.13",
    questionCount: {
      objective: 7,
      subjective: 2,
    },
    responseCount: 52,

    results: [
      {
        id: 1,
        question: "현재 학년은 어떻게 되시나요?",
        responseCount: 52,
        options: [
          { id: 1, label: "1학년", percent: 62.5, count: 33 },
          { id: 2, label: "2학년", percent: 12.5, count: 7 },
          { id: 3, label: "3학년", percent: 12.5, count: 6 },
          { id: 4, label: "4학년", percent: 12.5, count: 6 },
        ],
      },
      {
        id: 2,
        question: "공모전에 참여한 경험이 있나요?",
        responseCount: 52,
        options: [
          { id: 1, label: "있다", percent: 62.5, count: 33 },
          { id: 2, label: "없다", percent: 37.5, count: 19 },
        ],
      },
      {
        id: 3,
        question:
          "학교에서 공모전 참여를 위해 가장 필요하다고 생각하는 지원은 무엇인가요?",
        responseCount: 52,
        options: [],
      },
    ],
  };

  return (
    <section className="survey-detail-page">
      <button
        className="survey-detail-back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="survey-detail-title-box">
        <h1 className="survey-detail-title">{survey.title}</h1>

        <p className="survey-detail-token">열람 · 15토큰</p>
      </div>

      <div className="survey-detail-tab-wrapper">
        <button
          className={`survey-detail-tab ${
            activeTab === "info" ? "active" : ""
          }`}
          type="button"
          onClick={() => setActiveTab("info")}
        >
          설문 정보
        </button>

        <button
          className={`survey-detail-tab ${
            activeTab === "result" ? "active" : ""
          }`}
          type="button"
          onClick={() => setActiveTab("result")}
        >
          설문 결과
        </button>
      </div>

      <div className="survey-detail-tab-line">
        <div
          className={`survey-detail-tab-active-line ${
            activeTab === "result" ? "result" : "info"
          }`}
        />
      </div>

      {activeTab === "info" && (
        <article className="survey-detail-info-card">
          <div className="survey-detail-info-section">
            <h2>설문 소개</h2>
            <p>{survey.description}</p>
          </div>

          <div className="survey-detail-info-section">
            <h2>설문 기간</h2>
            <p>{survey.period}</p>
          </div>

          <div className="survey-detail-info-section">
            <h2>문항 수</h2>
            <p>
              객관식 {survey.questionCount.objective}문항
              <br />
              주관식 {survey.questionCount.subjective}문항
            </p>
          </div>

          <div className="survey-detail-info-section">
            <h2>응답자 수</h2>
            <p>{survey.responseCount}명</p>
          </div>
        </article>
      )}

      {activeTab === "result" && (
        <div className="survey-detail-result-list">
          {survey.results.map((result, index) => (
            <article className="survey-detail-result-card" key={result.id}>
              <h2 className="survey-detail-result-question">
                Q{index + 1}. {result.question}
              </h2>

              <p className="survey-detail-result-count">
                응답 {result.responseCount}명
              </p>

              <div className="survey-detail-result-content">
                <div className="survey-detail-pie-chart">원그래프</div>

                <div className="survey-detail-option-list">
                  {result.options.map((option) => (
                    <div
                      className="survey-detail-option-row"
                      key={option.id}
                    >
                      <span className="survey-detail-option-check">✓</span>

                      <span className="survey-detail-option-label">
                        {option.label}
                      </span>

                      <span className="survey-detail-option-percent">
                        {option.percent}%
                      </span>

                      <span className="survey-detail-option-count">
                        ({option.count}명)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default SurveyDetail;