import axios from "../../api/axiosInstance";

export const getSummary = async () => {
  try {
    const response = await axios.get("/analysis/summary");
    return response.data;
  } catch (error) {
    throw error;
  }
};
