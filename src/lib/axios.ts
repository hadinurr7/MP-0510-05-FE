import axios from "axios";

import dotenv from "dotenv";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

});