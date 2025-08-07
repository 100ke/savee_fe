// src/api/axiosInstance.js
import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
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

export default instance;
