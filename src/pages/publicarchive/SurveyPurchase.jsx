import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getArchiveSurveyViewInfo,
  purchaseArchiveSurvey,
} from '../../api/archiveApi';
import { getMyInfo } from '../../api/user';
import './SurveyPurchase.css';

function SurveyPurchase() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [surveyData, setSurveyData] = useState(null);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);

  // 모달 제어 상태창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTokenShortModalOpen, setIsTokenShortModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSurveyAndUserData = async () => {
      if (!surveyId) {
        setErrorMessage('설문 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');

        // 1. 설문 정보 가져오기 호출
        const data = await getArchiveSurveyViewInfo(surveyId);

        // 2. 로그인 유저 토큰 잔액 실시간 연동
        try {
          const userRes = await getMyInfo();
          if (userRes && userRes.isSuccess && userRes.result) {
            setUserTokenBalance(Number(userRes.result.tokenBalance || 0));
          } else if (userRes && userRes.data && userRes.data.result) {
            setUserTokenBalance(Number(userRes.data.result.tokenBalance || 0));
          }
        } catch (tokenErr) {
          console.error('유저 보유 코인 조회 실패:', tokenErr);
        }

        const formattedData = {
          ...data,
          viewCost: data?.viewCost ?? 15, // 명세서 기준 기본 15토큰 고정
        };

        setSurveyData(formattedData);
        setIsPurchased(data?.alreadyViewed || false);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) {
          setErrorMessage('로그인이 필요합니다. 다시 로그인해주세요.');
        } else if (status === 404) {
          setErrorMessage('존재하지 않는 설문입니다.');
        } else {
          setErrorMessage('설문 정보를 불러오지 못했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyAndUserData();
  }, [surveyId]);

  const formatDate = (dateText) => {
    if (!dateText) return '';
    return dateText.replaceAll('-', '.');
  };

  // ── 💡 새 명세서 규격을 완벽히 반영한 구매 승인 핸들러 ──
  const handlePurchaseConfirm = async () => {
    if (!surveyData) return;

    // 프론트엔드 1차 예외 선행 차단
    if (userTokenBalance < surveyData.viewCost) {
      setIsModalOpen(false);
      setIsTokenShortModalOpen(true);
      return;
    }

    try {
      setIsModalOpen(false);
      setIsLoading(true);

      // 명세서 규격 POST /archive/surveys/{surveyId}/views API 전송 호출
      const response = await purchaseArchiveSurvey(surveyId);

      // 백엔드 성공 규격 (3-1. Success Response) 바인딩 및 파싱 방어 구축
      let resResult = null;
      if (response && response.isSuccess && response.result) {
        resResult = response.result;
      } else if (response && response.data && response.data.result) {
        resResult = response.data.result;
      }

      if (resResult) {
        // 서버에서 차감 완료된 후의 잔액을 프론트 상태창에 즉시 업데이트 동기화
        setUserTokenBalance(Number(resResult.tokenBalanceAfter));
      }

      setIsPurchased(true);

      // 성공 후 명세서 요구 지침에 맞춰 곧바로 상세 결과 페이지로 연동 이동
      navigate(`/surveydetail/${surveyId}`);
    } catch (payError) {
      console.error('아카이브 열람 구매 실패 에러 로그:', payError);

      const errorData = payError.response?.data;
      const errorCode = errorData?.code;

      // 3-2. Error Response 명세서 Scenario (TOKEN_001) 예외 매핑 처리 분기
      if (errorCode === 'TOKEN_001' || payError.response?.status === 400) {
        setIsTokenShortModalOpen(true);
      } else {
        alert(errorData?.message || '열람권 획득 중 서버 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="survey-purchase-page">
        <button
          className="survey-purchase-back-button"
          type="button"
          onClick={() => navigate('/archivemain')}
        >
          ←
        </button>
        <p className="survey-purchase-state-message">처리 중입니다...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="survey-purchase-page">
        <button
          className="survey-purchase-back-button"
          type="button"
          onClick={() => navigate('/archivemain')}
        >
          ←
        </button>
        <p className="survey-purchase-state-message">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="survey-purchase-page">
      <button
        className="survey-purchase-back-button"
        type="button"
        onClick={() => navigate('/archivemain')}
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
            {formatDate(surveyData.startDate)} ~{' '}
            {formatDate(surveyData.endDate)}
          </p>
        </div>
        <div className="survey-purchase-info-section">
          <h2>문항 수</h2>
          <p>
            객관식{' '}
            {surveyData.questionCount?.multipleChoice ??
              surveyData.questionCount?.objective ??
              0}
            문항
          </p>
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
            navigate(`/surveydetail/${surveyId}`);
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        {isPurchased
          ? '열람하기'
          : `${surveyData.viewCost}토큰 소모하고 열람하기`}
      </button>

      {/* 토큰 소모 최종 확인 모달창 */}
      {isModalOpen && (
        <div className="survey-purchase-modal-overlay">
          <div className="survey-purchase-modal">
            <h2>토큰을 소모하여 열람하시겠습니까?</h2>
            <p>
              현재 보유 토큰은 {userTokenBalance}토큰입니다.
              <br />이 설문 결과를 열람하면 {surveyData.viewCost}토큰이
              차감됩니다.
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

      {/* TOKEN_001 규격 토큰 부족 안내 모달창 */}
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
