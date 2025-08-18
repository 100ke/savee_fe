import axios from "../../api/axiosInstance";

export const signup = async (email, name, password) => {
  try {
    const response = await axios.post("/auth/signup", {
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
    const response = await axios.post("/auth/email/send", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post("/auth/email/verify", {
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
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    // 전역 상태관리로 이동
    // const token = response.data.accessToken;
    // if (token) {
    //   localStorage.setItem("accessToken", token);
    // }
    const { accessToken, user } = response.data;
    return { accessToken, user };
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  const response = await axios.get("/user/me");
  return response.data;
};

export const findPasswordMail = async (email) => {
  try {
    const response = await axios.post("/user/password/send", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post("/user/password/reset", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put("/user/password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeName = async (name) => {
  try {
    const response = await axios.put("/user/name", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (email, password) => {
  try {
    const response = await axios.delete("/user", {
      data: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 내가 작성한 QnA 게시글 조회
export const getMyQnAList = async () => {
  try {
    const response = await axios.get("/qna/my");
    return response.data;
  } catch (error) {
    throw error;
  }
};
