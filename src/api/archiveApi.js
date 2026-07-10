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