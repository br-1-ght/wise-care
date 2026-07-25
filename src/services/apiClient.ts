import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://api.wisecare.health",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
