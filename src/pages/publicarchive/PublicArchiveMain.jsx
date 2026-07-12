import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import SurveyPreviewCard from './archivecomponents/SurveyPreviewCard';
import { getArchiveSurveys } from '../../api/archiveApi';
import './PublicArchiveMain.css';
import BackP from '../../assets/images/BackP.svg';
import File from '../../assets/images/File.svg';

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

        {/* ── [3] 검색 바 영역 ── */}
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
          <div className="archive-search-icon-wrapper" onClick={handleSearch}>
            <FiSearch className="archive-search-fi-icon" />
          </div>
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

        {/* ── [6] 리스트 데이터 렌더링 ── */}
        <div className="archive-card-list">
          {loading && <p className="archive-loading-text">불러오는 중...</p>}
          {errorMessage && <p className="archive-error-text">{errorMessage}</p>}

          {!loading && !errorMessage && (
            <>
              {surveyList.length > 0 ? (
                surveyList.map((survey) => (
                  <SurveyPreviewCard
                    key={survey.id}
                    survey={survey}
                    // 💡 순서 상관없이 내가 누른 ID와 일치할 때만 true를 반환합니다.
                    isSelected={selectedSurveyId === survey.id}
                    onClick={() => {
                      setSelectedSurveyId(survey.id);
                      // 선택된 후 아카이브 상세 화면으로 부드럽게 넘어가도록 유지
                      navigate(`/archive/surveys/${survey.id}`);
                    }}
                  />
                ))
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
