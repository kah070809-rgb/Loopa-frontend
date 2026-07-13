import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 스타일 파일 임포트 (모든 스타일은 S 객체 안에 담깁니다)
import * as S from './Mypage.style';
import Backmy from '../assets/images/Backmy.svg';
import Download from '../assets/images/Download.svg';
import Del from '../assets/images/Del.svg';

// 💡 분리해둔 API 함수 세트 메뉴 임포트
import { logout } from '../api/auth';
import { getMyInfo, getMySurveys, getViewedSurveys } from '../api/user';
import { deleteSurvey } from '../api/survey';

const MyPage = () => {
  const navigate = useNavigate();
  // 탭 상태 관리 ('registered' = 내가 등록한 설문, 'viewed' = 열람한 설문)
  const [activeTab, setActiveTab] = useState('registered');

  // 삭제 확인 팝업 노출 상태
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  // 백엔드 API 연동을 위한 데이터 상태 관리 (초기값 비우기)
  const [registeredSurveys, setRegisteredSurveys] = useState([]);
  const [viewedSurveys, setViewedSurveys] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    tokenBalance: 0,
  });

  // 1️⃣ [유저 정보 및 설문 데이터 fetch] 화면이 켜지자마자 유저 정보와 등록/열람 리스트를 전부 긁어옵니다.
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 내 정보 조회
        const infoRes = await getMyInfo();
        if (infoRes.isSuccess) {
          setUserInfo({
            email: infoRes.result.email,
            tokenBalance: infoRes.result.tokenBalance,
          });
        }

        // 내가 등록한 설문 목록 조회
        const mySurveysRes = await getMySurveys({ size: 20 });
        if (mySurveysRes.isSuccess) {
          setRegisteredSurveys(mySurveysRes.result.items);
        }

        // 열람한 설문 목록 조회
        const viewedSurveysRes = await getViewedSurveys({ size: 20 });
        if (viewedSurveysRes.isSuccess) {
          setViewedSurveys(viewedSurveysRes.result.items);
        }
      } catch (error) {
        console.error('마이페이지 데이터 조회 실패:', error);
      }
    };

    fetchAllData();
  }, []);

  // 2️⃣ [로그아웃 핸들러] 버튼 클릭 시 토큰 비우고 상태 리셋
  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        await logout(refreshToken);
      } catch (error) {
        console.error('서버 로그아웃 실패:', error);
      } finally {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다.');
        // 보통 여기서 메인이나 로그인 화면으로 튕겨줍니다.
        window.location.href = '/';
      }
    }
  };

  // 공유 버튼 클릭 핸들러
  const handleShareClick = async (surveyId) => {
    const shareUrl = `${window.location.origin}/surveyjoinfirst/${surveyId}`;

    try {
      // 클립보드에 게스트 참여 링크 복사 실행
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  // 휴지통 클릭 핸들러
  const handleDeleteClick = (surveyId) => {
    setSelectedForDelete(surveyId);
    setShowDeletePopup(true);
  };

  // 3️⃣ [최종 삭제 실행 핸들러] 백엔드 DELETE API 호출 후 화면 갱신
  const confirmDelete = async () => {
    try {
      const response = await deleteSurvey(selectedForDelete);

      if (response.isSuccess) {
        alert('설문이 정상적으로 삭제되었습니다.');
        // 삭제 성공 후 내가 등록한 설문 목록 상태에서 방금 지운 걸 걸러내어 화면을 새로고침 없이 바로 업데이트합니다.
        setRegisteredSurveys((prev) =>
          prev.filter((s) => s.surveyId !== selectedForDelete),
        );
      }
    } catch (error) {
      console.error('설문 삭제 실패:', error);
    } finally {
      setShowDeletePopup(false);
      setSelectedForDelete(null);
    }
  };

  return (
    <S.Container>
      {/* --- [1] 헤더 영역 --- */}
      <S.Header>
        <S.BackWrapper onClick={() => window.history.back()}>
          <img
            src={Backmy}
            alt="뒤로가기"
            style={{ height: '18px', objectFit: 'contain' }}
          />
        </S.BackWrapper>
        <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
      </S.Header>

      {/* --- [2] 상단 유저 정보 카드 --- */}
      <S.ProfileCard>
        <S.ProfileAvatar />
        <div>
          <S.ProfileGreeting>안녕하세요,</S.ProfileGreeting>
          <S.ProfileEmail>
            {userInfo.email || '불러오는 중...'}님!
          </S.ProfileEmail>
        </div>
        <S.TokenWrapper>
          <S.TokenLabel>보유 토큰</S.TokenLabel>
          <S.TokenCount>{userInfo.tokenBalance}개</S.TokenCount>
        </S.TokenWrapper>
      </S.ProfileCard>

      {/* --- [3] 탭 스위치 영역 --- */}
      <S.TabContainer>
        <S.TabButton
          $isActive={activeTab === 'registered'}
          onClick={() => setActiveTab('registered')}
        >
          내가 등록한 설문
        </S.TabButton>
        <S.TabButton
          $isActive={activeTab === 'viewed'}
          onClick={() => setActiveTab('viewed')}
        >
          열람한 설문
        </S.TabButton>
      </S.TabContainer>

      {/* --- [4] 리스트 렌더링 영역 --- */}
      <S.ListWrapper>
        {/* === 내가 등록한 설문 탭 === */}
        {activeTab === 'registered' && registeredSurveys.length > 0 ? (
          registeredSurveys.map((survey) => (
            <S.RegisteredCard key={survey.surveyId}>
              <S.CardHeader>
                <S.CardTitleWrapper>
                  <S.CardTitle>{survey.title}</S.CardTitle>
                  {/* 진행상태 양식 매핑 (IN_PROGRESS 등) */}
                  <S.StatusBadge $status={survey.status}>
                    {survey.status === 'IN_PROGRESS' ? '진행중' : '종료'}
                  </S.StatusBadge>
                </S.CardTitleWrapper>

                <S.IconGroup>
                  <img
                    src={Download}
                    alt="공유"
                    onClick={() =>
                      handleShareClick(`/surveyjoinfirst/${survey.surveyId}`)
                    }
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                    }}
                  />
                  <img
                    src={Del}
                    alt="삭제"
                    onClick={() => handleDeleteClick(survey.surveyId)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                    }}
                  />
                </S.IconGroup>
              </S.CardHeader>

              {/* 가짜 survey.date를 진짜 필드인 survey.createdAt으로 변경 */}
              <S.CardDate>게시일: {survey.createdAt}</S.CardDate>

              <S.CardFooter>
                <S.CardInfoText>
                  {survey.target} · 응답자 수 : {survey.respondentCount}명
                </S.CardInfoText>
                <S.DetailLink
                  onClick={() => navigate(`/surveydetail/${survey.surveyId}`)}
                >
                  자세히 보기 &gt;
                </S.DetailLink>
              </S.CardFooter>
            </S.RegisteredCard>
          ))
        ) : activeTab === 'registered' ? (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#5D01C6',
              fontSize: '13px',
            }}
          >
            등록한 설문이 없습니다.
          </div>
        ) : null}

        {/* === 열람한 설문 탭 === */}
        {activeTab === 'viewed' && viewedSurveys.length > 0 ? (
          viewedSurveys.map((survey, index) => (
            <S.ViewedCard key={survey.surveyId} $isFirst={index === 0}>
              <S.CardTitle style={{ marginBottom: '8px' }}>
                {survey.title}
              </S.CardTitle>
              {/* 진짜 필드인 survey.createdAt으로 날짜 매핑 */}
              <S.CardDate>게시일: {survey.createdAt}</S.CardDate>

              <S.CardFooter>
                <S.CardInfoText>
                  응답자 수 : {survey.respondentCount}명
                </S.CardInfoText>
                <S.DetailLink
                  onClick={() => navigate(`/surveydetail/${survey.surveyId}`)}
                >
                  자세히 보기 &gt;
                </S.DetailLink>
              </S.CardFooter>
            </S.ViewedCard>
          ))
        ) : activeTab === 'viewed' ? (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#5D01C6',
              fontSize: '13px',
            }}
          >
            열람한 설문이 없습니다.
          </div>
        ) : null}
      </S.ListWrapper>

      {/* --- [5] 휴지통 삭제 확인 팝업 --- */}
      {showDeletePopup && (
        <S.PopupOverlay>
          <S.PopupBox>
            <S.PopupTitle>정말 삭제하시겠습니까?</S.PopupTitle>
            <S.PopupDesc>삭제한 설문은 복구할 수 없습니다.</S.PopupDesc>

            <S.PopupBtnGroup>
              <S.PopupCancelBtn onClick={() => setShowDeletePopup(false)}>
                취소
              </S.PopupCancelBtn>
              <S.PopupDeleteBtn onClick={confirmDelete}>삭제</S.PopupDeleteBtn>
            </S.PopupBtnGroup>
          </S.PopupBox>
        </S.PopupOverlay>
      )}
    </S.Container>
  );
};

export default MyPage;
