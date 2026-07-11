import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyQuestions } from "../../api/surveyApi";
import "./SurveyJoinQuestion.css";

function SurveyJoinQuestion() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // accessToken이 있으면 회원, 없으면 게스트로 판단합니다.
  const isLogin = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    const loadSurveyQuestions = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const questionList = await getSurveyQuestions(surveyId);
        setQuestions(questionList);
      } catch (error) {
        console.error("설문 문항 조회 실패:", error);

        const serverMessage = error.response?.data?.message;
        setFetchError(serverMessage || "설문 문항을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!surveyId) {
      setFetchError("설문 ID가 없습니다.");
      setIsLoading(false);
      return;
    }

    loadSurveyQuestions();
  }, [surveyId]);

  // API에서 order 순서대로 내려오지만, 프론트에서도 한 번 더 정렬합니다.
  const orderedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => a.order - b.order);
  }, [questions]);

  const totalQuestionCount = orderedQuestions.length;
  const currentQuestion = orderedQuestions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestionCount - 1;

  const multipleQuestionCount = orderedQuestions.filter(
    (question) => question.type === "MULTIPLE_CHOICE",
  ).length;

  const subjectiveQuestionCount = orderedQuestions.filter(
    (question) => question.type === "SUBJECTIVE",
  ).length;

  const skippedSubjectiveCount = orderedQuestions.filter((question) => {
    if (question.type !== "SUBJECTIVE") return false;

    const answer = answers[question.questionId];
    return !answer || answer.trim() === "";
  }).length;

  const answeredMultipleCount = orderedQuestions.filter((question) => {
    if (question.type !== "MULTIPLE_CHOICE") return false;

    const answer = answers[question.questionId];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  }).length;

  const answeredSubjectiveCount = orderedQuestions.filter((question) => {
    if (question.type !== "SUBJECTIVE") return false;

    const answer = answers[question.questionId];
    return typeof answer === "string" && answer.trim() !== "";
  }).length;

  const maxRewardToken = multipleQuestionCount + subjectiveQuestionCount * 2;
  const totalRewardToken =
    answeredMultipleCount + answeredSubjectiveCount * 2;

  const currentQuestionNumber = currentIndex + 1;
  const progressPercent = totalQuestionCount
    ? (currentQuestionNumber / totalQuestionCount) * 100
    : 0;

  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.questionId]
    : undefined;

  const handleSelectOption = (optionId) => {
    if (!currentQuestion) return;

    setAnswers((prev) => {
      const questionId = currentQuestion.questionId;
      const currentAnswer = prev[questionId];

      // 복수 선택 문항: optionId 배열로 저장
      if (currentQuestion.allowMultiple) {
        const selectedOptionIds = Array.isArray(currentAnswer)
          ? currentAnswer
          : [];

        const nextOptionIds = selectedOptionIds.includes(optionId)
          ? selectedOptionIds.filter((id) => id !== optionId)
          : [...selectedOptionIds, optionId];

        if (nextOptionIds.length === 0) {
          const nextAnswers = { ...prev };
          delete nextAnswers[questionId];
          return nextAnswers;
        }

        return {
          ...prev,
          [questionId]: nextOptionIds,
        };
      }

      // 단일 선택 문항: optionId 하나만 저장
      if (currentAnswer === optionId) {
        const nextAnswers = { ...prev };
        delete nextAnswers[questionId];
        return nextAnswers;
      }

      return {
        ...prev,
        [questionId]: optionId,
      };
    });

    setErrorMessage("");
  };

  const handleSubjectiveChange = (value) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionId]: value,
    }));

    setErrorMessage("");
  };

  const hasCurrentAnswer = () => {
    if (!currentQuestion) return false;

    const answer = answers[currentQuestion.questionId];

    if (currentQuestion.type === "MULTIPLE_CHOICE") {
      return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
    }

    if (currentQuestion.type === "SUBJECTIVE") {
      return typeof answer === "string" && answer.trim() !== "";
    }

    return false;
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      navigate(-1);
      return;
    }

    setCurrentIndex((prev) => prev - 1);
    setErrorMessage("");
  };

  const handleNext = () => {
    if (currentQuestion?.isRequired && !hasCurrentAnswer()) {
      setErrorMessage("필수 응답 항목입니다.");
      return;
    }

    if (isLastQuestion) {
      setIsSubmitModalOpen(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setErrorMessage("");
  };

  const handleOpenExitModal = () => {
    setIsExitModalOpen(true);
  };

  const handleCloseExitModal = () => {
    setIsExitModalOpen(false);
  };

  const handleGoSurveyJoinFirst = () => {
    navigate("/surveyjoinfirst");
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  // 제출 API가 연결되기 전 임시 데이터입니다.
  const createSubmitData = () => ({
    surveyId: Number(surveyId),
    answers: orderedQuestions.map((question) => {
      const answer = answers[question.questionId];

      if (question.type === "MULTIPLE_CHOICE") {
        return {
          questionId: question.questionId,
          selectedOptionIds: Array.isArray(answer)
            ? answer
            : answer
              ? [answer]
              : [],
        };
      }

      return {
        questionId: question.questionId,
        subjectiveAnswer: answer || "",
      };
    }),
  });

  const handleSubmitMemberSurvey = () => {
    const submitData = createSubmitData();
    console.log("로그인 회원 제출 데이터:", submitData);

    setIsSubmitModalOpen(false);
    navigate("/surveyjoinfinish", {
      state: {
        rewardToken: totalRewardToken,
        userToken: 140 + totalRewardToken,
      },
    });
  };

  const handleSubmitGuestSurvey = () => {
    const submitData = {
      ...createSubmitData(),
      isGuest: true,
    };

    console.log("게스트 제출 데이터:", submitData);

    setIsSubmitModalOpen(false);
    navigate("/guestsurveyjoinfinish");
  };

  if (isLoading) {
    return (
      <section className="survey-question-page">
        <p>설문 문항을 불러오는 중입니다.</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="survey-question-page">
        <p className="survey-question-error">{fetchError}</p>
        <button type="button" onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="survey-question-page">
        <p>등록된 설문 문항이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="survey-question-page">
      <header className="survey-question-header">
        <button
          className="survey-question-back-button"
          type="button"
          onClick={handleOpenExitModal}
        >
          ←
        </button>

        <h1 className="survey-question-header-title">설문 참여</h1>
      </header>

      <div className="survey-question-progress-row">
        <div className="survey-question-progress-track">
          <div
            className="survey-question-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="survey-question-count">
          {currentQuestionNumber} / {totalQuestionCount}
        </p>
      </div>

      <main className="survey-question-content">
        <h2 className="survey-question-title">
          Q{currentQuestionNumber}. {currentQuestion.content}
          {currentQuestion.isRequired && " *"}
        </h2>

        {currentQuestion.type === "MULTIPLE_CHOICE" && (
          <div className="survey-question-option-list">
            {[...currentQuestion.options]
              .sort((a, b) => a.order - b.order)
              .map((option) => {
                const isSelected = currentQuestion.allowMultiple
                  ? Array.isArray(selectedAnswer) &&
                    selectedAnswer.includes(option.optionId)
                  : selectedAnswer === option.optionId;

                return (
                  <button
                    key={option.optionId}
                    className={`survey-question-option ${
                      isSelected ? "selected" : ""
                    }`}
                    type="button"
                    onClick={() => handleSelectOption(option.optionId)}
                  >
                    <span className="survey-question-radio">
                      <span className="survey-question-radio-dot" />
                    </span>

                    <span className="survey-question-option-text">
                      {option.content}
                    </span>
                  </button>
                );
              })}
          </div>
        )}

        {currentQuestion.type === "SUBJECTIVE" && (
          <textarea
            className="survey-question-textarea"
            placeholder="자유롭게 입력해주세요."
            value={answers[currentQuestion.questionId] || ""}
            onChange={(event) => handleSubjectiveChange(event.target.value)}
          />
        )}

        {errorMessage && (
          <p className="survey-question-error">{errorMessage}</p>
        )}
      </main>

      <footer className="survey-question-footer">
        <button
          className="survey-question-prev-button"
          type="button"
          onClick={handlePrev}
        >
          이전
        </button>

        <button
          className="survey-question-next-button"
          type="button"
          onClick={handleNext}
        >
          {isLastQuestion ? "완료하기" : "다음"}
        </button>
      </footer>

      {isSubmitModalOpen && isLogin && (
        <div className="survey-submit-modal-overlay">
          <div className="survey-submit-modal">
            <h2 className="survey-submit-modal-title">제출하시겠습니까?</h2>

            <div className="survey-submit-modal-info">
              <div className="survey-submit-modal-row">
                <span>최대 획득 가능</span>
                <span>{maxRewardToken} 토큰</span>
              </div>

              <div className="survey-submit-modal-row">
                <span>건너 뛴 문항</span>
                <span>주관식 ({skippedSubjectiveCount}문항)</span>
              </div>
            </div>

            <div className="survey-submit-modal-line" />

            <div className="survey-submit-modal-total">
              <span>총 획득 토큰</span>
              <span>{totalRewardToken} 토큰</span>
            </div>

            <div className="survey-submit-modal-buttons">
              <button
                className="survey-submit-modal-cancel"
                type="button"
                onClick={handleCloseSubmitModal}
              >
                취소
              </button>

              <button
                className="survey-submit-modal-confirm"
                type="button"
                onClick={handleSubmitMemberSurvey}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitModalOpen && !isLogin && (
        <div className="survey-guest-submit-modal-overlay">
          <div className="survey-guest-submit-modal">
            <h2 className="survey-guest-submit-modal-title">
              제출하시겠습니까?
            </h2>

            <div className="survey-guest-submit-modal-buttons">
              <button
                className="survey-guest-submit-modal-cancel"
                type="button"
                onClick={handleCloseSubmitModal}
              >
                취소
              </button>

              <button
                className="survey-guest-submit-modal-confirm"
                type="button"
                onClick={handleSubmitGuestSurvey}
              >
                제출
              </button>
            </div>
          </div>
        </div>
      )}

      {isExitModalOpen && (
        <div className="survey-exit-modal-overlay">
          <div className="survey-exit-modal">
            <h2 className="survey-exit-modal-title">설문을 나가시겠어요?</h2>

            <p className="survey-exit-modal-description">
              지금 나가시면 입력된 내용이 저장되지 않습니다.
            </p>

            <div className="survey-exit-modal-buttons">
              <button
                className="survey-exit-modal-cancel"
                type="button"
                onClick={handleCloseExitModal}
              >
                취소
              </button>

              <button
                className="survey-exit-modal-confirm"
                type="button"
                onClick={handleGoSurveyJoinFirst}
              >
                메인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SurveyJoinQuestion;