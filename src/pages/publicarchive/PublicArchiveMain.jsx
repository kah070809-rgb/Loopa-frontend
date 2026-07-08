import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyPreviewCard from "./archivecomponents/SurveyPreviewCard";
import "./PublicArchiveMain.css"

function publicArchiveMain () {
  const navigate = useNavigate();
  
  const surveyList = [
  {
    id: 1,
    title: "대학생 AI 활용 실태 조사",
    target: "대학생 대상",
    responseCount: 52,
    category: "IT·AI",
    updatedAt: "2026.01.01",
  },
  {
    id: 2,
    title: "대학생 AI 활용 실태 조사",
    target: "대학생 대상",
    responseCount: 52,
    category: "IT·AI",
    updatedAt: "2026.01.01",
  },
  {
    id: 3,
    title: "대학생 AI 활용 실태 조사",
    target: "대학생 대상",
    responseCount: 52,
    category: "IT·AI",
    updatedAt: "2026.01.01",
  },
];

 const [selectedSurveyId, setSelectedSurveyId] = useState(null);


  return (
    <div>
      <section className="archive-page">
        <header className="archive-header">
          <button className="archive-back-button" type="button">
            ←
          </button>

          <h1 className="archive-title">공공 아카이브</h1>
        </header>

        <div className="archive-intro-card">
          <h2 className="archive-intro-title">공공 아카이브</h2>

          <p className="archive-intro-text">
            공유된 설문 데이터를 검색하고 올리고
            <br />
            과제, 연구에 다시 활용해보세요.
          </p>
        </div>

        <div className="archive-search-box">
          <input
            className="archive-search-input"
            type="text"
            placeholder="설문 제목 검색"
          />

          <button className="archive-search-button" type="button">
            <FiSearch />
          </button>
        </div>

        <div className="archive-filter-list">
          <button className="archive-filter-button active" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
        </div>

        <div className="archive-section-header">
          <h2 className="archive-section-title">최근 업데이트</h2>

          <button 
           className="archive-more-button" 
           type="button"
           onClick={() => navigate("/archiveextra")}>
            더보기 &gt;
          </button>
        </div>

        <div className="archive-card-list">
           {surveyList.map((survey) => (
            <SurveyPreviewCard
             key={survey.id}
             survey={survey}
             isSelected={selectedSurveyId === survey.id}
             onClick={() => {
             setSelectedSurveyId(survey.id);
             navigate("/surveypurchase");
             }}
            />
            ))}
        </div>

        <button 
         className="archive-add-button" 
         type="button"
         onClick={() => navigate("/myarchive")}>
          +
        </button>
      </section>
    </div>
  );
}

export default publicArchiveMain;
