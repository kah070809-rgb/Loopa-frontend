import api from './axios';

/**내가 열람한 설문 목록 조회
 * @param {Object} options - 요청 옵션
 * @param {string|number} [options.cursor] - 다음 페이지 커서 (첫 페이지는 생략)
 * @param {number} [options.size=20] - 페이지 크기 (기본값 20)
 */

export const getViewedSurveys = async (options) => {
  const { cursor, size = 20 } = options || {};

  const response = await api.get('/users/me/viewed-surveys', {
    params: {
      cursor: cursor,
      size: size,
    },
  });
  return response.data;
};

/**
 * 내가 등록한 설문 목록 조회
 * @param {Object} options - 요청 옵션
 * @param {string|number} [options.cursor] - 다음 페이지 커서 (첫 페이지는 생략)
 * @param {number} [options.size=20] - 페이지 크기 (기본값 20)
 */

export const getMySurveys = async (options) => {
  const { cursor, size = 20 } = options || {};

  const response = await api.get('/users/me/surveys', {
    params: {
      cursor: cursor,
      size: size,
    },
  });
  return response.data;
};

/**3. 내 정보 조회 (추가된 기능)*/

export const getMyInfo = async () => {
  const response = await api.get('/users/me');
  return response.data;
};
