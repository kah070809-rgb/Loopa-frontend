import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArchiveSurveyViewInfo } from "../../api/archiveapi";
import "./SurveyPurchase.css";

function SurveyPurchase() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [surveyData, setSurveyData] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTokenShortModalOpen, setIsTokenShortModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSurveyViewInfo = async () => {
      if (!surveyId) {
        setErrorMessage("설문 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getArchiveSurveyViewInfo(surveyId);

        setSurveyData(data);
        setIsPurchased(data.alreadyViewed);
      } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
          setErrorMessage("로그인이 필요합니다. 다시 로그인해주세요.");
        } else if (status === 404) {
          setErrorMessage("존재하지 않는 설문입니다.");
        } else {
          setErrorMessage("설문 열람 정보를 불러오지 못했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyViewInfo();
  }, [surveyId]);

  const formatDate = (dateText) => {
    if (!dateText) return "";
    return dateText.replaceAll("-", ".");
  };

  const handlePurchaseConfirm = () => {
    if (!surveyData) return;

    if (surveyData.tokenBalance < surveyData.viewCost) {
      setIsModalOpen(false);
      setIsTokenShortModalOpen(true);
      return;
    }

    setIsModalOpen(false);

    // 지금은 구매 API가 아직 연결되지 않았기 때문에
    // 프론트에서만 구매 완료 상태로 바꾸는 임시 처리입니다.
    setIsPurchased(true);
  };

  if (isLoading) {
    return (
      <section className="survey-purchase-page">
        <button
          className="survey-purchase-back-button"
          type="button"
          onClick={() => navigate("/archivemain")}
        >
          ←
        </button>

        <p className="survey-purchase-state-message">
          설문 열람 정보를 불러오는 중입니다.
        </p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="survey-purchase-page">
        <button
          className="survey-purchase-back-button"
          type="button"
          onClick={() => navigate("/archivemain")}
        >
          ←
        </button>

        <p className="survey-purchase-state-message">{errorMessage}</p>
      </section>
    );
  }

  if (!surveyData) {
    return (
      <section className="survey-purchase-page">
        <button
          className="survey-purchase-back-button"
          type="button"
          onClick={() => navigate("/archivemain")}
        >
          ←
        </button>

        <p className="survey-purchase-state-message">
          설문 정보를 찾을 수 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="survey-purchase-page">
      <button
        className="survey-purchase-back-button"
        type="button"
        onClick={() => navigate("/archivemain")}
      >
        ←
      </button>

      <div className="survey-purchase-title-box">
        <h1 className="survey-purchase-title">{surveyData.title}</h1>

        <span className="survey-purchase-token">
          열람 · {surveyData.viewCost}토큰
        </span>
      </div>

      <div className="survey-purchase-info-box">
        <div className="survey-purchase-info-section">
          <h2>설문 소개</h2>
          <p>{surveyData.description}</p>
        </div>

        <div className="survey-purchase-info-section">
          <h2>설문 기간</h2>
          <p>
            {formatDate(surveyData.startDate)} ~ {formatDate(surveyData.endDate)}
          </p>
        </div>

        <div className="survey-purchase-info-section">
          <h2>문항 수</h2>
          <p>객관식 {surveyData.questionCount?.multipleChoice ?? 0}문항</p>
          <p>주관식 {surveyData.questionCount?.subjective ?? 0}문항</p>
        </div>

        <div className="survey-purchase-info-section">
          <h2>응답자 수</h2>
          <p>{surveyData.respondentCount}명</p>
        </div>
      </div>

      <p className="survey-purchase-notice">
        설문 결과를 열람하면 토큰이 차감되며, 열람한 데이터는 [마이페이지] -
        [열람한 설문]에서 언제든지 다시 확인할 수 있습니다.
      </p>

      <button
        className="survey-purchase-button"
        type="button"
        onClick={() => {
          if (isPurchased) {
            navigate("/SurveyDetail");
            return;
          }

          setIsModalOpen(true);
        }}
      >
        {isPurchased
          ? "열람하기"
          : `${surveyData.viewCost}토큰 소모하고 열람하기`}
      </button>

      {isModalOpen && (
        <div className="survey-purchase-modal-overlay">
          <div className="survey-purchase-modal">
            <h2>토큰을 소모하여 열람하시겠습니까?</h2>

            <p>
              현재 보유 토큰은 {surveyData.tokenBalance}토큰입니다.
              <br />
              이 설문 결과를 열람하면 {surveyData.viewCost}토큰이 차감됩니다.
            </p>

            <div className="survey-purchase-modal-buttons">
              <button
                className="survey-purchase-modal-cancel"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>

              <button
                className="survey-purchase-modal-confirm"
                type="button"
                onClick={handlePurchaseConfirm}
              >
                열람하기
              </button>
            </div>
          </div>
        </div>
      )}

      {isTokenShortModalOpen && (
        <div className="survey-purchase-modal-overlay">
          <div className="survey-token-short-modal">
            <h2>토큰이 부족합니다.</h2>

            <button
              className="survey-token-short-button"
              type="button"
              onClick={() => setIsTokenShortModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SurveyPurchase;