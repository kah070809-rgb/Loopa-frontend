import React, { useState, useEffect } from 'react';
import * as S from './surveylist.style'; // 분리된 스타일 컴포넌트 임포트
import Backmy from '../assets/images/Backmy.svg';
import Search from '../assets/images/Search.svg';

const SurveyListPage = () => {
  // 카테고리 및 검색 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // API 연동을 위한 상태 (더미 데이터 제거 후 빈 배열 초기화)
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

  /*
   * TODO: API 연동 시 useEffect 내에서 서버 데이터를 fetch하여 setSurveys에 담아줍니다.
   * 페이징/무한스크롤 구현 시 nextCursor 등 상태를 추가로 활용하세요.
   * useEffect(() => {
   *   fetchSurveyList(searchTerm, selectedCategory).then(data => setSurveys(data));
   * }, [searchTerm, selectedCategory]);
   */

  // 클라이언트 단 필터링 로직 (추후 백엔드에서 쿼리로 처리할 경우 삭제 가능)
  const filteredSurveys = surveys.filter((survey) => {
    const matchCategory =
      selectedCategory === '전체' || survey.category === selectedCategory;
    const matchSearch = survey.title.includes(searchTerm);
    return matchCategory && matchSearch;
  });

  // 돋보기 버튼 클릭 핸들러 (검색 실행)
  const handleSearchClick = () => {
    setSearchTerm(searchInput);
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
          onClick={() => alert('메인 화면으로 뒤로가기')}
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
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey, index) => (
            <S.SurveyCard key={survey.surveyId} $isFirst={index === 0}>
              <S.CardTitle>{survey.title}</S.CardTitle>
              <S.CardSubtitle>
                {survey.target} · {survey.token}토큰
              </S.CardSubtitle>

              <S.CardFooter>
                <S.FooterLeft>
                  <S.CategoryBadge>{survey.category}</S.CategoryBadge>
                  <S.DurationText>소요 시간 {survey.duration}</S.DurationText>
                </S.FooterLeft>

                <S.ParticipateLink
                  onClick={() => alert(`${survey.title} 참여 폼으로 이동`)}
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
