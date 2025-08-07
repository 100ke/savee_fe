import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인터셉터 추가: 요청 전마다 실행됨
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 또는 쿠키에서 꺼내기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 항상 최신 토큰 적용
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = async (email, name, password) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/email/send", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await axiosInstance.post("/auth/email/verify", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const token = response.data.accessToken;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/me");
  return response.data;
};
