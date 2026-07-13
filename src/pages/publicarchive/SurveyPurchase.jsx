import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getArchiveSurveyViewInfo,
  purchaseArchiveSurvey,
} from '../../api/archiveApi';
import { getMyInfo } from '../../api/user';
import Line from '../../assets/images/Line.svg'; // 💡 피그마 가이드라인 지정 화살표 매핑
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

  // 카테고리 디스플레이용 한글 사전
  const categoryMap = {
    ALL: '전체',
    CAREER: '진로·취업',
    IT_AI: 'IT·AI',
    SERVICE_APP: '서비스·앱',
    CONSUMER_MARKETING: '소비·마케팅',
    GAME: '게임',
    SCHOOL_LIFE: '학교생활',
    DAILY: '일상',
    PSYCHOLOGY: '심리',
    ETC: '기타',
  };

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

        const data = await getArchiveSurveyViewInfo(surveyId);

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
          viewCost: data?.viewCost ?? 15,
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

  const handlePurchaseConfirm = async () => {
    if (!surveyData) return;

    if (userTokenBalance < surveyData.viewCost) {
      setIsModalOpen(false);
      setIsTokenShortModalOpen(true);
      return;
    }

    try {
      setIsModalOpen(false);
      setIsLoading(true);

      const response = await purchaseArchiveSurvey(surveyId);

      let resResult = null;
      if (response && response.isSuccess && response.result) {
        resResult = response.result;
      } else if (response && response.data && response.data.result) {
        resResult = response.data.result;
      }

      if (resResult) {
        setUserTokenBalance(Number(resResult.tokenBalanceAfter));
      }

      setIsPurchased(true);
      navigate(`/surveydetail/${surveyId}`);
    } catch (payError) {
      console.error('아카이브 열람 구매 실패 에러 로그:', payError);
      const errorData = payError.response?.data;
      const errorCode = errorData?.code;

      if (errorCode === 'TOKEN_001' || payError.response?.status === 400) {
        setIsTokenShortModalOpen(true);
      } else {
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="survey-purchase-page">
        <p className="survey-purchase-state-message">처리 중입니다...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="survey-purchase-page">
        <header className="survey-purchase-header">
          <img
            src={Line}
            alt="뒤로가기"
            className="survey-purchase-back-img"
            onClick={() => navigate('/archivemain')}
          />
        </header>
        <p className="survey-purchase-state-message">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="survey-purchase-page">
      {/* --- [1] 헤더 영역 (Line.svg 이미지 매핑) --- */}
      <header className="survey-purchase-header">
        <img
          src={Line}
          alt="뒤로가기"
          className="survey-purchase-back-img"
          onClick={() => navigate('/archivemain')}
        />
      </header>

      <main className="survey-purchase-content">
        {/* --- [2] 상단 배너 카드 영역 (💡 카테고리 배지 + 대상 문구 전면 복구) --- */}
        <div className="survey-purchase-title-box">
          <div className="survey-purchase-title-left">
            <h2 className="survey-purchase-title">{surveyData.title}</h2>
            <div className="survey-purchase-badge-row">
              <span className="survey-purchase-badge">
                {categoryMap[surveyData.category] ||
                  surveyData.category ||
                  '기타'}
              </span>
              <span className="survey-purchase-target-text">
                {surveyData.target || '대학생'} 대상
              </span>
            </div>
          </div>
          <span className="survey-purchase-token">
            열람 · {surveyData.viewCost}토큰
          </span>
        </div>

        {/* --- [3] 중앙 데이터 정보 상자 --- */}
        <div className="survey-purchase-info-box">
          <div className="survey-purchase-info-section">
            <h3>설문 소개</h3>
            <p className="survey-purchase-description">
              {surveyData.description}
            </p>
          </div>

          <div className="survey-purchase-info-section">
            <h3>설문 기간</h3>
            <p>
              {formatDate(surveyData.startDate)} ~{' '}
              {formatDate(surveyData.endDate)}
            </p>
          </div>

          <div className="survey-purchase-info-section">
            <h3>문항 수</h3>
            <p>
              객관식{' '}
              {surveyData.questionCount?.multipleChoice ??
                surveyData.questionCount?.objective ??
                0}
              문항 / 주관식 {surveyData.questionCount?.subjective ?? 0}문항
            </p>
          </div>

          <div className="survey-purchase-info-section">
            <h3>응답자 수</h3>
            <p>{surveyData.respondentCount ?? 0}명</p>
          </div>
        </div>

        <p className="survey-purchase-notice">
          설문 결과를 열람하면 토큰이 차감되며, 열람한 데이터는 [마이페이지] -
          [열람한 설문]에서 언제든지 다시 확인할 수 있습니다.
        </p>
      </main>

      {/* --- [4] 하단 고정 버튼 영역 (💡 피그마 텍스트 조건 적용) --- */}
      <div className="survey-purchase-bottom-area">
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
            : `${surveyData.viewCost}토큰 소모하고 설문 열람하기`}
        </button>
      </div>

      {/* 토큰 소모 최종 확인 모달창 */}
      {isModalOpen && (
        <div
          className="survey-purchase-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="survey-purchase-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="survey-purchase-modal-title">
              토큰을 소모하여 열람하시겠습니까?
            </h2>
            <p className="survey-purchase-modal-description">
              현재 보유 토큰은 {userTokenBalance}토큰입니다.
              <br />이 설문 결과를 열람하면 {surveyData.viewCost}토큰이
              차감됩니다.
            </p>
            <div className="survey-purchase-modal-button-area">
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
        <div
          className="survey-purchase-modal-overlay"
          onClick={() => setIsTokenShortModalOpen(false)}
        >
          <div
            className="survey-token-short-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="survey-purchase-modal-title">토큰이 부족합니다.</h2>
            <div className="survey-purchase-modal-button-area">
              <button
                className="survey-token-short-button"
                type="button"
                onClick={() => setIsTokenShortModalOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SurveyPurchase;
