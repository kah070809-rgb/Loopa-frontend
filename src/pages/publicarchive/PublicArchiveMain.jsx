import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyPreviewCard from './archivecomponents/SurveyPreviewCard';
import { getArchiveSurveys } from '../../api/archiveApi';
import './PublicArchiveMain.css';
import BackP from '../../assets/images/BackP.svg';
import File from '../../assets/images/File.svg';
import Search from '../../assets/images/Search.svg';

function PublicArchiveMain() {
  const navigate = useNavigate();

  const [surveyList, setSurveyList] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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
  } = {}) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const apiCategory = categoryValue === 'ALL' ? '' : categoryValue;

      const data = await getArchiveSurveys({
        keyword: keywordValue,
        category: apiCategory,
        size: 3,
      });

      setSurveyList(data?.items || []);
    } catch (error) {
      console.error('아카이브 목록 조회 실패:', error);
      setErrorMessage('아카이브 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchiveSurveys({
      keywordValue: '',
      categoryValue: 'ALL',
    });
  }, []);

  const handleSearch = () => {
    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: selectedCategory,
    });
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: categoryValue,
    });
  };

  return (
    <div>
      <section className="archive-page">
        {/* ── [1] 헤더 영역 ── */}
        <header className="archive-header">
          <button
            className="archive-back-button"
            type="button"
            onClick={() => navigate('/main')}
          >
            <img src={BackP} alt="뒤로가기" className="archive-back-icon-img" />
          </button>
        </header>

        {/* ── [2] 상단 배너 카드 디자인 ── */}
        <div className="archive-intro-card">
          <div className="archive-intro-content">
            <h2 className="archive-intro-title">공공 아카이브</h2>
            <p className="archive-intro-text">
              공유된 설문 데이터를 검색하고
              <br />
              과제, 연구에 다시 활용해보세요.
            </p>
          </div>
          <img
            src={File}
            alt="파일 보관함"
            className="archive-intro-file-icon"
          />
        </div>

        {/* ── [3] 검색 바 영역 (수정: Search.svg 이미지 태그 매핑) ── */}
        <div className="archive-search-box">
          <input
            className="archive-search-input"
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
          {/* 💡 기존의 라이브러리 아이콘을 걷어내고 진짜 Search.svg 이미지로 연동했습니다. */}
          <img
            src={Search}
            alt="검색"
            className="archive-search-icon-img"
            onClick={handleSearch}
          />
        </div>

        {/* ── [4] 카테고리 칩 영역 ── */}
        <div className="archive-filter-list">
          {categoryList.map((cat) => (
            <button
              key={cat.value}
              className={`archive-filter-button ${
                selectedCategory === cat.value ? 'active' : ''
              }`}
              type="button"
              onClick={() => handleCategoryClick(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── [5] 중간 타이틀 ── */}
        <div className="archive-section-header">
          <h2 className="archive-section-title">최근 업데이트</h2>
          <button
            className="archive-more-button"
            type="button"
            onClick={() => navigate('/archiveextra')}
          >
            더보기 &gt;
          </button>
        </div>

        {/* ── [6] 리스트 데이터 렌더링 (💡 surveyId 연동 패치 완료) ── */}
        <div className="archive-card-list">
          {loading && <p className="archive-loading-text">불러오는 중...</p>}
          {errorMessage && <p className="archive-error-text">{errorMessage}</p>}

          {!loading && !errorMessage && (
            <>
              {surveyList.length > 0 ? (
                surveyList.map((survey) => {
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
                })
              ) : (
                <p className="archive-empty-message">
                  조건에 맞는 아카이브 설문이 없습니다.
                </p>
              )}
            </>
          )}
        </div>

        {/* ── [7] 하단 와이드 액션 버튼 ── */}
        <div className="archive-bottom-container">
          <button
            className="archive-add-wide-button"
            type="button"
            onClick={() => navigate('/myarchive')}
          >
            내 설문 공유하고 토큰 받기
          </button>
        </div>
      </section>
    </div>
  );
}

export default PublicArchiveMain;
