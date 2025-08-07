// src/api/supportApi.js
import axios from "../../api/axiosInstance";

// 공지 목록 가져오기
export const getSupportPosts = async () => {
  const response = await axios.get("/support");
  return response.data; // 호출한 곳에서 .data.data.posts 식으로 접근 가능
};
