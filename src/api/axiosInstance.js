/*
 * Axios API 인스턴스 및 인터셉터 설정
 *
 * 역할:
 * 1. 모든 API 요청에 토큰 자동 첨부
 * 2. 토큰 만료 시 로그인 페이지로 자동 리다이렉트
 * 3. 네트워크 에러 처리
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401: 토큰 만료 또는 무효
    if (error.response?.status === 401) {
      alert('로그인이 필요하거나 세션이 만료되었습니다. 다시 로그인해주세요.');
      // 로그인 페이지로 리다이렉트
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // 네트워크 에러 또는 타임아웃
    if (!error.response) {
      // 요청 타임아웃 (10초 이상)
      if (error.code === 'ECONNABORTED') {
        error.message = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
      }
      // 네트워크 연결 오류
      else if (error.message === 'Network Error') {
        error.message = '네트워크 연결을 확인해주세요.';
      }
    }

    return Promise.reject(error);
  },
);

export default api;


const axiosInstance = axios.create({
  baseURL: "https://api.loopa.example",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
