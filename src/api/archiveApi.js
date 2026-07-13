import axiosInstance from './axiosInstance';
// 💡 기존에 혼용되던 api 인스턴스는 404/500 에러의 원인이 되므로 사용하지 않고 axiosInstance로 통일합니다.

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

/** 아카이브 설문 결과 열람 구매 API (POST) */
export const purchaseArchiveSurvey = async (surveyId) => {
  // 💡 인스턴스를 axiosInstance로 일치시키고 다른 구매 API와 return 구조(.result)를 동일하게 통일합니다.
  const response = await axiosInstance.post(
    `/archive/surveys/${surveyId}/views`,
  );
  return response.data.result;
};

/** 설문 세부 결과 조회 API */
export const getArchiveSurveyResults = async (surveyId, filters = null) => {
  const params = {};
  if (filters) {
    params.filters = filters;
  }
  const response = await axiosInstance.get(
    `/archive/surveys/${surveyId}/results`,
    {
      params,
    },
  );
  return response.data;
};
