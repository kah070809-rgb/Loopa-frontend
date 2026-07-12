import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyPreviewCard from './archivecomponents/SurveyPreviewCard';
import { getArchiveSurveys } from '../../api/archiveApi';
import * as S from './ArchiveExtra.style';
import BackP from '../../assets/images/BackP.svg';
import Search from '../../assets/images/Search.svg'; // 💡 돋보기 이미지 정확하게 임포트

function ArchiveExtra() {
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const fetchArchiveSurveys = async ({
    keywordValue = keyword,
    categoryValue = selectedCategory,
    cursorValue = null,
    isLoadMore = false,
  } = {}) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const apiCategory = categoryValue === 'ALL' ? '' : categoryValue;

      const data = await getArchiveSurveys({
        keyword: keywordValue,
        category: apiCategory,
        cursor: cursorValue,
        size: 20,
      });

      if (isLoadMore) {
        setSurveys((prev) => [...prev, ...data.items]);
      } else {
        setSurveys(data.items);
      }

      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('아카이브 더보기 목록 조회 실패:', error);
      setErrorMessage('아카이브 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchiveSurveys({
      keywordValue: '',
      categoryValue: 'ALL',
      cursorValue: null,
      isLoadMore: false,
    });
  }, []);

  const handleSearch = () => {
    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: selectedCategory,
      cursorValue: null,
      isLoadMore: false,
    });
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: categoryValue,
      cursorValue: null,
      isLoadMore: false,
    });
  };

  const handleLoadMore = () => {
    if (!hasNext || loading) return;

    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: selectedCategory,
      cursorValue: nextCursor,
      isLoadMore: true,
    });
  };

  return (
    <S.Container>
      {/* ── [1] 헤더 영역 ── */}
      <S.Header>
        <S.HeaderIcon
          src={BackP}
          alt="뒤로가기"
          onClick={() => navigate('/archivemain')}
        />
      </S.Header>

      {/* ── [2] 검색 바 영역 (수정: Search.svg 이미지 컴포넌트 실연동) ── */}
      <S.SearchBarContainer>
        <S.SearchInput
          type="text"
          placeholder="설문 제목 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        {/* 💡 S.SearchIcon 컴포넌트에 진짜 이미지 파일을 바인딩했습니다. */}
        <S.SearchIcon src={Search} alt="검색" onClick={handleSearch} />
      </S.SearchBarContainer>

      {/* ── [3] 카테고리 칩 가로 스크롤 영역 ── */}
      <S.CategoryScrollBox>
        {categoryList.map((category) => (
          <S.CategoryButton
            key={category.value}
            $isSelected={selectedCategory === category.value}
            onClick={() => handleCategoryClick(category.value)}
          >
            {category.label}
          </S.CategoryButton>
        ))}
      </S.CategoryScrollBox>

      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

      {/* ── [4] 리스트 데이터 카드 구역 ── */}
      <S.ListContainer>
        {surveys.map((survey) => {
          const currentSurveyId = survey.surveyId || survey.id;
          return (
            <SurveyPreviewCard
              key={currentSurveyId}
              survey={survey}
              isSelected={selectedSurveyId === currentSurveyId}
              onClick={() => {
                setSelectedSurveyId(currentSurveyId);
                navigate(`/archive/surveys/${currentSurveyId}`);
              }}
            />
          );
        })}
      </S.ListContainer>

      {loading && <S.LoadingMessage>불러오는 중...</S.LoadingMessage>}

      {/* ── [5] 하단 무한 스크롤 더보기 액션 버튼 ── */}
      {hasNext && (
        <S.LoadMoreButton
          type="button"
          onClick={handleLoadMore}
          disabled={loading}
        >
          더 불러오기
        </S.LoadMoreButton>
      )}
    </S.Container>
  );
}

export default ArchiveExtra;
