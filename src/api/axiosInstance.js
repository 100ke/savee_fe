// src/api/axiosInstance.js
import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://savee-be.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인터셉터 추가: 요청 전마다 실행됨
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 또는 쿠키에서 꺼내기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 항상 최신 토큰 적용
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 처리나 공통 응답 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("토큰 만료 또는 인증 오류");
      // 리프레시 토큰 처리나 로그아웃 처리 등을 여기에 추가 가능
    }
    return Promise.reject(error);
  }
);

export default instance;
