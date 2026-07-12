import api from './axios';

/** 로그아웃 api */
export const logout = async (refreshToken) => {
  const response = await api.post('/auth/logout', {
    refreshToken: refreshToken,
  });

  return response.data;
};

/** 액세스 토큰 재발급 api */
export const reissueToken = async (refreshToken) => {
  const response = await api.post('/auth/token/refresh', {
    refreshToken: refreshToken,
  });

  return response.data;
};
