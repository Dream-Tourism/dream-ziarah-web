"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "@/features/auth/authSlice";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    router.push("/dashboard");
    router.refresh();
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const resultAction = await dispatch(
        loginUserThunk({ username, password })
      );
      if (loginUserThunk.fulfilled.match(resultAction)) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card w-100 shadow-lg" style={{ maxWidth: "400px" }}>
        <div className="card-header text-center py-3 border-bottom">
          <h1 className="h4 fw-bold text-dark">Login</h1>
          <p className="text-muted mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card-body p-4">
          <div className="mb-3">
            {error && (
              <div className="alert alert-danger">
                <p className="mb-0">{error}</p>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username/Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username or email"
                required
                disabled={isLoading}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg"
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
