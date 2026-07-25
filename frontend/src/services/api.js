import axios from "axios";

// Keep the backend URL in one place so future API calls share the same base.
const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// getHealth calls the FastAPI health endpoint and returns the response data.
export async function getHealth() {
  const response = await apiClient.get("/health");
  return response.data;
}
