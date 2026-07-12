import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArchiveSurveyResults } from '../../api/archiveApi'; // 💡 명세서에 명시된 GET API 가져오기
import './SurveyDetail.css';

function SurveyDetail() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [activeTab, setActiveTab] = useState('info');
  const [surveyInfo, setSurveyInfo] = useState(null);
  const [resultsList, setResultsList] = useState([]);

  // 크로스탭 복수 필터 선택을 위한 보기 ID 관리 상태창
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // 💡 명세서 2-3 스펙에 맞춰 필터 ID 목록을 콤마(,) 구분자로 합쳐 서버에 재조회 요청하는 핵심 핸들러
  const fetchDetailData = async (filterArray = []) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const filterParam = filterArray.length > 0 ? filterArray.join(',') : null;

      // 엔드포인트: /archive/surveys/{surveyId}/results 호출 수행
      const response = await getArchiveSurveyResults(surveyId, filterParam);

      // 명세서 3-1 응답 바디 구조 파싱
      if (response && response.isSuccess && response.result) {
        const res = response.result;
        setSurveyInfo(res.surveyInfo);
        setResultsList(res.results || []);
      }
    } catch (error) {
      console.error('설문 결과 상세 조회 실패:', error);
      const status = error.response?.status;
      if (status === 403) {
        setErrorMessage('열람 권한이 없습니다. 먼저 결제를 완료해 주세요.');
      } else {
        setErrorMessage('결과 데이터를 불러오지 못했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailData();
  }, [surveyId]);

  // 체크박스 다중 선택 제어 스위치
  const handleFilterToggle = (optionId) => {
    setSelectedFilters((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  // 💡 [조회하기] 버튼 액션: 선택된 조건의 응답자 데이터만 모아 서버 크로스탭 재집계 트리거
  const handleApplyFilterSearch = () => {
    fetchDetailData(selectedFilters);
  };

  // 디자인용 고정 컬러 칩 리스트 배열
  const chartColors = ['#5D01C6', '#A251FF', '#DDBFFF', '#ECDBFF', '#F4EBFF'];

  // 명세서 필드 percentage 수치 기준 순수 CSS 원형 차트 연산 알고리즘
  const generatePieChartStyle = (options) => {
    if (!options || options.length === 0) return { backgroundColor: '#ecd8ff' };

    let currentDegree = 0;
    const gradientParts = options.map((option, idx) => {
      const startDegree = currentDegree;
      const targetPercent = option.percentage ?? option.percent ?? 0;
      const nextDegree = startDegree + targetPercent * 3.6;
      currentDegree = nextDegree;
      const color = chartColors[idx % chartColors.length];
      return `${color} ${startDegree}deg ${nextDegree}deg`;
    });

    return {
      background: `conic-gradient(${gradientParts.join(', ')})`,
    };
  };

  if (isLoading && !surveyInfo)
    return (
      <p className="survey-detail-loading">결과 데이터를 로드 중입니다...</p>
    );
  if (errorMessage)
    return <p className="survey-detail-error-text">{errorMessage}</p>;

  // 카테고리 한글화 매퍼
  const categoryMap = { CAREER: '학업 진로', IT_AI: 'IT·AI' };

  return (
    <section className="survey-detail-page">
      <button
        className="survey-detail-back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="survey-detail-title-box">
        <h1 className="survey-detail-title">{surveyInfo?.title}</h1>
        <p className="survey-detail-token">
          {categoryMap[surveyInfo?.category] || surveyInfo?.category || 'IT·AI'}{' '}
          · {surveyInfo?.target}
        </p>
      </div>

      <div className="survey-detail-tab-wrapper">
        <button
          className={`survey-detail-tab ${activeTab === 'info' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('info')}
        >
          설문 정보
        </button>
        <button
          className={`survey-detail-tab ${activeTab === 'result' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('result')}
        >
          설문 결과
        </button>
      </div>

      <div className="survey-detail-tab-line">
        <div
          className={`survey-detail-tab-active-line ${activeTab === 'result' ? 'result' : 'info'}`}
        />
      </div>

      {activeTab === 'info' && (
        <article className="survey-detail-info-card">
          <div className="survey-detail-info-section">
            <h2>설문 소개</h2>
            <p>{surveyInfo?.description}</p>
          </div>
          <div className="survey-detail-info-section">
            <h2>설문 기간</h2>
            <p>
              {surveyInfo?.startDate?.replaceAll('-', '.')} ~{' '}
              {surveyInfo?.endDate?.replaceAll('-', '.')}
            </p>
          </div>
          <div className="survey-detail-info-section">
            <h2>문항 수</h2>
            <p>
              객관식 {surveyInfo?.questionCount?.multipleChoice ?? 0}문항
              <br />
              주관식 {surveyInfo?.questionCount?.subjective ?? 0}문항
            </p>
          </div>
          <div className="survey-detail-info-section">
            <h2>응답자 수</h2>
            <p>{surveyInfo?.respondentCount ?? 0}명</p>
          </div>
        </article>
      )}

      {activeTab === 'result' && (
        <div className="survey-detail-result-list">
          {/* 복수 필터링 상단 제어 헤더 액션 바 배치 */}
          <div
            className="survey-filter-submit-bar"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '16px',
            }}
          >
            <button
              type="button"
              className="survey-filter-search-btn"
              onClick={handleApplyFilterSearch}
              style={{
                padding: '8px 18px',
                backgroundColor: '#5D01C6',
                color: '#FFF',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              조회하기
            </button>
          </div>

          {resultsList.map((result, index) => {
            const isMultipleChoice = result.type === 'MULTIPLE_CHOICE';

            return (
              <article
                className="survey-detail-result-card"
                key={result.questionId || index}
              >
                <h2 className="survey-detail-result-question">
                  Q{result.order || index + 1}. {result.content}
                </h2>
                <p className="survey-detail-result-count">
                  응답 {result.responseCount ?? 0}명
                </p>

                <div className="survey-detail-result-content">
                  {isMultipleChoice ? (
                    <div
                      className="survey-detail-pie-chart"
                      style={generatePieChartStyle(result.options)}
                    ></div>
                  ) : (
                    <div
                      className="survey-detail-pie-chart subjective-box"
                      style={{
                        backgroundColor: '#F3EAFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6A0DAD',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      주관식
                    </div>
                  )}

                  <div className="survey-detail-option-list">
                    {isMultipleChoice &&
                      result.options?.map((option, optIdx) => {
                        const isChecked = selectedFilters.includes(
                          option.optionId,
                        );
                        return (
                          <div
                            className="survey-detail-option-row"
                            key={option.optionId || optIdx}
                          >
                            <span
                              className="survey-detail-option-check"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: isChecked
                                  ? chartColors[optIdx % chartColors.length]
                                  : '#FFF',
                                color: isChecked ? '#FFF' : '#8b2bc1',
                                fontWeight: '900',
                              }}
                              onClick={() =>
                                handleFilterToggle(option.optionId)
                              }
                            >
                              {isChecked ? '✓' : ''}
                            </span>
                            <span className="survey-detail-option-label">
                              {option.content}
                            </span>
                            <span className="survey-detail-option-percent">
                              {option.percentage}%
                            </span>
                            <span className="survey-detail-option-count">
                              ({option.count}명)
                            </span>
                          </div>
                        );
                      })}

                    {!isMultipleChoice && (
                      <div
                        className="survey-detail-subjective-answers-box"
                        style={{
                          maxHeight: '120px',
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        {result.answers && result.answers.length > 0 ? (
                          result.answers.map((answer, ansIdx) => (
                            <p
                              key={ansIdx}
                              style={{
                                margin: 0,
                                padding: '6px 10px',
                                backgroundColor: '#F8F2FF',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#5D01C6',
                              }}
                            >
                              • {answer}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              margin: 0,
                              fontSize: '12px',
                              color: '#B391DF',
                            }}
                          >
                            등록된 주관식 답변이 없습니다.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SurveyDetail;
