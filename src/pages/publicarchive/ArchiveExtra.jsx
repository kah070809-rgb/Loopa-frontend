import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyPreviewCard from "./archivecomponents/SurveyPreviewCard";
import "./ArchiveExtra.css"

function ArchiveExtra() {
    const navigate = useNavigate();

    const [selectedSurveyId, setSelectedSurveyId] = useState(null);

    const surveys = [
  {
    id: 1,
    title: "AI 사용 실태 조사",
    target: "대학생",
    responseCount: 120,
    category: "기술",
    updatedAt: "2026.07.07",
  },
  {
    id: 2,
    title: "카페 이용 행태 조사",
    target: "20대",
    responseCount: 85,
    category: "생활",
    updatedAt: "2026.07.06",
  },
  {
    id: 3,
    title: "대학교 팀플 만족도 조사",
    target: "대학생",
    responseCount: 210,
    category: "교육",
    updatedAt: "2026.07.05",
  },
];

    return(
         <section className="archive-extra-page">
             <header className="archive-extra-header">
                 <button 
                  className="archive-extra-back-button" 
                  type="button"
                  onClick={() => navigate("/archivemain")}>
                     ←
                 </button>

                 <h1 className="archive-extra-title">최근 업데이트</h1>
             </header>

             <div className="archive-extra-search-box">
                 <input
                  className="archive-extra-search-input"
                  type="text"
                  placeholder="설문 제목 검색"
                 />

                 <button className="archive-extra-search-button" type="button">
                     <FiSearch />
                 </button>
             </div>

             <div className="archive-extra-filter-row">
                 <button className="archive-extra-filter-button selected" type="button">
                  전체
                 </button>

                 <button className="archive-extra-filter-button" type="button">
                  전체
                 </button>

                 <button className="archive-extra-filter-button" type="button">
                  전체
                 </button>

                 <button className="archive-extra-filter-button" type="button">
                  전체
                 </button>

                 <button className="archive-extra-filter-button" type="button">
                  전체
                 </button>
             </div>

             <div className="archive-extra-card-list">
                 {surveys.map((survey) => (
                 <SurveyPreviewCard
                  key={survey.id}
                  survey={survey}
                  isSelected={selectedSurveyId === survey.id}
                  onClick={() => setSelectedSurveyId(survey.id)}
                 />
                 ))}
             </div>
         </section>
    )
}

export default ArchiveExtra;