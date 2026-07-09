import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyArchive.css"

function MyArchive () {
    const navigate = useNavigate();

    const [selectedSurveyIds, setSelectedSurveyIds] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSelectSurvey = (surveyId) => {
     if (selectedSurveyIds.includes(surveyId)) {
     setSelectedSurveyIds(selectedSurveyIds.filter((id) => id !== surveyId));
     } else {
     setSelectedSurveyIds([...selectedSurveyIds, surveyId]);
      }
    };

    const rewardToken = selectedSurveyIds.length * 10;

  const mySurveyList = [
    {
      id: 1,
      status: "종료",
      title: "대학생 AI 활용 실태 조사",
      category: "IT·AI",
      target: "대학생 대상",
      responseCount: 52,
      date: "2026.01.01",
    },
    {
      id: 2,
      status: "종료",
      title: "대학생 AI 활용 실태 조사",
      category: "IT·AI",
      target: "대학생 대상",
      responseCount: 52,
      date: "2026.01.01",
    },
    {
      id: 3,
      status: "진행",
      title: "대학생 소비 패턴 조사",
      category: "소비",
      target: "대학생 대상",
      responseCount: 18,
      date: "2026.01.03",
    },
  ];

    return(
        <section className="myarchive-page">
         <header className="myarchive-header">
             <button
              className="myarchive-back-button"
              type="button"
              onClick={() => navigate("/archivemain")}
             >
                 ←
             </button>

             <h1 className="myarchive-title">공공 아카이브</h1>
         </header>

         <h2 className="myarchive-sub-title">공유 가능한 내 설문</h2>

         <div className="myarchive-line"></div>

         <div className="myarchive-card-list">
             {mySurveyList.map((survey) => {
             const isSelected = selectedSurveyIds.includes(survey.id);

             return (
             <button
              key={survey.id}
              className={`myarchive-card ${isSelected ? "selected" : ""}`}
              type="button"
              onClick={() => handleSelectSurvey(survey.id)}
             >
                 <div className="myarchive-check-box">
                     {isSelected && "✓"}
                 </div>

                 <div className="myarchive-card-content">
                     <div className="myarchive-card-top">
                         <span className="myarchive-status">{survey.status}</span>
                         <span className="myarchive-date">{survey.date}</span>
                     </div>

                     <h3 className="myarchive-card-title">{survey.title}</h3>

                     <p className="myarchive-card-info">
                         {survey.target} · 응답자 수 : {survey.responseCount}
                     </p>

                     <div className="myarchive-card-bottom">
                         <span className="myarchive-category">{survey.category}</span>
                         <span className="myarchive-detail-text">자세히 보기 &gt;</span>
                     </div>
                 </div>
             </button>
              );
             })}
         </div>

         <button
          className="myarchive-share-button"
          type="button"
          disabled={selectedSurveyIds.length === 0}
          onClick={() => setIsPopupOpen(true)}
         >
             공유하고 {rewardToken} 토큰 받기
         </button>

         {isPopupOpen && (
         <div className="myarchive-popup-overlay">
             <div className="myarchive-popup">
                 <p className="myarchive-popup-message">
                  설문을 공유하여 {rewardToken} 토큰을 받았습니다.
                 </p>

                 <button
                  className="myarchive-popup-button"
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                 >
                     확인
                 </button>
             </div>
         </div>
         )}
        </section>
    )
}

export default MyArchive;