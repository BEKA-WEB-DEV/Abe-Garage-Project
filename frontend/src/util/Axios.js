import axios from "axios";

export const axiosBase = axios.create({
  baseURL: `http://localhost:3001/`,
});
