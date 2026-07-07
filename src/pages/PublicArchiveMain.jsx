import { useState } from "react";
import "./PublicArchiveMain.css"

function publicArchiveMain () {
  const surveyList = [
    {
      id: 1,
      title: '대학생 소비 습관 설문',
      description:
        '대학생들의 월별 소비 패턴과 지출 우선순위를 조사한 설문입니다.',
      category: '생활',
      responseCount: 128,
      updatedAt: '2026.07.07',
    },
    {
      id: 2,
      title: '전공 만족도 조사',
      description:
        '대학생의 전공 선택 이유와 만족도를 분석하기 위한 설문입니다.',
      category: '교육',
      responseCount: 92,
      updatedAt: '2026.07.06',
    },
    {
      id: 3,
      title: '대학생 수면 패턴 조사',
      description: '대학생들의 평균 수면 시간과 생활 리듬을 분석한 설문입니다.',
      category: '건강',
      responseCount: 76,
      updatedAt: '2026.07.05',
    },
  ];

  return (
    <div>
      <section className="archive-page">
        <header className="archive-header">
          <button className="archive-back-button" type="button">
            ←
          </button>

          <h1 className="archive-title">공공 아카이브</h1>
        </header>

        <div className="archive-intro-card">
          <h2 className="archive-intro-title">공공 아카이브</h2>

          <p className="archive-intro-text">
            공유된 설문 데이터를 검색하고 올리고
            <br />
            과제, 연구에 다시 활용해보세요.
          </p>
        </div>

        <div className="archive-search-box">
          <input
            className="archive-search-input"
            type="text"
            placeholder="설문 제목 검색"
          />

          <button className="archive-search-button" type="button">
            🔍
          </button>
        </div>

        <div className="archive-filter-list">
          <button className="archive-filter-button active" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
          <button className="archive-filter-button" type="button">
            전체
          </button>
        </div>

        <div className="archive-section-header">
          <h2 className="archive-section-title">최근 업데이트</h2>

          <button className="archive-more-button" type="button">
            더보기 &gt;
          </button>
        </div>

        <div className="archive-card-list">
          {surveyList.map((survey) => (
            <article className="archive-survey-card" key={survey.id}>
              <div className="archive-card-top">
                <span className="archive-card-category">{survey.category}</span>
                <span className="archive-card-date">{survey.updatedAt}</span>
              </div>

              <h3 className="archive-card-title">{survey.title}</h3>

              <p className="archive-card-description">{survey.description}</p>

              <div className="archive-card-bottom">
                <span>응답 {survey.responseCount}개</span>
              </div>
            </article>
          ))}
        </div>

        <button className="archive-add-button" type="button">
          +
        </button>
      </section>
    </div>
  );
}

export default publicArchiveMain;
