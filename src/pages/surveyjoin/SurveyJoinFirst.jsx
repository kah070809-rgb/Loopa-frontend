import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyJoinFirst.css";

function SurveyJoinFirst() {
  const navigate = useNavigate();

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  // 백엔드 로그인 연동 전 임시 로그인 상태
  // false: 게스트 팝업 표시
  // true: 팝업 없이 바로 설문 문항 페이지로 이동
  const isLoggedIn = false;

  // 현재 초기 페이지 라우터에 surveyId가 없으므로 임시로 1 사용
  const currentSurveyId = 1;

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

  // 설문 참여하기 버튼
  const handleStartSurvey = () => {
    // 로그인 사용자는 팝업 없이 문항 페이지로 이동
    if (isLoggedIn) {
      navigate(`/survey/join/${currentSurveyId}/question`, {
        state: {
          isGuest: false,
        },
      });

      return;
    }

    // 게스트 사용자는 팝업 열기
    setIsGuestModalOpen(true);
  };

  // 팝업의 로그인 버튼
  const handleGoLogin = () => {
    navigate("/login", {
      state: {
        // 로그인 성공 후 다시 돌아올 주소
        redirectTo: "/surveyjoinfirst",
      },
    });
  };

  // 팝업의 게스트로 계속 버튼
  const handleContinueAsGuest = () => {
    setIsGuestModalOpen(false);

    navigate(`/survey/join/${currentSurveyId}/question`, {
      state: {
        isGuest: true,
      },
    });
  };

  // 팝업 바깥 영역 클릭 시 닫기
  const handleCloseGuestModal = () => {
    setIsGuestModalOpen(false);
  };

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
              {surveyData.startDate} ~ {surveyData.endDate}
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
          onClick={handleStartSurvey}
        >
          설문 참여하기
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