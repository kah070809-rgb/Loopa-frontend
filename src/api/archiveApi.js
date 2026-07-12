import axiosInstance from "./axiosInstance";

export const getArchiveSurveys = async ({
  category,
  keyword,
  cursor,
  size = 3,
} = {}) => {
  const response = await axiosInstance.get("/archive/surveys", {
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
  const response = await axiosInstance.get("/archive/my-surveys", {
    params: {
      ...(cursor !== null && { cursor }),
      size,
    },
  });

  return response.data.result;
};

export const shareArchiveSurveys = async (surveyIds) => {
  const response = await axiosInstance.post("/archive/shares", {
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