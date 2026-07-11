import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.looppa.example',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorData = error.response?.data;

    if (
      error.response?.status === 401 &&
      errorData?.code === 'COMMON_401' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/token/refresh`,
          {
            refreshToken: refreshToken,
          },
        );

        if (refreshResponse.data.isSuccess) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshResponse.data.result;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error(
          '리프레시 토큰 만료 또는 재발급 실패. 다시 로그인해야 합니다.',
        );
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
