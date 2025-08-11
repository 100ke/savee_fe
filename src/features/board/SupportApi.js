// src/api/supportApi.js
import axios from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
// 공지 목록 가져오기
export const getSupportPosts = async (page, pageSize, keyword) => {
  try {
    const response = await axios.get(
      `/support/?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(
        keyword
      )}`
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

// 게시글 제목 검색
export const searchPostByName = async (keyword) => {
  try {
    const response = await axios.get(`/support/search/:${keyword}`);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${keyword} 검색 실패`, error);
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

// 게시글 수정
export const updatePost = async (id, updateData) => {
  try {
    const response = await axios.put(`/support/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패", error);
    throw error;
  }
};
export const isAdmin = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.role === "admin";
  } catch {
    return false;
  }
};
