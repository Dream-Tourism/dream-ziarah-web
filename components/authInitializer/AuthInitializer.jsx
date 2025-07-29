"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, clearAuthState } from "@/features/auth/authSlice";
import axiosAuth from "@/utils/axiosAuth";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount

    const initializeAuth = async () => {
      try {
        // First try to verify current session
        const verifyResponse = await axiosAuth.get("/verify/");

        if (isMounted) {
          dispatch(setAuthState({ user: verifyResponse.data.user }));
          return;
        }
      } catch (verifyError) {
        // If verification fails, try refresh
        try {
          const refreshResponse = await axiosAuth.post("/refresh/");

          if (isMounted) {
            dispatch(setAuthState({ user: refreshResponse.data.user }));
          }
        } catch (refreshError) {
          if (isMounted) {
            dispatch(clearAuthState());
          }
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
