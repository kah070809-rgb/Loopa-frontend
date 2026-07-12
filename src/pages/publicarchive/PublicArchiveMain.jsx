import React, { useEffect, useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 💡 가져오라고 하신 총 10개의 카테고리 목록 리스트로 완벽 변경
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

  // 기존 백엔드 연동 로직 (건드리지 않고 그대로 유지)
  const fetchArchiveSurveys = async ({
    keywordValue = keyword,
    categoryValue = selectedCategory,
  } = {}) => {
    try {
      setLoading(true);
      setErrorMessage('');

      // API에 전달할 때는 '전체'일 경우 null 처리
      const apiCategory = categoryValue === '전체' ? '' : categoryValue;

      const data = await getArchiveSurveys({
        keyword: keywordValue,
        category: apiCategory,
        size: 3,
      });

      console.log('데이터:', data);
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
      categoryValue: '전체',
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
            onClick={() => navigate("/main")}
          >
            <img src={BackP} alt="뒤로가기" className="archive-back-icon-img" />
          </button>
        </header>

        {/* ── [2] 상단 카드 레이아웃 수정 (file.svg 반영 및 피그마 비율화) ── */}
        <div className="archive-intro-card">
          <div className="archive-intro-content">
            <h2 className="archive-intro-title">공공 아카이브</h2>
            <p className="archive-intro-text">
              공유된 설문 데이터를 검색하고 올리고
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

        {/* ── [3] 내꺼에서 그대로 가져온 검색 바 디자인 영역 ── */}
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

        {/* ── [4] 내꺼에서 그대로 가져온 10개 카테고리 칩 가로 스크롤 영역 ── */}
        <div className="archive-filter-list">
          {categoryList.map((cat) => (
            <button
              key={cat}
              className={`archive-filter-button ${
                selectedCategory === cat ? 'active' : ''
              }`}
              type="button"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
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
        {loading && <p className="archive-loading-text">불러오는 중...</p>}
        {errorMessage && <p className="archive-error-text">{errorMessage}</p>}

        {!loading && !errorMessage && (
          <div className="archive-card-list">
            {surveyList.map((survey) => (
              <SurveyPreviewCard
                key={survey.id}
                survey={survey}
                isSelected={selectedSurveyId === survey.id}
                onClick={() => {
                  setSelectedSurveyId(survey.id);
                  navigate(`/archive/surveys/${survey.id}`);
                }}
              />
            ))}
          </div>
        )}

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
