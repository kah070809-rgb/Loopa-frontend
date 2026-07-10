import React, { useState } from 'react';
import Loopa from '../assets/images/Loopa.svg';
import Go from '../assets/images/Go.svg';
import Plus from '../assets/images/plus.svg';
import File from '../assets/images/File.svg';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSurveyId, setSelectedSurveyId] = useState(1);

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

  const dummySurveys = [
    {
      surveyId: 1,
      title: '대학생 AI 활용 실태 조사',
      category: 'IT·AI',
      target: '대학생 대상',
      token: 18,
      duration: '3분',
    },
    {
      surveyId: 2,
      title: '재택근무 만족도 조사',
      category: '라이프스타일',
      target: '직장인 대상',
      token: 18,
      duration: '3분',
    },
    {
      surveyId: 3,
      title: '숏폼 콘텐츠 이용 현황 조사',
      category: '심리',
      target: '대학생 대상',
      token: 18,
      duration: '3분',
    },
    {
      surveyId: 4,
      title: '카페 이용 패턴 조사',
      category: '학업, 진로',
      target: '대학생 대상',
      token: 13,
      duration: '2분',
    },
  ];

  const filteredSurveys =
    selectedCategory === '전체'
      ? dummySurveys
      : dummySurveys.filter((survey) => survey.category === selectedCategory);

  const handleProtectedAction = (actionName) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      alert(`[확인] 로그인 상태 - ${actionName} 화면 이동`);
    }
  };

  return (
    <div
      className="main-page-container"
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        padding: '30px 24px 40px 24px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
      }}
    >
      {/* --------------------------------------------------------
         [1] 헤더 영역 (62x27 버튼 정확히 반영)
      -------------------------------------------------------- */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <img
          src={Loopa}
          alt="Loopa"
          style={{ height: '28px', objectFit: 'contain' }}
        />
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{
            width: '62px',
            height: '27px',
            borderRadius: '14px',
            border: '1.5px solid #DDBFFF',
            backgroundColor: '#ffffff',
            color: '#5D01C6',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            boxSizing: 'border-box',
          }}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </header>

      {/* --------------------------------------------------------
         [2] 상단 유저 / 게스트 카드 영역 (★ 피그마 시안 100% 정밀 싱크 매칭)
      -------------------------------------------------------- */}
      {isLoggedIn ? (
        <div
          style={{
            backgroundColor: '#ffffff', // 배경은 무조건 순수 흰색
            border: '1.5px solid #DDBFFF', // 얇고 연한 보라색 테두리선
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 아바타, 인사말, 보유 토큰 가로 배치 정렬 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#5D01C6',
                  flexShrink: 0,
                }}
              ></div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#5D01C6' }}>
                  안녕하세요,
                </p>
                <h3
                  style={{
                    margin: '2px 0 0 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#5D01C6',
                  }}
                >
                  likelion@gmail.com님!
                </h3>
              </div>
            </div>

            {/* 우측 정렬된 보유 토큰 영역 */}
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontSize: '11px',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                }}
              >
                보유 토큰
              </span>
              <p
                style={{
                  margin: '2px 0 0 0',
                  fontSize: '12px',
                  color: '#5D01C6',
                  opacity: 0.7,
                }}
              >
                124개
              </p>
            </div>
          </div>

          {/* ★ 핵심 수정: 내 설문 보기 버튼을 우측 하단에 그라데이션 알약 형태로 배치 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px',
            }}
          >
            <button
              onClick={() => alert('마이페이지 화면으로 이동')}
              style={{
                padding: '8px 24px',
                borderRadius: '20px',
                border: 'none',
                background:
                  'linear-gradient(90deg, rgba(183, 119, 255, 0.4) 0%, rgba(236, 219, 255, 0.4) 100%)', // 40% 그라데이션 스펙 준수
                color: '#5D01C6',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              내 설문 보기
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleProtectedAction('게스트 상단 카드')}
          style={{
            backgroundColor: '#ffffff', // 배경은 무조건 순수 흰색
            border: '1.5px solid #DDBFFF', // 얇고 연한 보라색 테두리선
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            cursor: 'pointer',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#5D01C6',
                flexShrink: 0,
              }}
            ></div>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#5D01C6' }}>
                안녕하세요,
              </p>
              <h3
                style={{
                  margin: '2px 0 8px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#5D01C6',
                }}
              >
                현재 게스트 계정입니다.
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: '#5D01C6',
                  lineHeight: '1.5',
                }}
              >
                로그인하여 설문을 만들어보세요!
                <br />
                설문 참여만 가능합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------
         [3] 설문 만들기 배너
      -------------------------------------------------------- */}
      <div
        onClick={() => handleProtectedAction('설문 만들기')}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #B777FF 0%, #ECDBFF 51%)',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '32px',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3
            style={{
              margin: 0,
              color: '#5D01C6',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            설문 만들기
          </h3>
          <p
            style={{
              margin: 0,
              color: '#5D01C6',
              fontSize: '11px',
            }}
          >
            새로운 설문을 만들고 응답자를 모집해보세요.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
          }}
        >
          <img
            src={Go}
            alt=""
            style={{ width: '14px', height: '14px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* --------------------------------------------------------
         [4] 참여 가능한 설문 목록 섹션
      -------------------------------------------------------- */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '17px',
              color: '#5D01C6',
              fontWeight: 'bold',
            }}
          >
            참여 가능한 설문
          </h2>
          <div
            onClick={() => alert('참여 가능한 설문 더보기 화면으로 이동')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: '#5D01C6',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            더보기
            <img
              src={Plus}
              alt=""
              style={{
                height: '10px',
                marginLeft: '2px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* 카테고리 칩 영역 (가로 스크롤) */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: '8px',
            marginBottom: '16px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: '6px',
            boxSizing: 'border-box',
          }}
          className="category-scroll-block"
        >
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border:
                  selectedCategory === cat ? 'none' : '1.5px solid #EADDFF',
                backgroundColor:
                  selectedCategory === cat ? '#DDBFFF' : '#ffffff',
                color: '#5D01C6',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-block',
                flexShrink: 0,
                minWidth: 'max-content',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 설문 리스트 2x2 그리드 배치 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {filteredSurveys.length > 0 ? (
            filteredSurveys.map((survey) => {
              const isSelected = survey.surveyId === selectedSurveyId;

              return (
                <div
                  key={survey.surveyId}
                  onClick={() => setSelectedSurveyId(survey.surveyId)}
                  style={{
                    border: isSelected ? 'none' : '2px solid #EADDFF',
                    borderRadius: '20px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: isSelected ? '#DDBFFF' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: isSelected ? '155px' : '115px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <h4
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#5D01C6',
                        fontWeight: 'bold',
                        lineHeight: '1.4',
                        wordBreak: 'keep-all',
                      }}
                    >
                      {survey.title}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '11px',
                          color: '#5D01C6',
                          opacity: 0.8,
                        }}
                      >
                        {survey.target} • {survey.token}토큰
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '11px',
                          color: '#5D01C6',
                          opacity: 0.8,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        시간: {survey.duration}
                      </p>
                    </div>
                  </div>

                  {/* 선택된 카드 내부에만 참여하기 버튼 노출 */}
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`${survey.title} 설문 참여하기 화면 이동`);
                      }}
                      style={{
                        marginTop: '12px',
                        width: '100%',
                        padding: '8px 0',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#ffffff',
                        color: '#5D01C6',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(93, 1, 198, 0.08)',
                      }}
                    >
                      참여하기
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: 'span 2',
                textAlign: 'center',
                padding: '30px 20px',
                color: '#5D01C6',
                fontSize: '13px',
              }}
            >
              해당 카테고리의 설문이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------
         [5] 하단 공공 아카이브
      -------------------------------------------------------- */}
      <div
        onClick={() => handleProtectedAction('공공 아카이브')}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F8F2FF',
          borderRadius: '20px',
          padding: '20px 24px',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={File}
            alt=""
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div>
            <h3
              style={{
                margin: '0 0 4px 0',
                color: '#5D01C6',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              공공 아카이브
            </h3>
            <p
              style={{
                margin: 0,
                color: '#5D01C6',
                fontSize: '11px',
                lineHeight: '1.4',
                opacity: 0.9,
              }}
            >
              공유된 설문 데이터를 검색하고
              <br />
              과제, 연구에 다시 활용해보세요.
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
          }}
        >
          <img
            src={Go}
            alt=""
            style={{ width: '14px', height: '14px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* --------------------------------------------------------
         [6] 게스트 진입 차단 팝업
      -------------------------------------------------------- */}
      {showLoginPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              backgroundColor: '#DDBFFF',
              width: '280px',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 0 24px 0',
                color: '#5D01C6',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              로그인이 필요한 서비스예요
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowLoginPopup(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  alert('로그인 화면으로 이동');
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#5D01C6',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .category-scroll-block::-webkit-scrollbar {
          display: none !important;
        }
        .main-page-container div::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default MainPage;
