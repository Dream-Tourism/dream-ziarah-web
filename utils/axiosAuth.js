import axios from "axios";
// import { logoutUser, loginUser } from "@/features/auth/authSlice";
import { store } from "@/store/store";

const axiosAuth = axios.create({
  // baseURL: "http://192.168.68.127:8004/user/api/v1/user/",
  baseURL: "http://localhost:8000/api/auth/",
  withCredentials: true,
});
axiosAuth.interceptors.request.use(
  (config) => {
    // No need for Authorization header if using cookies
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh") &&
      !originalRequest.url.includes("/login")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt refresh
        await axiosAuth.post("/refresh/");
        // Retry original request
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        if (refreshError.response?.status === 401) {
          store.dispatch(clearAuthState());
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuth;
