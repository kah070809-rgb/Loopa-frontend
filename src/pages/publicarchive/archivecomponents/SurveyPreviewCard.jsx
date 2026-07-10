import "./SurveyPreviewCard.css";

function SurveyPreviewCard({ survey, isSelected, onClick }) {
  return (
    <button
      className={`archive-survey-card ${isSelected ? "selected" : ""}`}
      type="button"
      onClick={onClick}
    >
      <div className="archive-card-main">
        <div className="archive-card-left">
          <h3 className="archive-card-title">{survey.title}</h3>

          <p className="archive-card-info">
            {survey.target} · 응답자 수 : {survey.responseCount}
          </p>

          <span className="archive-card-category">{survey.category}</span>
        </div>

        <div className="archive-card-right">
          <span className="archive-card-date">{survey.updatedAt}</span>

          <span className="archive-card-detail">자세히 보기 &gt;</span>
        </div>
      </div>
    </button>
  );
}

export default SurveyPreviewCard;