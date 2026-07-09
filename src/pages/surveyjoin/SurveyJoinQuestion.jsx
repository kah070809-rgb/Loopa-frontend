import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SurveyJoinQuestion.css";

function SurveyJoinQuestion() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  // 나중에 백엔드에서 받아올 데이터
  const surveyData = {
    id: surveyId,
    questions: [
      {
        id: 1,
        type: "MULTIPLE",
        title: "현재 학년은 어떻게 되나요?",
        options: ["1학년", "2학년", "3학년", "4학년"],
        required: true,
      },
      {
        id: 2,
        type: "MULTIPLE",
        title: "가장 자주 사용하는 AI 서비스는 무엇인가요?",
        options: ["ChatGPT", "Gemini", "Claude", "기타"],
        required: true,
      },
      {
        id: 3,
        type: "MULTIPLE",
        title: "AI를 사용하는 빈도는 어느 정도인가요?",
        options: ["매일", "주 3~4회", "가끔", "거의 사용 안 함"],
        required: true,
      },
      {
        id: 4,
        type: "SUBJECTIVE",
        title: "AI를 주로 어떤 상황에서 사용하나요?",
        required: false,
      },
    ],
  };

  const orderedQuestions = useMemo(() => {
  const multipleQuestions = surveyData.questions.filter(
    (question) => question.type === "MULTIPLE"
  );

  const subjectiveQuestions = surveyData.questions.filter(
    (question) => question.type === "SUBJECTIVE"
  );

  return [...multipleQuestions, ...subjectiveQuestions];
}, [surveyData.questions]);

  const totalQuestionCount = orderedQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 임시 로그인 여부
// true면 로그인 회원 팝업, false면 게스트 팝업
const isLogin = false;

  const currentQuestion = orderedQuestions[currentIndex];

  const isLastQuestion = currentIndex === orderedQuestions.length - 1;

  const multipleQuestionCount = orderedQuestions.filter(
  (question) => question.type === "MULTIPLE"
).length;

const subjectiveQuestionCount = orderedQuestions.filter(
  (question) => question.type === "SUBJECTIVE"
).length;

const skippedSubjectiveCount = orderedQuestions.filter((question) => {
  if (question.type !== "SUBJECTIVE") return false;

  const answer = answers[question.id];

  return !answer || answer.trim() === "";
}).length;

const answeredMultipleCount = orderedQuestions.filter((question) => {
  if (question.type !== "MULTIPLE") return false;

  return answers[question.id];
}).length;

const answeredSubjectiveCount = orderedQuestions.filter((question) => {
  if (question.type !== "SUBJECTIVE") return false;

  const answer = answers[question.id];

  return answer && answer.trim() !== "";
}).length;

const maxRewardToken = multipleQuestionCount * 1 + subjectiveQuestionCount * 2;

const totalRewardToken =
  answeredMultipleCount * 1 + answeredSubjectiveCount * 2;

  const currentQuestionNumber = currentIndex + 1;

  const progressPercent = (currentQuestionNumber / totalQuestionCount) * 100;

  const selectedAnswer = answers[currentQuestion.id];

  const handleSelectOption = (option) => {
  setAnswers((prev) => {
    const currentAnswer = prev[currentQuestion.id];

    if (currentAnswer === option) {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    }

    return {
      ...prev,
      [currentQuestion.id]: option,
    };
  });

  setErrorMessage("");
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
  const currentAnswer = answers[currentQuestion.id];

  if (
    currentQuestion.type === "MULTIPLE" &&
    currentQuestion.required &&
    !currentAnswer
  ) {
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

const handleSubmitMemberSurvey = () => {
  const submitData = {
    surveyId,
    answers: orderedQuestions.map((question) => ({
      questionId: question.id,
      type: question.type,
      answer: answers[question.id] || "",
    })),
    rewardToken: totalRewardToken,
    skippedSubjectiveCount,
  };

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
    surveyId,
    answers: orderedQuestions.map((question) => ({
      questionId: question.id,
      type: question.type,
      answer: answers[question.id] || "",
    })),
    isGuest: true,
  };

  console.log("게스트 제출 데이터:", submitData);

  setIsSubmitModalOpen(false);

  navigate("/guestsurveyjoinfinish");
};

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
          Q{currentQuestionNumber}. {currentQuestion.title}
        </h2>

        {currentQuestion.type === "MULTIPLE" && (
  <div className="survey-question-option-list">
    {currentQuestion.options.map((option) => {
      const isSelected = selectedAnswer === option;

      return (
        <button
          key={option}
          className={`survey-question-option ${isSelected ? "selected" : ""}`}
          type="button"
          onClick={() => handleSelectOption(option)}
        >
          <span className="survey-question-radio">
            <span className="survey-question-radio-dot" />
          </span>

          <span className="survey-question-option-text">
            {option}
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
    value={answers[currentQuestion.id] || ""}
    onChange={(e) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: e.target.value,
      }));
    }}
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