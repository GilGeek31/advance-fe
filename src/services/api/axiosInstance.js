import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FIRESTORE_BASE_URL,
});

console.log("BASE URL YANG DIPAKAI:", import.meta.env.VITE_FIRESTORE_BASE_URL);

// Interceptor request — logging tiap request keluar
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor response — logging hasil & tangani error terpusat
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API] ✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API] ❌`, error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
