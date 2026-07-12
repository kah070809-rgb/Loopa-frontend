import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSurveyDetail } from '../../api/surveyApi';
import Backmy from '../../assets/images/Backmy.svg'; // 💡 통합 가져오기 완료
import './SurveyJoinFirst.css';

function SurveyJoinFirst() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [surveyData, setSurveyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  // 카테고리 코드 한글 디스플레이용 매핑 딕셔너리
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
    const fetchSurveyDetail = async () => {
      if (!surveyId) {
        setErrorMessage('설문 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await getSurveyDetail(surveyId);
        setSurveyData(data);
      } catch (error) {
        console.error('설문 상세 조회 실패:', error);
        setErrorMessage(
          error.response?.data?.message || '설문 정보를 불러오지 못했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyDetail();
  }, [surveyId]);

  const formatDate = (date) => {
    if (!date) return '-';
    return date.replaceAll('-', '.');
  };

  const isSurveyClosed =
    surveyData?.status === 'CLOSED' || surveyData?.status === 'ENDED';

  const handleStartSurvey = () => {
    if (!surveyData || isSurveyClosed) return;

    if (isLoggedIn) {
      navigate(`/survey/join/${surveyId}/question`, {
        state: { isGuest: false },
      });
      return;
    }
    setIsGuestModalOpen(true);
  };

  const handleGoLogin = () => {
    navigate('/login', {
      state: { redirectTo: `/surveyjoinfirst/${surveyId}` },
    });
  };

  const handleContinueAsGuest = () => {
    setIsGuestModalOpen(false);
    navigate(`/survey/join/${surveyId}/question`, {
      state: { isGuest: true },
    });
  };

  if (isLoading) {
    return (
      <section className="survey-join-first-page">
        <p className="survey-join-first-status-message">
          설문 정보를 불러오는 중입니다...
        </p>
      </section>
    );
  }

  if (errorMessage || !surveyData) {
    return (
      <section className="survey-join-first-page">
        <header className="survey-join-first-header">
          <img
            src={Backmy}
            alt="뒤로가기"
            className="survey-join-first-back-img"
            onClick={() => navigate(-1)}
          />
        </header>
        <p className="survey-join-first-status-message">
          {errorMessage || '설문을 찾을 수 없습니다.'}
        </p>
      </section>
    );
  }

  return (
    <section className="survey-join-first-page">
      {/* --- [1] 헤더 영역: 글자 화살표 통합 통짜 이미지 매핑 --- */}
      <header className="survey-join-first-header">
        <img
          src={Backmy}
          alt="← 설문 참여"
          className="survey-join-first-back-img"
          onClick={() => navigate(-1)}
        />
      </header>

      <main className="survey-join-first-content">
        {/* --- [2] 상단 연보라 배너 카드 구역 (서베이 리스트 카드 스타일 일치화) --- */}
        <div className="survey-join-first-title-box">
          <h2 className="survey-join-first-main-title">{surveyData.title}</h2>
          <p className="survey-join-first-sub-info">{surveyData.target} 대상</p>
          <div className="survey-join-first-badge-row">
            <span className="survey-join-first-badge">
              {categoryMap[surveyData.category] ||
                surveyData.category ||
                '기타'}
            </span>
            <span className="survey-join-first-duration">
              소요 시간 {surveyData.estimatedMinutes ?? 0}분
            </span>
          </div>
        </div>

        {/* --- [3] 중앙 정밀 데이터 보라 테두리 네모 상자 --- */}
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
              객관식 {surveyData.questionCount?.multipleChoice ?? 0}문항 /
              주관식 {surveyData.questionCount?.subjective ?? 0}문항
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>설문 기간</h3>
            <p>
              {formatDate(surveyData.startDate)} ~{' '}
              {formatDate(surveyData.endDate)}
            </p>
          </div>

          <div className="survey-join-first-section">
            <h3>획득 토큰</h3>
            <p>최대 + {surveyData.maxToken ?? 0} 토큰</p>
          </div>
        </div>

        {/* 💡 네모 박스 밖 보라색 조건 안내 글씨 */}
        {!isLoggedIn && (
          <p className="survey-join-first-guest-text">
            * 게스트 계정은 토큰 획득이 불가합니다.
          </p>
        )}
      </main>

      {/* --- [4] 하단 참여하기 제어 바 --- */}
      <div className="survey-join-first-bottom-area">
        <button
          className="survey-join-first-start-button"
          type="button"
          onClick={handleStartSurvey}
          disabled={isSurveyClosed}
        >
          {isSurveyClosed ? '종료된 설문입니다' : '설문 참여하기'}
        </button>
      </div>

      {/* 게스트 확인 스위칭 팝업창 모달 */}
      {isGuestModalOpen && (
        <div
          className="survey-join-first-modal-overlay"
          onClick={handleContinueAsGuest}
        >
          <div
            className="survey-join-first-modal"
            onClick={(e) => e.stopPropagation()}
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
