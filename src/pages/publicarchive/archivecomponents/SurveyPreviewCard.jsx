import React from 'react';
import './SurveyPreviewCard.css';

const categoryMap = {
  ALL: '전체',
  CAREER: '진로·취업',
  IT_AI: 'IT·AI',
  SERVICE_APP: '서비스·앱',
  CONSUMER_MARKETING: '소비·마케팅',
  GAME: '게임',
  SCHOOL_LIFE: '학교생활',
  DAILY: '일상',
  PSYCHOLOGY: '심리',
  ETC: '기타',
};

function SurveyPreviewCard({ survey, isSelected, onClick }) {
  const displayDate = survey?.createdAt
    ? survey.createdAt.split('T')[0].replaceAll('-', '.')
    : '2026.01.01';

  return (
    <div
      // 💡 선택 상태(isSelected)에 따라 active-card 서식을 동적으로 적용합니다.
      className={`archive-preview-card ${isSelected ? 'active-card' : 'normal-card'}`}
      onClick={onClick}
    >
      <div className="archive-card-top-row">
        <h4 className="archive-card-title">{survey.title || '제목 없음'}</h4>
        <span className="archive-card-date">{displayDate}</span>
      </div>

      <p className="archive-card-subtitle">
        {survey.target || '대학생'} · 응답자 수 : {survey.respondentCount ?? 0}
        명
      </p>

      <div className="archive-card-footer">
        <div className="archive-card-footer-left">
          <span className="archive-card-badge">
            {categoryMap[survey.category] || survey.category || '기타'}
          </span>
        </div>

        <span className="archive-card-link">자세히 보기 &gt;</span>
      </div>
    </div>
  );
}

export default SurveyPreviewCard;
