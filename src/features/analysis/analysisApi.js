import axios from "../../api/axiosInstance";

export const getSummary = async () => {
  try {
    const response = await axios.get("/analysis/summary");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStrategy = async (summary) => {
  try {
    const response = await axios.post("/analysis/strategy", {
      summary,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
