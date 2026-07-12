import React, { useState, useEffect } from 'react';
import * as S from './surveylist.style'; // 분리된 스타일 컴포넌트 임포트
import Backmy from '../assets/images/Backmy.svg';
import Search from '../assets/images/Search.svg';

// 💡 우리가 분리해두었던 '참여 가능한 설문 조회' API를 가져옵니다.
import { getAvailableSurveys } from '../api/survey';

const SurveyListPage = () => {
  // 카테고리 및 검색 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // API 연동을 위한 진짜 설문 목록 상태 관리
  const [surveys, setSurveys] = useState([]);

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

  // 💡 [백엔드 연동 핵심] 카테고리 칩을 누르거나, 검색 버튼을 누를 때마다 서버에 새로 API를 호출합니다.
  useEffect(() => {
    const fetchSurveyList = async () => {
      try {
        // 백엔드 약속 규격에 맞춰 '전체'일 때는 null을, 검색어가 비어있을 때도 null을 전달합니다.
        const apiCategory =
          selectedCategory === '전체' ? null : selectedCategory;
        const apiKeyword = searchTerm.trim() === '' ? null : searchTerm;

        const responseData = await getAvailableSurveys({
          category: apiCategory,
          keyword: apiKeyword,
          size: 20, // 한 페이지에 20개씩 로드
        });

        if (responseData.isSuccess) {
          // 서버가 준 진짜 데이터 리스트 배열을 상태창에 채워넣습니다.
          setSurveys(responseData.result.items);
        }
      } catch (error) {
        console.error('설문 목록 조회 실패:', error);
      }
    };

    fetchSurveyList();
  }, [selectedCategory, searchTerm]); // 👈 카테고리나 검색 확정어가 바뀔 때마다 실시간 재호출!

  // 돋보기 버튼 클릭 핸들러 (검색 실행)
  const handleSearchClick = () => {
    setSearchTerm(searchInput); // 사용자가 입력한 값을 검색 확정어로 박아 useEffect를 트리거합니다.
  };

  // 엔터키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <S.Container>
      {/* --- [1] 헤더 영역 --- */}
      <S.Header>
        <S.HeaderIcon
          src={Backmy}
          alt="참여 가능한 설문 타이틀"
          onClick={() => window.history.back()} // 브라우저 이전 페이지(메인)로 똑똑하게 이동
        />
      </S.Header>

      {/* --- [2] 검색 바 영역 --- */}
      <S.SearchBarContainer>
        <S.SearchInput
          type="text"
          placeholder="설문 제목 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.SearchIcon src={Search} alt="검색" onClick={handleSearchClick} />
      </S.SearchBarContainer>

      {/* --- [3] 카테고리 칩 가로 스크롤 영역 --- */}
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

      {/* --- [4] 설문 리스트 렌더링 영역 --- */}
      <S.ListContainer>
        {surveys.length > 0 ? (
          surveys.map((survey, index) => (
            <S.SurveyCard key={survey.surveyId} $isFirst={index === 0}>
              <S.CardTitle>{survey.title}</S.CardTitle>
              <S.CardSubtitle>
                {survey.target} · {survey.maxToken}토큰
              </S.CardSubtitle>

              <S.CardFooter>
                <S.FooterLeft>
                  <S.CategoryBadge>{survey.category}</S.CategoryBadge>
                  <S.DurationText>
                    소요 시간 {survey.estimatedMinutes}분
                  </S.DurationText>
                </S.FooterLeft>

                <S.ParticipateLink
                  onClick={() =>
                    alert(
                      `ID ${survey.surveyId}번 [${survey.title}] 참여 폼 화면으로 이동`,
                    )
                  }
                >
                  참여하기 &gt;
                </S.ParticipateLink>
              </S.CardFooter>
            </S.SurveyCard>
          ))
        ) : (
          <S.EmptyMessage>검색 조건에 맞는 설문이 없습니다.</S.EmptyMessage>
        )}
      </S.ListContainer>
    </S.Container>
  );
};

export default SurveyListPage;
