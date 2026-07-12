import axiosInstance from './axiosInstance';

export const getArchiveSurveys = async ({
  category,
  keyword,
  cursor,
  size = 3,
} = {}) => {
  const response = await axiosInstance.get('/archive/surveys', {
    params: {
      category,
      keyword,
      cursor,
      size,
    },
  });

  return response.data.result;
};

export const getArchiveSurveyViewInfo = async (surveyId) => {
  const response = await axiosInstance.get(`/archive/surveys/${surveyId}`);

  return response.data.result;
};

export const getMyShareableSurveys = async ({
  cursor = null,
  size = 20,
} = {}) => {
  const response = await axiosInstance.get('/archive/my-surveys', {
    params: {
      ...(cursor !== null && { cursor }),
      size,
    },
  });

  return response.data.result;
};

export const shareArchiveSurveys = async (surveyIds) => {
  const response = await axiosInstance.post('/archive/shares', {
    surveyIds,
  });

  return response.data.result;
};

export const purchaseArchiveSurveyView = async (surveyId) => {
  const response = await axiosInstance.post(
    `/archive/surveys/${surveyId}/views`,
    {},
  );

  return response.data.result;
};

/** 아카이브 설문 결과 열람 구매 API (POST)*/

export const purchaseArchiveSurvey = async (surveyId) => {
  const response = await api.post(`/archive/surveys/${surveyId}/views`);
  return response.data;
};

/** 설문 세부 결과 조회 API */

export const getArchiveSurveyResults = async (surveyId, filters = null) => {
  const params = {};
  if (filters) {
    params.filters = filters;
  }

  const response = await api.get(`/archive/surveys/${surveyId}/results`, {
    params,
  });
  return response.data;
};
