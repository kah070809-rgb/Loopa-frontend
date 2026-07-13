import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './Mainpage.style';
import Go from '../assets/images/Go.svg';
import Plus from '../assets/images/Plus.svg';
import File from '../assets/images/File.svg';
import Loopa from '../assets/images/Loopa.svg';
import { logout } from '../api/auth';
import { getAvailableSurveys } from '../api/survey';
import { getMyInfo, getMySurveys } from '../api/user';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [surveys, setSurveys] = useState([]);
  const [participatedIds, setParticipatedIds] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    tokenBalance: 0,
  });

  const categoryList = [
    { label: '전체', value: 'ALL' },
    { label: '진로·취업', value: 'CAREER' },
    { label: 'IT·AI', value: 'IT_AI' },
    { label: '서비스·앱', value: 'SERVICE_APP' },
    { label: '소비·마케팅', value: 'CONSUMER_MARKETING' },
    { label: '게임', value: 'GAME' },
    { label: '학교생활', value: 'SCHOOL_LIFE' },
    { label: '일상', value: 'DAILY' },
    { label: '심리', value: 'PSYCHOLOGY' },
    { label: '기타', value: 'ETC' },
  ];

  const isGuestMode = location.state?.isGuest || !isLoggedIn;

  // 1️⃣ [유저 정보 및 참여/등록 완료 설문 ID 목록 실연동 추출]
  useEffect(() => {
    if (isGuestMode) return;

    const fetchUserInfoAndHistory = async () => {
      try {
        // 1. 내 기본 정보 호출
        const responseData = await getMyInfo();
        if (responseData.isSuccess) {
          setUserInfo({
            email: responseData.result.email,
            tokenBalance: responseData.result.tokenBalance,
          });
        }

        // 2. 내가 응답/등록 완료한 설문 목록을 리사이징해서 가져옵니다.
        const mySurveysData = await getMySurveys({ size: 50 });
        if (mySurveysData.isSuccess && mySurveysData.result?.items) {
          // 가져온 내역 목록에서 surveyId 추출하여 배열 생성 (백엔드 필드 규격에 맞춰 매핑)
          const ids = mySurveysData.result.items.map((item) => item.surveyId);
          setParticipatedIds(ids);
        }
      } catch (error) {
        console.error('유저 정보 및 이력 동기화 실패:', error);
      }
    };

    fetchUserInfoAndHistory();
  }, [isGuestMode]);

  // 2️⃣ [참여 가능한 전체 설문 목록 가져오기 + 프론트 완벽 filter 스크리닝]
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const apiCategory =
          selectedCategory === 'ALL' ? null : selectedCategory;

        const responseData = await getAvailableSurveys({
          category: apiCategory,
          size: 4,
        });

        if (responseData.isSuccess && responseData.result?.items) {
          const pureAvailableItems = responseData.result.items.filter(
            (survey) => !participatedIds.includes(survey.surveyId),
          );

          setSurveys(pureAvailableItems);

          if (pureAvailableItems.length > 0) {
            setSelectedSurveyId(pureAvailableItems[0].surveyId);
          } else {
            setSelectedSurveyId(null);
          }
        }
      } catch (error) {
        console.error('설문 목록 조회 실패:', error);
      }
    };

    fetchSurveys();
  }, [selectedCategory, participatedIds]);

  // 3️⃣ 로그인/로그아웃 버튼 핸들러
  const handleAuthAction = async () => {
    if (isLoggedIn) {
      if (window.confirm('로그아웃 하시겠습니까?')) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          await logout(refreshToken);
        } catch (error) {
          console.error('서버 로그아웃 처리 실패:', error);
        } finally {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLoggedIn(false);
          setUserInfo({ email: '', tokenBalance: 0 });
          setParticipatedIds([]);
        }
      }
    } else {
      navigate('/login');
    }
  };

  const handleProtectedAction = (actionName, targetPath) => {
    if (isGuestMode) {
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
          {!isGuestMode ? '로그아웃' : '로그인'}
        </S.AuthBtn>
      </S.Header>

      {/* --- [2] 상단 카드 영역 --- */}
      {!isGuestMode ? (
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

      {/* --- [3] 설문 만들기 배너 --- */}
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
          <img src={Plus} alt="plus" onClick={() => navigate('/surveys')} />
        </S.SectionHeader>

        <S.CategoryScrollBox>
          {categoryList.map((cat) => (
            <S.CategoryButton
              key={cat.value}
              $isSelected={selectedCategory === cat.value}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </S.CategoryButton>
          ))}
        </S.CategoryScrollBox>

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
                        if (participatedIds.includes(survey.surveyId)) {
                          alert('이미 참여를 완료하신 설문조사입니다.');
                          return;
                        }

                        navigate(`/surveyjoinfirst/${survey.surveyId}`);
                      }}
                    >
                      참여하기
                    </S.ParticipateBtn>
                  )}
                </S.SurveyCard>
              );
            })
          ) : (
            <S.EmptyMessage>
              해당 카테고리에 참여 가능한 설문이 없습니다.
            </S.EmptyMessage>
          )}
        </S.SurveyGrid>
      </div>

      {/* --- [5] 하단 공공 아카이브 --- */}
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
