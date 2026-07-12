import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Mainpage.style';
import Loopa from '../assets/images/Loopa.svg';
import Go from '../assets/images/Go.svg';
import Plus from '../assets/images/plus.svg';
import File from '../assets/images/File.svg';

// API 세트 메뉴 임포트
import { logout } from '../api/auth';
import { getMyInfo } from '../api/user';
import { getAvailableSurveys } from '../api/survey';

const MainPage = () => {
  const navigate = useNavigate(); // 라우터 이동용 훅 선언

  // 로그인 상태 판단 (로컬 스토리지 토큰 유무 기준)
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  // API 연동 데이터 상태창 (초기값은 디자인 잔상이 안 남도록 빈 값 세팅)
  const [surveys, setSurveys] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    tokenBalance: 0,
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

  // 1️⃣ [유저 정보 가져오기] 로그인 상태일 때만 내 정보를 서버에서 불러옵니다.
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUserInfo = async () => {
      try {
        const responseData = await getMyInfo();
        if (responseData.isSuccess) {
          setUserInfo({
            email: responseData.result.email,
            tokenBalance: responseData.result.tokenBalance,
          });
        }
      } catch (error) {
        console.error('유저 정보 조회 실패:', error);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  // 2️⃣ [참여 가능한 설문 목록 가져오기] 카테고리가 바뀔 때마다 백엔드 서버에 새로 조회합니다.
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const apiCategory =
          selectedCategory === '전체' ? null : selectedCategory;

        const responseData = await getAvailableSurveys({
          category: apiCategory,
          size: 20,
        });

        if (responseData.isSuccess) {
          setSurveys(responseData.result.items);
          if (responseData.result.items.length > 0) {
            setSelectedSurveyId(responseData.result.items[0].surveyId);
          } else {
            setSelectedSurveyId(null);
          }
        }
      } catch (error) {
        console.error('설문 목록 조회 실패:', error);
      }
    };

    fetchSurveys();
  }, [selectedCategory]);

  // 3️⃣ [로그인/로그아웃 버튼 핸들러] 토큰을 지우고 실시간으로 게스트 카드로 스위칭합니다.
  const handleAuthAction = async () => {
    if (isLoggedIn) {
      if (window.confirm('로그아웃 하시겠습니까?')) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          await logout(refreshToken);
        } catch (error) {
          console.error('서버 로그아웃 처리 실패:', error);
        } finally {
          // 로컬 스토리지 비우기 및 상태 리셋으로 게스트 카드 즉시 렌더링
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLoggedIn(false);
          setUserInfo({ email: '', tokenBalance: 0 });
          alert('로그아웃되었습니다. 게스트 모드로 전환합니다.');
        }
      }
    } else {
      // 로그인 창 화면으로 이동
      alert('로그인 화면으로 이동합니다.');
      navigate('/login');
    }
  };

  // 권한이 필요한 액션 처리 (이동 경로 매핑 추가)
  const handleProtectedAction = (actionName, targetPath) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      if (targetPath) {
        navigate(targetPath);
      }
    }
  };

  return (
    <S.Container>
      {/* --- [1] 헤더 영역 --- */}
      <S.Header>
        <S.Logo src={Loopa} alt="Loopa" />
        <S.AuthBtn onClick={handleAuthAction}>
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
            <S.MySurveyBtn onClick={() => navigate('/mypage')}>
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

      {/* --- [3] 설문 만들기 배너 (로그인 시 /create 이동) --- */}
      <S.BannerCard
        onClick={() => handleProtectedAction('설문 만들기', '/create')}
      >
        <S.FlexGroup style={{ gap: '10px' }}>
          <S.BannerTitle>설문 만들기</S.BannerTitle>
          <S.BannerDesc>
            새로운 설문을 만들고 응답자를 모집해보세요.
          </S.BannerDesc>
        </S.FlexGroup>
        <S.CircleIconBox>
          <img src={Go} alt="go" />
        </S.CircleIconBox>
      </S.BannerCard>

      {/* --- [4] 참여 가능한 설문 목록 섹션 --- */}
      <div style={{ marginBottom: '32px' }}>
        <S.SectionHeader>
          <S.SectionTitle>참여 가능한 설문</S.SectionTitle>
          <S.MoreBtn onClick={() => navigate('/surveys')} />
          <img
            src={Plus}
            alt="plus"
            onClick={() => navigate('/surveys')}
            style={{
              height: '17px',
              marginLeft: '2px',
              objectFit: 'contain',
              cursor: 'pointer',
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
          {surveys.length > 0 ? (
            surveys.map((survey) => {
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
                        {survey.target} • {survey.maxToken}토큰
                      </S.SurveyInfoText>
                      <S.SurveyInfoText $nowrap>
                        시간: {survey.estimatedMinutes}분
                      </S.SurveyInfoText>
                    </S.SurveyInfoGroup>
                  </div>

                  {isSelected && (
                    <S.ParticipateBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        // 💡 설문 참여하기 버튼 클릭 시 /create로 이동합니다.
                        navigate("/surveyjoinfirst/:surveyId");
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

      {/* --- [5] 하단 공공 아카이브 (로그인 시 /archivemain 이동) --- */}
      <S.ArchiveCard
        onClick={() => handleProtectedAction('공공 아카이브', '/archivemain')}
      >
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
                  navigate('/login');
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
