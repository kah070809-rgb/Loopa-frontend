import React, { useState, useEffect } from 'react';
import * as S from './Mainpage.style'; // 분리된 스타일 컴포넌트 임포트
import Loopa from '../assets/images/Loopa.svg';
import Go from '../assets/images/Go.svg';
import Plus from '../assets/images/plus.svg';
import File from '../assets/images/File.svg';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSurveyId, setSelectedSurveyId] = useState(1);

  // API 연동을 위한 상태 (더미 데이터 제거 후 빈 배열로 초기화)
  const [surveys, setSurveys] = useState([]);

  // 백엔드 연동을 위한 유저 정보 상태 (API 응답 데이터용)
  const [userInfo, setUserInfo] = useState({
    email: 'likelion@gmail.com',
    tokenBalance: 124,
  });

  const categoryList = [
    '전체',
    '라이프스타일',
    '학업, 진로',
    '심리',
    'IT·AI',
    '서비스·앱',
    '소비·마케팅',
    '게임',
    '학교생활',
    '기타',
  ];

  /*
   * TODO: API 연동 시 useEffect 내에서 서버 데이터를 fetch하여 setSurveys에 담아줍니다.
   * useEffect(() => {
   *   fetchSurveys().then(data => setSurveys(data));
   * }, []);
   */

  // 카테고리 필터링
  const filteredSurveys =
    selectedCategory === '전체'
      ? surveys
      : surveys.filter((survey) => survey.category === selectedCategory);

  const handleProtectedAction = (actionName) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      alert(`[확인] 로그인 상태 - ${actionName} 화면 이동`);
    }
  };

  return (
    <S.Container>
      {/* --- [1] 헤더 영역 --- */}
      <S.Header>
        <S.Logo src={Loopa} alt="Loopa" />
        <S.AuthBtn onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </S.AuthBtn>
      </S.Header>

      {/* --- [2] 상단 유저 / 게스트 카드 영역 --- */}
      {isLoggedIn ? (
        <S.CardContainer $isGuest={false}>
          <S.UserInfoWrapper>
            <S.FlexGroup>
              <S.Avatar />
              <div>
                <S.Greeting>안녕하세요,</S.Greeting>
                <S.EmailTitle>{userInfo.email}님!</S.EmailTitle>
              </div>
            </S.FlexGroup>

            <S.TokenBox>
              <S.TokenLabel>보유 토큰</S.TokenLabel>
              <S.TokenCount>{userInfo.tokenBalance}개</S.TokenCount>
            </S.TokenBox>
          </S.UserInfoWrapper>

          <S.MySurveyBtnWrapper>
            <S.MySurveyBtn onClick={() => alert('마이페이지 화면으로 이동')}>
              내 설문 보기
            </S.MySurveyBtn>
          </S.MySurveyBtnWrapper>
        </S.CardContainer>
      ) : (
        <S.CardContainer
          $isGuest={true}
          onClick={() => handleProtectedAction('게스트 상단 카드')}
        >
          <S.FlexGroup>
            <S.Avatar />
            <div>
              <S.Greeting>안녕하세요,</S.Greeting>
              <S.EmailTitle style={{ marginBottom: '8px' }}>
                현재 게스트 계정입니다.
              </S.EmailTitle>
              <S.GuestDesc>
                로그인하여 설문을 만들어보세요!
                <br />
                설문 참여만 가능합니다.
              </S.GuestDesc>
            </div>
          </S.FlexGroup>
        </S.CardContainer>
      )}

      {/* --- [3] 설문 만들기 배너 --- */}
      <S.BannerCard onClick={() => handleProtectedAction('설문 만들기')}>
        <S.FlexGroup style={{ gap: '10px' }}>
          <S.BannerTitle>설문 만들기</S.BannerTitle>
          <S.BannerDesc>
            새로운 설문을 만들고 응답자를 모집해보세요.
          </S.BannerDesc>
        </S.FlexGroup>
        <S.CircleIconBox>
          <img
            src={Go}
            alt="go"
            // style={{ width: '14px', height: '14px', objectFit: 'contain' }}
          />
        </S.CircleIconBox>
      </S.BannerCard>

      {/* --- [4] 참여 가능한 설문 목록 섹션 --- */}
      <div style={{ marginBottom: '32px' }}>
        <S.SectionHeader>
          <S.SectionTitle>참여 가능한 설문</S.SectionTitle>
          <S.MoreBtn
            onClick={() => alert('참여 가능한 설문 더보기 화면으로 이동')}
          />
          <img
            src={Plus}
            alt="plus"
            style={{
              height: '17px',
              marginLeft: '2px',
              objectFit: 'contain',
            }}
          />
        </S.SectionHeader>

        {/* 카테고리 칩 영역 */}
        <S.CategoryScrollBox>
          {categoryList.map((cat) => (
            <S.CategoryButton
              key={cat}
              $isSelected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </S.CategoryButton>
          ))}
        </S.CategoryScrollBox>

        {/* 설문 리스트 그리드 영역 */}
        <S.SurveyGrid>
          {filteredSurveys.length > 0 ? (
            filteredSurveys.map((survey) => {
              const isSelected = survey.surveyId === selectedSurveyId;

              return (
                <S.SurveyCard
                  key={survey.surveyId}
                  $isSelected={isSelected}
                  onClick={() => setSelectedSurveyId(survey.surveyId)}
                >
                  <div style={{ width: '100%' }}>
                    <S.SurveyTitle>{survey.title}</S.SurveyTitle>

                    <S.SurveyInfoGroup>
                      <S.SurveyInfoText>
                        {survey.target} • {survey.token}토큰
                      </S.SurveyInfoText>
                      <S.SurveyInfoText $nowrap>
                        시간: {survey.duration}
                      </S.SurveyInfoText>
                    </S.SurveyInfoGroup>
                  </div>

                  {isSelected && (
                    <S.ParticipateBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`${survey.title} 설문 참여하기 화면 이동`);
                      }}
                    >
                      참여하기
                    </S.ParticipateBtn>
                  )}
                </S.SurveyCard>
              );
            })
          ) : (
            <S.EmptyMessage>해당 카테고리의 설문이 없습니다.</S.EmptyMessage>
          )}
        </S.SurveyGrid>
      </div>

      {/* --- [5] 하단 공공 아카이브 --- */}
      <S.ArchiveCard onClick={() => handleProtectedAction('공공 아카이브')}>
        <S.FlexGroup style={{ gap: '16px' }}>
          <img
            src={File}
            alt="file"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div>
            <S.BannerTitle style={{ marginBottom: '4px' }}>
              공공 아카이브
            </S.BannerTitle>
            <S.BannerDesc style={{ lineHeight: '1.4', opacity: 0.9 }}>
              공유된 설문 데이터를 검색하고
              <br />
              과제, 연구에 다시 활용해보세요.
            </S.BannerDesc>
          </div>
        </S.FlexGroup>
        <S.CircleIconBox>
          <img
            src={Go}
            alt="go"
            style={{ width: '14px', height: '14px', objectFit: 'contain' }}
          />
        </S.CircleIconBox>
      </S.ArchiveCard>

      {/* --- [6] 게스트 진입 차단 팝업 --- */}
      {showLoginPopup && (
        <S.PopupOverlay>
          <S.PopupBox>
            <S.PopupTitle>로그인이 필요한 서비스예요</S.PopupTitle>
            <S.PopupBtnGroup>
              <S.PopupCancelBtn onClick={() => setShowLoginPopup(false)}>
                취소
              </S.PopupCancelBtn>
              <S.PopupLoginBtn
                onClick={() => {
                  setShowLoginPopup(false);
                  alert('로그인 화면으로 이동');
                }}
              >
                로그인하기
              </S.PopupLoginBtn>
            </S.PopupBtnGroup>
          </S.PopupBox>
        </S.PopupOverlay>
      )}
    </S.Container>
  );
};

export default MainPage;
