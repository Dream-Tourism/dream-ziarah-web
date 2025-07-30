"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import axiosAuth from "@/utils/axiosAuth";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosAuth.post("/login/", {
        username,
        password,
      });

      dispatch(setAuthState({ user: response.data.user }));
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          marginTop: "-50px",
        }}
      >
        <h3 className="text-center mb-4">Welcome Back</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email / Phone
            </label>
            <input
              id="username"
              className="form-control"
              type="text" // changed from 'email' to 'text'
              placeholder="Enter your email or phone"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ border: "1px solid blue" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ border: "1px solid blue" }}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          <small>
            Don't have an account?{" "}
            <Link href="/register" className="text-decoration-none">
              Register
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
