import axios from "axios";
export const instance = axios.create({
  baseURL: "https://localhost:7280",
  headers: {
    "Content-Type": "application/json",
  },
});
