"use client";

import {
  refreshTokenThunk,
  verifySessionThunk,
} from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Perform initial session verification
    dispatch(verifySessionThunk());

    // Set up automatic token refresh before access token expires (e.g., every 14 minutes for a 15-min token)
    const refreshIntervalId = setInterval(() => {
      dispatch(refreshTokenThunk());
    }, 14 * 60 * 1000); // 14 minutes

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(refreshIntervalId);
  }, [dispatch]); // Dispatch is stable, but good practice to include

  return null;
}
