import api from './axios';

/** 설문 삭제
 * @param {string|number} surveyId - 삭제할 설문 ID (주소창에 들어가는 변수)
 */
export const deleteSurvey = async (surveyId) => {
  const response = await api.delete(`/surveys/${surveyId}`);
  return response.data;
};

/**
 * 설문 생성
 * 기본 정보와 문항·보기를 한 번에 등록하여 설문을 생성합니다. (생성 시 토큰 차감)
 * @param {Object} surveyData - 생성할 설문 데이터 (Request Body)
 * @param {string} surveyData.title - 설문 제목 (필수)
 * @param {string} [surveyData.description] - 설문 소개 (선택)
 * @param {string} [surveyData.target] - 희망 설문 대상 (선택)
 * @param {string} surveyData.category - 카테고리 코드 (필수)
 * @param {number} [surveyData.estimatedMinutes] - 예상 소요 시간 (선택)
 * @param {string} surveyData.startDate - 설문 시작일 (yyyy-MM-dd, 필수)
 * @param {string} surveyData.endDate - 마감일 (yyyy-MM-dd, 필수)
 * @param {Array} surveyData.questions - 문항 목록 배열 (최소 2개, 필수)
 */

export const createSurvey = async (surveyData) => {
  const response = await api.post('/surveys', surveyData);
  return response.data;
};

/**
 * 3. 참여 가능한 설문 조회 (새로 추가된 기능)
 * 현재 참여 가능한(진행 중) 설문을 미리보기 형태로 최신순 조회합니다. (필터 및 검색 지원)
 * @param {Object} options - 조회 조건 옵션 객체
 * @param {string} [options.category] - 카테고리 코드로 필터 (미지정 시 전체)
 * @param {string} [options.keyword] - 설문 제목 검색어
 * @param {string|number} [options.cursor] - 다음 페이지 커서 (첫 페이지는 생략)
 * @param {number} [options.size=20] - 한 번에 가져올 페이지 크기 (기본값 20)
 */
export const getAvailableSurveys = async (options) => {
  // options 안에서 조건들을 쏙쏙 뽑아내고, 없으면 기본값을 줍니다.
  const { category, keyword, cursor, size = 20 } = options || {};

  const response = await api.get('/surveys', {
    // GET 요청이므로 params 객체 안에 담아서 주소창 뒤에 쿼리 스트링으로 날려줍니다.
    params: {
      category: category,
      keyword: keyword,
      cursor: cursor,
      size: size,
    },
  });

  // 서버가 응답한 데이터 알맹이(isSuccess, result.items 등)를 돌려줍니다.
  return response.data;
};
