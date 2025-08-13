// src/api/qnaApi.js
import axios from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
// 공지 목록 가져오기
export const getQnaPosts = async (page, pageSize, keyword, qnaType) => {
  try {
    const response = await axios.get(
      `/qna/?page=${page}&pageSize=${pageSize}&qna_type=${qnaType}&keyword=${encodeURIComponent(
        keyword
      )}`
    );
    return response.data; // 호출한 곳에서 .data.data.posts 식으로 접근 가능
  } catch (error) {
    console.error("qna 목록 가져오기 실패", error);
    throw error;
  }
};

// qna 상세 보기
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`/qna/${id}`);
    return response.data;
  } catch (error) {
    console.error(`qna ${id} 가져오기 실패`, error);
    throw error;
  }
};

// qna 제목 검색
export const searchPostByName = async (keyword) => {
  try {
    const response = await axios.get(`/qna/search/:${keyword}`);
    return response.data;
  } catch (error) {
    console.error(`qna ${keyword} 검색 실패`, error);
    throw error;
  }
};

// qna 등록
export const createPost = async (postData) => {
  try {
    const response = await axios.post("/qna", postData);
    return response.data;
  } catch (error) {
    console.error("qna 등록 실패", error);
    throw error;
  }
};

// qna 삭제
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`/qna/${id}`);
    return response.data;
  } catch (error) {
    console.error(`qna ${id} 삭제 실패`, error);
    throw error;
  }
};

// qna 수정
export const updatePost = async (id, updateData) => {
  try {
    const response = await axios.put(`/qna/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("qna 수정 실패", error);
    throw error;
  }
};

//답변 등록
export const updateanswer = async (id, updateAnswer) => {
  try {
    console.log("updateAnswer:", updateAnswer);
    const response = await axios.patch(`/answer/${id}`, {answer:updateAnswer});
    return response.data;
  } catch (error) {
    console.error("답변 등록 실패", error);
    throw error;
  }
};

//admin 확인
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
