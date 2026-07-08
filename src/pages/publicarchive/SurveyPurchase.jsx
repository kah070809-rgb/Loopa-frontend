import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyPurchase.css";

function SurveyPurchase() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPurchased, setIsPurchased] = useState(false);

  const [isTokenShortModalOpen, setIsTokenShortModalOpen] = useState(false);
 
  const PURCHASE_TOKEN = 15;

  const userToken = 2;

  const surveyData = {
    title: '대학생 AI 활용 실태 조사',
    description:
      '대학생들의 AI 활용 경험과 인식을 파악하기 위한 설문입니다. 응답하신 내용은 통계 분석 목적으로만 사용됩니다.',
    startDate: '2026.07.01',
    endDate: '2026.07.13',
    objectiveQuestionCount: 7,
    subjectiveQuestionCount: 2,
    respondentCount: 52,
  };

  const handlePurchaseConfirm = () => {
  if (userToken < PURCHASE_TOKEN) {
    setIsModalOpen(false);
    setIsTokenShortModalOpen(true);
    return;
  }

  setIsModalOpen(false);
  setIsPurchased(true);
};

  return (
    <section className="survey-purchase-page">
      <button 
       className="survey-purchase-back-button" 
       type="button"
       onClick={() => navigate("/archivemain")}>
        ←
      </button>

      <div className="survey-purchase-title-box">
        <h1 className="survey-purchase-title">{surveyData.title}</h1>

        <span className="survey-purchase-token">
          열람 · {PURCHASE_TOKEN}토큰
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
            {surveyData.startDate} ~ {surveyData.endDate}
          </p>
        </div>

        <div className="survey-purchase-info-section">
          <h2>문항 수</h2>
          <p>객관식 {surveyData.objectiveQuestionCount}문항</p>
          <p>주관식 {surveyData.subjectiveQuestionCount}문항</p>
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
       navigate("/survey-result");
       return;
       }

       setIsModalOpen(true);
       }}
      >
         {isPurchased ? "열람하기" : `${PURCHASE_TOKEN}토큰 소모하고 열람하기`}
      </button>

      {isModalOpen && (
         <div className="survey-purchase-modal-overlay">
             <div className="survey-purchase-modal">
                 <h2>토큰을 소모하여 열람하시겠습니까?</h2>

                 <p>
                     이 설문 결과를 열람하면 15 토큰이 차감됩니다.
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