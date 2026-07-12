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