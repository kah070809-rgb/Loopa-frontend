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