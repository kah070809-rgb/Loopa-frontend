import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyPreviewCard from './archivecomponents/SurveyPreviewCard';
import { getArchiveSurveys } from '../../api/archiveApi';
import './ArchiveExtra.css';

function ArchiveExtra() {
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categoryList = [
    { label: '전체', value: 'ALL' },
    { label: '진로/취업', value: 'CAREER' },
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

      const data = await getArchiveSurveys({
        keyword: keywordValue,
        category: categoryValue,
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
      categoryValue: '',
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
      categoryValue,
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
    <section className="archive-extra-page">
      <header className="archive-extra-header">
        <button
          className="archive-extra-back-button"
          type="button"
          onClick={() => navigate('/archivemain')}
        >
          ←
        </button>

        <h1 className="archive-extra-title">최근 업데이트</h1>
      </header>

      <div className="archive-extra-search-box">
        <input
          id="archive-extra-search"
          name="keyword"
          className="archive-extra-search-input"
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

        <button
          className="archive-extra-search-button"
          type="button"
          onClick={handleSearch}
        >
          <FiSearch />
        </button>
      </div>

      <div className="archive-extra-filter-row">
        {categoryList.map((category) => (
          <button
            key={category.value || 'all'}
            className={`archive-extra-filter-button ${
              selectedCategory === category.value ? 'selected' : ''
            }`}
            type="button"
            onClick={() => handleCategoryClick(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <div className="archive-extra-card-list">
          {surveys.map((survey) => (
             <SurveyPreviewCard
              key={survey.surveyId}
              survey={survey}
              isSelected={selectedSurveyId === survey.surveyId}
              onClick={() => {
               setSelectedSurveyId(survey.surveyId);
               navigate(`/archive/surveys/${survey.surveyId}`);
              }}
             />
           ))}
      </div>

      {loading && <p>불러오는 중...</p>}

      {hasNext && (
        <button
          className="archive-extra-load-more-button"
          type="button"
          onClick={handleLoadMore}
          disabled={loading}
        >
          더 불러오기
        </button>
      )}
    </section>
  );
}

export default ArchiveExtra;
