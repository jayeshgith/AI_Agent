import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function getHealth() {
  const response = await apiClient.get("/health");
  return response.data;
}

export async function recommendCourses(payload) {
  try {
    const response = await apiClient.post("/recommend", payload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      "The recommendation service is unavailable right now.";

    throw new Error(message);
  }
}

export async function getHistory() {
  try {
    const response = await apiClient.get("/history");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      "Unable to fetch recommendation history at this time.";
    throw new Error(message);
  }
}

export async function getHistoryDetail(id) {
  try {
    const response = await apiClient.get(`/history/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      "Unable to fetch the recommendation details.";
    throw new Error(message);
  }
}

export async function deleteHistory(id) {
  try {
    const response = await apiClient.delete(`/history/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      "Unable to delete the recommendation.";
    throw new Error(message);
  }
}
