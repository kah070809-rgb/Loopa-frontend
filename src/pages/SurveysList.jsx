import React, { useState } from 'react';
import Backmy from '../assets/images/Backmy.svg';
import Search from '../assets/images/Search.svg';

const SurveyListPage = () => {
  // 카테고리 상태 (기본값: '전체')
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 검색창 입력 상태 및 실제 검색 실행(버튼 클릭) 상태 분리
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 카테고리 목록
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

  // 더미 데이터 (검색 및 카테고리 필터링 테스트용)
  const dummySurveys = [
    {
      surveyId: 1,
      title: '대학생 AI 활용 실태 조사',
      category: 'IT·AI',
      target: '대학생 대상',
      token: 18,
      duration: '3분',
      isFirst: true, // 첫 번째 카드 배경색(DDBFFF) 지정을 위함
    },
    {
      surveyId: 2,
      title: '재택근무 만족도 조사',
      category: 'IT·AI', // 피그마 이미지상 IT·AI 칩이 박혀있어 테스트용으로 통일
      target: '직장인 대상',
      token: 18,
      duration: '3분',
      isFirst: false, // 두 번째부터는 연한 배경(F8F2FF)
    },
    {
      surveyId: 3,
      title: '대학생 AI 활용 실태 조사',
      category: 'IT·AI',
      target: '대학생 대상',
      token: 18,
      duration: '3분',
      isFirst: false,
    },
    {
      surveyId: 4,
      title: '새로운 모바일 RPG 선호도',
      category: '게임',
      target: '20대 대상',
      token: 20,
      duration: '5분',
      isFirst: false,
    },
  ];

  // 필터링 로직: 1. 카테고리 필터 -> 2. 돋보기 버튼 누른 검색어 필터
  const filteredSurveys = dummySurveys.filter((survey) => {
    const matchCategory =
      selectedCategory === '전체' || survey.category === selectedCategory;
    const matchSearch = survey.title.includes(searchTerm);
    return matchCategory && matchSearch;
  });

  // 돋보기 버튼 클릭 핸들러 (이때 필터링이 실행됨)
  const handleSearchClick = () => {
    setSearchTerm(searchInput);
  };

  // 엔터키 입력 시 검색 실행 (편의성 추가)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div
      className="survey-list-container"
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        padding: '30px 30px 40px 30px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      {/* --------------------------------------------------------
         [1] 헤더 영역 (이미지 에셋으로 통째로 적용)
      -------------------------------------------------------- */}
      <header
        style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}
      >
        <img
          src={Backmy}
          alt="참여 가능한 설문 타이틀"
          onClick={() => alert('메인 화면으로 뒤로가기')}
          style={{ height: '24px', cursor: 'pointer', objectFit: 'contain' }}
        />
      </header>

      {/* --------------------------------------------------------
         [2] 검색 바 영역
      -------------------------------------------------------- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1.5px solid #5D01C6', // 테두리 진한 보라
          borderRadius: '30px',
          padding: '4px 8px 4px 20px',
          marginBottom: '24px',
        }}
      >
        <input
          type="text"
          placeholder="설문 제목 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#5D01C6',
            backgroundColor: 'transparent',
          }}
        />
        {/* 🌟 피그마에서 추출한 돋보기 버튼 이미지 적용 */}
        <img
          src={Search}
          alt="검색"
          onClick={handleSearchClick}
          style={{ width: '36px', height: '36px', cursor: 'pointer' }}
        />
      </div>

      {/* --------------------------------------------------------
         [3] 카테고리 칩 가로 스크롤 영역
      -------------------------------------------------------- */}
      <div
        className="category-scroll-box"
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          width: '100%',
          paddingBottom: '6px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categoryList.map((cat) => {
          const isCatSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: isCatSelected ? 'none' : '1px solid #DDBFFF',
                backgroundColor: isCatSelected ? '#DDBFFF' : '#ffffff',
                color: '#5D01C6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* --------------------------------------------------------
         [4] 설문 리스트 수직 렌더링 영역
      -------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey) => (
            <div
              key={survey.surveyId}
              style={{
                backgroundColor: survey.isFirst ? '#DDBFFF' : '#F8F2FF', // 첫 카드는 진한 배경, 나머지는 연한 배경
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                }}
              >
                {survey.title}
              </h4>
              <p
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '11px',
                  color: '#5D01C6',
                }}
              >
                {survey.target} · {survey.token}토큰
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* 하단 좌측: 카테고리 칩 + 소요 시간 */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#5D01C6',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      borderRadius: '12px',
                    }}
                  >
                    {survey.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#5D01C6' }}>
                    소요 시간 {survey.duration}
                  </span>
                </div>

                {/* 하단 우측: 참여하기 버튼 */}
                <span
                  onClick={() => alert(`${survey.title} 참여 폼으로 이동`)}
                  style={{
                    fontSize: '13px',
                    color: '#5D01C6',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  참여하기 &gt;
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#5D01C6',
              fontSize: '14px',
            }}
          >
            검색 조건에 맞는 설문이 없습니다.
          </div>
        )}
      </div>

      {/* 스크롤바 숨김 처리 CSS */}
      <style>{`
        .category-scroll-box::-webkit-scrollbar {
          display: none !important;
        }
        input::placeholder {
          color: #DDBFFF;
        }
      `}</style>
    </div>
  );
};

export default SurveyListPage;
