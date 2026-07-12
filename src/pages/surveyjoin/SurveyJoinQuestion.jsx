import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSurveyQuestions,
  submitSurveyResponse,
} from "../../api/surveyApi";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // API에서 order 순서대로 내려오지만 프론트에서도 한 번 더 정렬합니다.
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

    return typeof answer !== "string" || answer.trim() === "";
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

  const maxRewardToken =
    multipleQuestionCount + subjectiveQuestionCount * 2;

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

      // 복수 선택 문항
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

      // 단일 선택 문항
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
      return Array.isArray(answer)
        ? answer.length > 0
        : Boolean(answer);
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
    if (isSubmitting) return;

    setIsExitModalOpen(true);
  };

  const handleCloseExitModal = () => {
    if (isSubmitting) return;

    setIsExitModalOpen(false);
  };

  const handleGoSurveyJoinFirst = () => {
    navigate(`/main`);
  };

  const handleCloseSubmitModal = () => {
    if (isSubmitting) return;

    setIsSubmitModalOpen(false);
  };

  /**
   * 게스트 식별 키를 가져오거나 새로 생성합니다.
   */
  const getOrCreateGuestKey = () => {
    const storageKey = "surveyGuestKey";
    const savedGuestKey = localStorage.getItem(storageKey);

    if (savedGuestKey) {
      return savedGuestKey;
    }

    const newGuestKey = crypto.randomUUID();
    localStorage.setItem(storageKey, newGuestKey);

    return newGuestKey;
  };

  /**
   * answers state를 제출 API 요청 형식으로 변환합니다.
   *
   * 객관식:
   * {
   *   questionId,
   *   selectedOptionIds
   * }
   *
   * 주관식:
   * {
   *   questionId,
   *   answerText
   * }
   *
   * 응답하지 않은 선택 문항은 요청 배열에서 제외합니다.
   */
  const createSubmitData = () => {
    const submittedAnswers = orderedQuestions
      .map((question) => {
        const answer = answers[question.questionId];

        if (question.type === "MULTIPLE_CHOICE") {
          const selectedOptionIds = Array.isArray(answer)
            ? answer
            : answer
              ? [answer]
              : [];

          if (selectedOptionIds.length === 0) {
            return null;
          }

          return {
            questionId: question.questionId,
            selectedOptionIds,
          };
        }

        if (question.type === "SUBJECTIVE") {
          const answerText =
            typeof answer === "string" ? answer.trim() : "";

          if (!answerText) {
            return null;
          }

          return {
            questionId: question.questionId,
            answerText,
          };
        }

        return null;
      })
      .filter(Boolean);

    return {
      answers: submittedAnswers,
    };
  };

  const handleSubmitMemberSurvey = async () => {
  if (isSubmitting) return;

  try {
    setIsSubmitting(true);
    setErrorMessage("");

    const requestBody = createSubmitData();

    if (requestBody.answers.length === 0) {
      setErrorMessage("최소 한 개 이상의 문항에 응답해주세요.");
      setIsSubmitModalOpen(false);
      return;
    }

    const result = await submitSurveyResponse(
      surveyId,
      requestBody,
    );

    setIsSubmitModalOpen(false);

    navigate("/surveyjoinfinish", {
      state: {
        rewardToken:
          result?.tokenReward?.earnedToken ?? totalRewardToken,
        userToken: result?.tokenBalanceAfter ?? 0,
      },
    });
  } catch (error) {
    console.error("회원 설문 제출 실패:", error);

    const errorCode = error.response?.data?.code;
    const serverMessage = error.response?.data?.message;

    if (errorCode === "RESPONSE_002") {
      setErrorMessage("이미 참여한 설문입니다.");
    } else {
      setErrorMessage(serverMessage || "설문 제출에 실패했습니다.");
    }

    setIsSubmitModalOpen(false);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSubmitGuestSurvey = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const submitData = createSubmitData();

      if (submitData.answers.length === 0) {
        setErrorMessage("최소 한 개 이상의 문항에 응답해주세요.");
        setIsSubmitModalOpen(false);
        return;
      }

      const requestBody = {
        guestKey: getOrCreateGuestKey(),
        ...submitData,
      };

      const result = await submitSurveyResponse(
        surveyId,
        requestBody,
      );

      setIsSubmitModalOpen(false);

      navigate("/guestsurveyjoinfinish", {
        state: {
          responseId: result?.responseId,
        },
      });
    } catch (error) {
      console.error("게스트 설문 제출 실패:", error);

      const errorCode = error.response?.data?.code;
      const serverMessage = error.response?.data?.message;

      if (errorCode === "RESPONSE_002") {
        setErrorMessage("이미 참여한 설문입니다.");
      } else {
        setErrorMessage(serverMessage || "설문 제출에 실패했습니다.");
      }

      setIsSubmitModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
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
            {[...(currentQuestion.options || [])]
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
                    onClick={() =>
                      handleSelectOption(option.optionId)
                    }
                    disabled={isSubmitting}
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
            onChange={(event) =>
              handleSubjectiveChange(event.target.value)
            }
            disabled={isSubmitting}
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
          disabled={isSubmitting}
        >
          이전
        </button>

        <button
          className="survey-question-next-button"
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {isLastQuestion ? "완료하기" : "다음"}
        </button>
      </footer>

      {isSubmitModalOpen && isLogin && (
        <div className="survey-submit-modal-overlay">
          <div className="survey-submit-modal">
            <h2 className="survey-submit-modal-title">
              제출하시겠습니까?
            </h2>

            <div className="survey-submit-modal-info">
              <div className="survey-submit-modal-row">
                <span>최대 획득 가능</span>
                <span>{maxRewardToken} 토큰</span>
              </div>

              <div className="survey-submit-modal-row">
                <span>건너 뛴 문항</span>
                <span>
                  주관식 ({skippedSubjectiveCount}문항)
                </span>
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
                disabled={isSubmitting}
              >
                취소
              </button>

              <button
                className="survey-submit-modal-confirm"
                type="button"
                onClick={handleSubmitMemberSurvey}
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "등록"}
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
                disabled={isSubmitting}
              >
                취소
              </button>

              <button
                className="survey-guest-submit-modal-confirm"
                type="button"
                onClick={handleSubmitGuestSurvey}
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "제출"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isExitModalOpen && (
        <div className="survey-exit-modal-overlay">
          <div className="survey-exit-modal">
            <h2 className="survey-exit-modal-title">
              설문을 나가시겠어요?
            </h2>

            <p className="survey-exit-modal-description">
              지금 나가시면 입력된 내용이 저장되지 않습니다.
            </p>

            <div className="survey-exit-modal-buttons">
              <button
                className="survey-exit-modal-cancel"
                type="button"
                onClick={handleCloseExitModal}
                disabled={isSubmitting}
              >
                취소
              </button>

              <button
                className="survey-exit-modal-confirm"
                type="button"
                onClick={handleGoSurveyJoinFirst}
                disabled={isSubmitting}
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