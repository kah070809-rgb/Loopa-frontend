import React, { useState, useEffect } from 'react';
// 스타일 파일 임포트 (모든 스타일은 S 객체 안에 담깁니다)
import * as S from './Mypage.style';
import Backmy from '../assets/images/Backmy.svg';
import Download from '../assets/images/Download.svg';
import Del from '../assets/images/Del.svg';

const MyPage = () => {
  // 탭 상태 관리 ('registered' = 내가 등록한 설문, 'viewed' = 열람한 설문)
  const [activeTab, setActiveTab] = useState('registered');

  // 삭제 확인 팝업 노출 상태
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  // 백엔드 API 연동을 위한 빈 배열 상태 (더미 데이터 제거)
  const [registeredSurveys, setRegisteredSurveys] = useState([]);
  const [viewedSurveys, setViewedSurveys] = useState([]);

  // 백엔드 연동을 위한 유저 정보 상태
  const [userInfo, setUserInfo] = useState({
    email: 'likelion@gmail.com',
    tokenBalance: 124,
  });

  /*
   * TODO: 컴포넌트 마운트 시 API 호출 로직 예시
   * useEffect(() => {
   *   fetchMySurveys().then(res => setRegisteredSurveys(res.data));
   *   fetchViewedSurveys().then(res => setViewedSurveys(res.data));
   * }, []);
   */

  // 공유 버튼 클릭 핸들러
  const handleShareClick = (surveyId) => {
    // TODO: surveyId를 활용한 링크 생성 로직 추가
    alert('설문지 링크가 클립보드에 복사되었습니다.');
  };

  // 휴지통 클릭 핸들러
  const handleDeleteClick = (id) => {
    setSelectedForDelete(id);
    setShowDeletePopup(true);
  };

  // 최종 삭제 실행 핸들러
  const confirmDelete = () => {
    // TODO: 백엔드 삭제 API 연동 (DELETE /api/surveys/{selectedForDelete})
    setShowDeletePopup(false);
    alert(`ID ${selectedForDelete}번 설문이 삭제되었습니다.`);
  };

  return (
    <S.Container>
      {/* --- [1] 헤더 영역 --- */}
      <S.Header>
        <S.BackWrapper onClick={() => alert('메인 화면으로 이동')}>
          <img
            src={Backmy}
            alt="뒤로가기"
            style={{ height: '18px', objectFit: 'contain' }}
          />
          <S.Title>마이페이지</S.Title>
        </S.BackWrapper>
        <S.LogoutBtn onClick={() => alert('로그아웃 되었습니다.')}>
          로그아웃
        </S.LogoutBtn>
      </S.Header>

      {/* --- [2] 상단 유저 정보 카드 --- */}
      <S.ProfileCard>
        <S.ProfileAvatar />
        <div>
          <S.ProfileGreeting>안녕하세요,</S.ProfileGreeting>
          <S.ProfileEmail>{userInfo.email}님!</S.ProfileEmail>
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
            <S.RegisteredCard key={survey.id}>
              <S.CardHeader>
                <S.CardTitleWrapper>
                  <S.CardTitle>{survey.title}</S.CardTitle>
                  <S.StatusBadge $status={survey.status}>
                    {survey.status}
                  </S.StatusBadge>
                </S.CardTitleWrapper>

                <S.IconGroup>
                  <img
                    src={Download}
                    alt="공유"
                    onClick={() => handleShareClick(survey.id)}
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
                    onClick={() => handleDeleteClick(survey.id)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                    }}
                  />
                </S.IconGroup>
              </S.CardHeader>

              <S.CardDate>{survey.date}</S.CardDate>

              <S.CardFooter>
                <S.CardInfoText>
                  {survey.target} · 응답자 수 : {survey.respondents}
                </S.CardInfoText>
                <S.DetailLink onClick={() => alert('설문 열람(상세) 이동')}>
                  자세히 보기 &gt;
                </S.DetailLink>
              </S.CardFooter>
            </S.RegisteredCard>
          ))
        ) : activeTab === 'registered' ? (
          // 데이터가 없을 때 보여줄 UI (선택사항)
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
            // isFirst prop을 인덱스를 통해 판별하여 배경색 동적 부여
            <S.ViewedCard key={survey.id} $isFirst={index === 0}>
              <S.CardTitle style={{ marginBottom: '8px' }}>
                {survey.title}
              </S.CardTitle>
              <S.CardDate>{survey.date}</S.CardDate>

              <S.CardFooter>
                <S.CardInfoText>
                  응답자 수 : {survey.respondents}
                </S.CardInfoText>
                <S.DetailLink onClick={() => alert('설문 열람(상세) 이동')}>
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
