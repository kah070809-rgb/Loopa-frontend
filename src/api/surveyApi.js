import api from './axios';

/**
 * 설문 문항 조회
 * GET /surveys/{surveyId}/questions
 */
export const getSurveyQuestions = async (surveyId) => {
  if (!surveyId) {
    throw new Error('surveyId가 필요합니다.');
  }

  const response = await api.get(`/surveys/${surveyId}/questions`);

  return response.data.result.questions;
};

/**
 * 설문 상세 조회
 * GET /surveys/{surveyId}
 */
export const getSurveyDetail = async (surveyId) => {
  if (!surveyId) {
    throw new Error('surveyId가 필요합니다.');
  }

  const response = await api.get(`/surveys/${surveyId}`);

  return response.data.result;
};

/**
 * 설문 응답 제출
 * POST /surveys/{surveyId}/responses
 */
export const submitSurveyResponse = async (surveyId, requestBody) => {
  if (!surveyId) {
    throw new Error('surveyId가 필요합니다.');
  }

  if (!requestBody) {
    throw new Error('설문 응답 데이터가 필요합니다.');
  }

  const response = await api.post(
    `/surveys/${surveyId}/responses`,
    requestBody,
  );

  return response.data.result;
};

/**
 * 내 설문 결과 조회 (생성자 전용, 진행중도 가능)
 * GET /surveys/{surveyId}/result
 */
export const getSurveyResult = async (surveyId) => {
  const response = await api.get(`/surveys/${surveyId}/result`);
  return response.data;
};
