// src/api/supportApi.js
import axios from "../../api/axiosInstance";

// 공지 목록 가져오기
export const getSupportPosts = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `/support/?page=${page}&pageSize=${pageSize}`
    );
    return response.data; // 호출한 곳에서 .data.data.posts 식으로 접근 가능
  } catch (error) {
    console.error("게시글 목록 가져오기 실패", error);
    throw error;
  }
};

// 게시글 상세 보기
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`/support/${id}`);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${id} 가져오기 실패`, error);
    throw error;
  }
};

// 게시글 등록
export const createPost = async (postData) => {
  try {
    const response = await axios.post("/support", postData);
    return response.data;
  } catch (error) {
    console.error("게시글 등록 실패", error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`/support/${id}`);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${id} 삭제 실패`, error);
    throw error;
  }
};
