import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyShareableSurveys } from "../../api/archiveApi";
import "./MyArchive.css";

function MyArchive() {
  const navigate = useNavigate();

  const [mySurveyList, setMySurveyList] = useState([]);
  const [selectedSurveyIds, setSelectedSurveyIds] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMySurveys = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getMyShareableSurveys({
          size: 20,
        });

        setMySurveyList(result.items);
      } catch (error) {
        console.error("공유 가능한 설문 조회 실패:", error);

        if (error.response?.status === 401) {
          setErrorMessage("로그인이 필요하거나 로그인이 만료되었습니다.");
        } else {
          setErrorMessage("설문 목록을 불러오지 못했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMySurveys();
  }, []);

  const handleSelectSurvey = (surveyId) => {
    setSelectedSurveyIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(surveyId)) {
        return prevSelectedIds.filter((id) => id !== surveyId);
      }

      return [...prevSelectedIds, surveyId];
    });
  };

  const rewardToken = selectedSurveyIds.length * 10;

  return (
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

      {isLoading && (
        <p className="myarchive-message">
          설문 목록을 불러오는 중입니다.
        </p>
      )}

      {!isLoading && errorMessage && (
        <p className="myarchive-message">
          {errorMessage}
        </p>
      )}

      {!isLoading &&
        !errorMessage &&
        mySurveyList.length === 0 && (
          <p className="myarchive-message">
            공유 가능한 설문이 없습니다.
          </p>
        )}

      {!isLoading && !errorMessage && (
        <div className="myarchive-card-list">
          {mySurveyList.map((survey) => {
            const isSelected = selectedSurveyIds.includes(
              survey.surveyId
            );

            return (
              <button
                key={survey.surveyId}
                className={`myarchive-card ${
                  isSelected ? "selected" : ""
                }`}
                type="button"
                disabled={survey.sharedToArchive}
                onClick={() =>
                  handleSelectSurvey(survey.surveyId)
                }
              >
                <div className="myarchive-check-box">
                  {survey.sharedToArchive
                    ? "공유"
                    : isSelected
                      ? "✓"
                      : ""}
                </div>

                <div className="myarchive-card-content">
                  <div className="myarchive-card-top">
                    <span className="myarchive-status">
                      {survey.status === "CLOSED"
                        ? "종료"
                        : survey.status}
                    </span>

                    <span className="myarchive-date">
                      {survey.createdAt}
                    </span>
                  </div>

                  <h3 className="myarchive-card-title">
                    {survey.title}
                  </h3>

                  <p className="myarchive-card-info">
                    {survey.target} · 응답자 수 :{" "}
                    {survey.respondentCount}
                  </p>

                  <div className="myarchive-card-bottom">
                    <span className="myarchive-category">
                      {survey.category}
                    </span>

                    <span className="myarchive-detail-text">
                      {survey.sharedToArchive
                        ? "공유 완료"
                        : "자세히 보기 >"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        className="myarchive-share-button"
        type="button"
        disabled={
          selectedSurveyIds.length === 0 || isLoading
        }
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
  );
}

export default MyArchive;