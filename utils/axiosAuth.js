import axios from "axios";
// import { logoutUser, loginUser } from "@/features/auth/authSlice";
import { store } from "@/store/store";
import { clearAuthState, setAuthState } from "@/features/auth/authSlice";

const axiosAuth = axios.create({
  baseURL: "http://192.168.68.127:8004/user/api/v1/user/",
  // baseURL: "http://localhost:8000/api/auth/",
  withCredentials: true,
});
axiosAuth.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
        const res = await axiosAuth.post("token/refresh/");
        const newAccessToken = res.data.accessToken;

        store.dispatch(setAuthState({ accessToken: newAccessToken }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAuthState());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuth;
