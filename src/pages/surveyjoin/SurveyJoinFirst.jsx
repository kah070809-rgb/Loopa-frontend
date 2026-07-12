import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyDetail } from "../../api/surveyApi";
import "./SurveyJoinFirst.css";

function SurveyJoinFirst() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [surveyData, setSurveyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchSurveyDetail = async () => {
      if (!surveyId) {
        setErrorMessage("설문 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getSurveyDetail(surveyId);
        setSurveyData(data);
      } catch (error) {
        console.error("설문 상세 조회 실패:", error);

        setErrorMessage(
          error.response?.data?.message ||
            "설문 정보를 불러오지 못했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyDetail();
  }, [surveyId]);

  const formatDate = (date) => {
    if (!date) return "-";

    return date.replaceAll("-", ".");
  };

  const isSurveyClosed =
    surveyData?.status === "CLOSED" ||
    surveyData?.status === "ENDED";

  const handleStartSurvey = () => {
    if (!surveyData || isSurveyClosed) {
      return;
    }

    if (isLoggedIn) {
      navigate(`/survey/join/${surveyId}/question`, {
        state: {
          isGuest: false,
        },
      });

      return;
    }

    setIsGuestModalOpen(true);
  };

  const handleGoLogin = () => {
  navigate("/login", {
    state: {
      redirectTo: `/surveyjoinfirst/${surveyId}`,
    },
  });
};

  const handleContinueAsGuest = () => {
    setIsGuestModalOpen(false);

    navigate(`/survey/join/${surveyId}/question`, {
      state: {
        isGuest: true,
      },
    });
  };

  const handleCloseGuestModal = () => {
    setIsGuestModalOpen(false);
  };

  if (isLoading) {
    return (
      <section className="survey-join-first-page">
        <p className="survey-join-first-status-message">
          설문 정보를 불러오는 중입니다.
        </p>
      </section>
    );
  }

  if (errorMessage || !surveyData) {
    return (
      <section className="survey-join-first-page">
        <header className="survey-join-first-header">
          <button
            className="survey-join-first-back-button"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            ←
          </button>

          <h1 className="survey-join-first-page-title">
            설문 참여
          </h1>
        </header>

        <p className="survey-join-first-status-message">
          {errorMessage || "설문 정보를 찾을 수 없습니다."}
        </p>
      </section>
    );
  }

  return (
    <section className="survey-join-first-page">
      <header className="survey-join-first-header">
        <button
          className="survey-join-first-back-button"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          ←
        </button>

        <h1 className="survey-join-first-page-title">
          설문 참여
        </h1>
      </header>

      <main className="survey-join-first-content">
        <div className="survey-join-first-title-box">
          <h2>{surveyData.title}</h2>
        </div>

        <div className="survey-join-first-info-box">
          <div className="survey-join-first-section">
            <h3>설문 소개</h3>

            <p className="survey-join-first-description">
              {surveyData.description}
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>문항 수</h3>

            <p>
              객관식{" "}
              {surveyData.questionCount?.multipleChoice ?? 0}
              문항
              <br />
              주관식{" "}
              {surveyData.questionCount?.subjective ?? 0}
              문항
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>설문 기간</h3>

            <p>
              {formatDate(surveyData.startDate)} ~{" "}
              {formatDate(surveyData.endDate)}
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>획득 토큰</h3>

            <p>
              최대 + {surveyData.maxToken ?? 0} 토큰
            </p>
          </div>
        </div>

        {!isLoggedIn && (
          <p className="survey-join-first-guest-text">
            게스트 계정은 토큰 획득이 불가합니다.
          </p>
        )}
      </main>

      <div className="survey-join-first-bottom-area">
        <button
          className="survey-join-first-start-button"
          type="button"
          onClick={handleStartSurvey}
          disabled={isSurveyClosed}
        >
          {isSurveyClosed
            ? "종료된 설문입니다"
            : "설문 참여하기"}
        </button>
      </div>

      {isGuestModalOpen && (
        <div
          className="survey-join-first-modal-overlay"
          onClick={handleCloseGuestModal}
        >
          <div
            className="survey-join-first-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="survey-join-first-modal-title">
              게스트 계정입니다.
            </h2>

            <p className="survey-join-first-modal-description">
              계속 진행할까요?
            </p>

            <div className="survey-join-first-modal-button-area">
              <button
                className="survey-join-first-modal-login-button"
                type="button"
                onClick={handleGoLogin}
              >
                로그인
              </button>

              <button
                className="survey-join-first-modal-guest-button"
                type="button"
                onClick={handleContinueAsGuest}
              >
                게스트로 계속
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SurveyJoinFirst;